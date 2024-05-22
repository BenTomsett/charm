import {
  InfiniteLoopError,
  InvalidMemoryError,
  InvalidRegisterError,
  UnalignedMemoryError,
} from '@/lib/emulator/errors';
import { createInstruction } from '@/lib/emulator/instruction-factory';
import Instruction from '@/lib/emulator/instruction';

export interface EmulatorState {
  registers: Record<string, number>;
  memory: Uint8Array;
  flags: { N: boolean; Z: boolean; C: boolean; V: boolean };
  symbols: Map<string, { address: number; lineIndex: number }>;
  currentLine?: number;
  nextLine?: number;
}

export const defaultEmulatorState = {
  registers: Array.from({ length: 16 }, (_, i) => `R${i}`).reduce(
    (acc, curr) => ({ ...acc, [curr]: 0 }),
    {}
  ),
  memory: new Uint8Array(1024),
  flags: { N: false, Z: false, C: false, V: false },
  symbols: new Map(),
};

export interface ProcessedInstruction {
  instruction: Instruction;
  address: number;
  line: string;
  lineIndex: number;
}

class Emulator {
  private registers: EmulatorState['registers'];
  private memory: EmulatorState['memory'];
  private flags: EmulatorState['flags'];
  private symbols: EmulatorState['symbols'];

  private instructions: ProcessedInstruction[];

  private states: EmulatorState[];
  private currentState: number;

  private currentLine: number | undefined;
  private nextLine: number | undefined;

  private listeners: (() => void)[];

  constructor() {
    this.reset(false);

    this.listeners = [];
  }

  reset(notify: boolean = true) {
    this.registers = { ...defaultEmulatorState.registers };
    this.memory = new Uint8Array(defaultEmulatorState.memory);
    this.flags = { ...defaultEmulatorState.flags };
    this.symbols = new Map(defaultEmulatorState.symbols);

    this.instructions = [];
    this.states = [this.getEmulatorState()];
    this.currentState = 0;
    this.currentLine = undefined;
    this.nextLine = undefined;

    if (notify) {
      this.notify();
    }
  }

  // Returns the current state of the emulator
  getEmulatorState() {
    return {
      registers: this.registers,
      memory: this.memory,
      flags: this.flags,
      symbols: this.symbols,
      currentLine: this.currentLine,
      nextLine: this.nextLine,
    };
  }

  setEmulatorState(state: EmulatorState) {
    this.registers = { ...state.registers };
    this.memory = new Uint8Array(state.memory);
    this.flags = { ...state.flags };
    this.symbols = new Map(state.symbols);
    this.currentLine = state.currentLine;
    this.nextLine = state.nextLine;

    this.notify();
  }

  preprocessProgram(program: string) {
    this.reset(false);

    // The memory address to which symbols/instructions will be stored
    let currentMemoryAddress = 0;

    const lines = program.split('\n');
    lines.forEach((line, index) => {
      // Ignore comments and blank lines
      if (line.trim().startsWith(';') || line.trim() === '') {
        return;
      }

      // Remove comments
      const sanitizedLine = line.split(';')[0].trim();

      // If line ends in a colon, it is a symbol
      if (sanitizedLine.endsWith(':')) {
        const symbol = sanitizedLine.slice(0, -1);
        this.symbols.set(symbol, { address: currentMemoryAddress, lineIndex: index });
        return;
      }

      // Otherwise, treat it as an instruction
      const instruction = createInstruction(sanitizedLine);
      if (instruction) {
        this.instructions.push({
          instruction,
          address: currentMemoryAddress,
          line: sanitizedLine,
          lineIndex: index + 1,
        });
        currentMemoryAddress += 4;
      } else {
        throw new SyntaxError(line);
      }
    });

    this.notify();
  }

  execute() {
    const executionLimit = 1000;
    let executionCount = 0;

    while (true) {
      if (executionCount++ > executionLimit) {
        throw new InfiniteLoopError(executionLimit);
      }

      const pc = this.getRegister('R15');

      const processedInstruction = this.instructions.find((i) => i.address === pc);
      if (!processedInstruction) {
        console.error('No instruction found at address:', pc);
        break;
      }

      processedInstruction.instruction.execute(this);

      if (!processedInstruction.instruction.setsProgramCounter) {
        this.setRegister('R15', pc + 4);
      }

      this.states.push(this.getEmulatorState());
      this.currentState++;
    }

    this.currentState = this.states.length - 1;
  }

  stepForward() {
    const pc = this.getRegister('R15');

    const processedInstruction = this.instructions.find((i) => i.address === pc);
    if (!processedInstruction) {
      console.error('No instruction found at address:', pc);
      return false;
    }

    this.setCurrentLine(processedInstruction.lineIndex);

    processedInstruction.instruction.execute(this);

    if (!processedInstruction.instruction.setsProgramCounter) {
      this.setRegister('R15', pc + 4);
    }

    const nextLine = this.instructions.find((i) => i.address === this.getRegister('R15'));
    if (nextLine) {
      this.setNextLine(nextLine.lineIndex);
    } else {
      this.setNextLine(undefined);
    }

    this.states.push(this.getEmulatorState());
    this.currentState++;

    return true;
  }

  stepBack() {
    if (this.currentState > 0) {
      this.states.pop();
      this.currentState--;
      this.setEmulatorState(this.states[this.currentState]);
      return true;
    } else {
      return false;
    }
  }

  setCurrentLine(line: number | undefined) {
    this.currentLine = line;
    this.notify();
  }

  setNextLine(line: number | undefined) {
    this.nextLine = line;
    this.notify();
  }

  // Returns the value of a register
  getRegister(register: string) {
    register = register.toUpperCase();

    if (!(register in this.registers)) {
      throw new InvalidRegisterError(register);
    }

    return this.registers[register];
  }

  // Sets the value of a register
  setRegister(register: string, value: number) {
    register = register.toUpperCase();

    if (!(register in this.registers)) {
      throw new InvalidRegisterError(register);
    }

    this.registers = { ...this.registers, [register]: value };

    this.notify();
  }

  incrementProgramCounter() {
    const pc = this.getRegister('R15');
    this.setRegister('R15', pc + 4);
  }

  // Returns the value at a memory address
  getMemory(address: number) {
    if (address < 0 || address >= this.memory.length) {
      throw new InvalidMemoryError(address);
    }

    return this.memory[address];
  }

  // Sets the value at a memory address
  setMemory(address: number, value: number) {
    if (address < 0 || address >= this.memory.length) {
      throw new InvalidMemoryError(address);
    }

    if (address % 4 !== 0) {
      throw new UnalignedMemoryError(address);
    }

    this.memory[address] = value & 0xff;
    this.memory[address + 1] = (value >> 8) & 0xff;
    this.memory[address + 2] = (value >> 16) & 0xff;
    this.memory[address + 3] = (value >> 24) & 0xff;

    this.notify();
  }

  // Returns the value of a flag
  getFlag(flag: string) {
    if (!(flag in this.flags)) {
      throw new Error(`Invalid flag: ${flag}`);
    }

    return this.flags[flag];
  }

  // Sets the value of a flag
  setFlag(flag: string, value: boolean) {
    if (!(flag in this.flags)) {
      throw new Error(`Invalid flag: ${flag}`);
    }

    this.flags = { ...this.flags, [flag]: value };

    this.notify();
  }

  // Returns the value of a symbol
  getSymbol(symbol: string) {
    return this.symbols.get(symbol);
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  unsubscribe(callback) {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }

  notify() {
    this.listeners.forEach((callback) => callback());
  }
}

export default Emulator;
