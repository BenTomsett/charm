import Instruction from '@/lib/emulator/instruction';
import {
  InvalidFlagError,
  InvalidMemoryError,
  InvalidRegisterError,
  SyntaxError,
} from '@/lib/emulator/errors';
import { createInstruction } from '@/lib/emulator/instruction-factory';

export interface EmulatorState {
  registers: Record<string, number>;
  memory: Uint8Array;
  flags: {
    zero: boolean;
    negative: boolean;
    carry: boolean;
    overflow: boolean;
  };
}

const defaultState: EmulatorState = {
  registers: Array.from({ length: 16 }, (_, i) => `R${i}`).reduce(
    (acc, curr) => ({ ...acc, [curr]: 0 }),
    {}
  ),
  memory: new Uint8Array(1024),
  flags: {
    zero: false,
    negative: false,
    carry: false,
    overflow: false,
  },
};

class Emulator {
  private readonly registers: EmulatorState['registers'];
  private readonly memory: EmulatorState['memory'];
  private readonly flags: EmulatorState['flags'];

  constructor(memorySize: number = 1024) {
    this.registers = { ...defaultState.registers };
    this.memory = new Uint8Array(memorySize);
    this.flags = { ...defaultState.flags };
  }

  reset() {
    Object.keys(this.registers).forEach((reg) => (this.registers[reg] = 0));
    Object.keys(this.flags).forEach((flag) => (this.flags[flag] = false));
    this.memory.fill(0);
  }

  executeProgram(program: string): EmulatorState[] {
    const lines = program.split('\n');
    const states: EmulatorState[] = [];
    lines.forEach((line) => {
      if (line.trim().startsWith(';') || line.trim() === '') {
        // Ignore comments and blank lines
        return;
      }
      // Remove comments
      const sanitizedLine = line.split(';')[0].trim();
      const instruction = createInstruction(sanitizedLine);
      if (instruction) {
        states.push(this.executeInstruction(instruction));
      } else {
        throw new SyntaxError(line);
      }
    });

    return states;
  }

  executeInstruction(instruction: Instruction) {
    instruction.execute(this);
    return this.getEmulatorState();
  }

  getEmulatorState() {
    return {
      registers: { ...this.registers },
      memory: new Uint8Array(this.memory),
      flags: { ...this.flags },
    };
  }

  setFlag(flag: string, value: boolean) {
    if (!(flag in this.flags)) {
      throw new InvalidFlagError(flag);
    }

    this.flags[flag] = value;
  }

  getFlag(flag: string) {
    if (!(flag in this.flags)) {
      throw new InvalidFlagError(flag);
    }

    return this.flags[flag];
  }

  getRegister(register: string) {
    register = register.toUpperCase();

    if (!(register in this.registers)) {
      throw new InvalidRegisterError(register);
    }

    return this.registers[register];
  }

  setRegister(register: string, value: number) {
    register = register.toUpperCase();

    if (!(register in this.registers)) {
      throw new InvalidRegisterError(register);
    }

    this.registers[register] = value;
  }

  getMemory(address: number) {
    if (address < 0 || address >= this.memory.length) {
      throw new InvalidMemoryError(address);
    }

    return this.memory[address];
  }

  setMemory(address: number, value: number) {
    if (address < 0 || address >= this.memory.length) {
      throw new InvalidMemoryError(address);
    }

    this.memory[address] = value;
  }

  getMemorySize() {
    return this.memory.length;
  }
}

export default Emulator;
