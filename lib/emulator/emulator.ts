import Instruction from '@/lib/emulator/instruction';
import {
  InvalidFlagError,
  InvalidMemoryError,
  InvalidRegisterError,
  SyntaxError,
} from '@/lib/emulator/errors';
import { InstructionFactory } from '@/lib/emulator/instruction-factory';
import registers from '@/components/app/emulator-panel/registers';

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
  registers: {
    R0: 5,
    R1: 3,
    R2: 0,
    R3: 0,
    R4: 0,
    R5: 0,
    R6: 0,
    R7: 0,
    R8: 0,
    R9: 0,
    R10: 0,
    R11: 0,
    R12: 0,
    R13: 0,
    R14: 0,
    R15: 0,
  },
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
      const instruction = InstructionFactory.create(line);
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
    if (!(register in this.registers)) {
      throw new InvalidRegisterError(register);
    }

    return this.registers[register];
  }

  setRegister(register: string, value: number) {
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
