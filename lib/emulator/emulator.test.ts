import Emulator from '@/lib/emulator/emulator';
import { Instruction } from '@/lib/emulator';
import { InvalidFlagError, InvalidMemoryError, InvalidRegisterError } from '@/lib/emulator/errors';

describe('Emulator', () => {
  let emulator: Emulator;

  beforeEach(() => {
    emulator = new Emulator();
  });

  it('should initialize with default memory size', () => {
    expect(emulator.getMemorySize()).toBe(1024);
  });

  it('should initialize with custom memory size', () => {
    const customEmulator = new Emulator(2048);
    expect(customEmulator.getMemorySize()).toBe(2048);
  });

  it('should reset all registers and flags', () => {
    emulator.setRegister('R1', 10);
    emulator.setFlag('zero', true);
    emulator.reset();
    expect(emulator.getRegister('R1')).toBe(0);
    expect(emulator.getFlag('zero')).toBe(false);
  });

  it('should be able to execute an instruction', () => {
    const instruction: Instruction = {
      opcode: 'ADD',
      execute: jest.fn(),
    };
    emulator.executeInstruction(instruction);
    expect(instruction.execute).toHaveBeenCalledWith(emulator);
  });

  it('should return the current state of the emulator', () => {
    const state = emulator.getEmulatorState();
    expect(state).toEqual({
      registers: {
        R0: 0,
        R1: 0,
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
    });
  });

  it('should reflect changes in the emulator state', () => {
    emulator.setRegister('R1', 10);
    emulator.setFlag('zero', true);
    emulator.setMemory(0, 10);
    const state = emulator.getEmulatorState();
    expect(state.registers.R1).toBe(10);
    expect(state.flags.zero).toBe(true);
    expect(state.memory[0]).toBe(10);
  });

  it('should not allow direct modifications to the state', () => {
    const state = emulator.getEmulatorState();
    state.registers.R1 = 20;
    state.flags.zero = false;
    state.memory[0] = 20;
    expect(emulator.getRegister('R1')).toBe(0);
    expect(emulator.getFlag('zero')).toBe(false);
    expect(emulator.getMemory(0)).toBe(0);
  });

  it('should set and get a flag', () => {
    emulator.setFlag('zero', true);
    expect(emulator.getFlag('zero')).toBe(true);
  });

  it('should set and get a register', () => {
    emulator.setRegister('R1', 10);
    expect(emulator.getRegister('R1')).toBe(10);
  });

  it('should set and get memory', () => {
    emulator.setMemory(0, 10);
    expect(emulator.getMemory(0)).toBe(10);
  });

  it('should throw an error when setting an invalid register', () => {
    expect(() => emulator.setRegister('R16', 10)).toThrow(InvalidRegisterError);
  });

  it('should throw an error when getting an invalid register', () => {
    expect(() => emulator.getRegister('R16')).toThrow(InvalidRegisterError);
  });

  it('should throw an error when setting an invalid flag', () => {
    expect(() => emulator.setFlag('invalidFlag', true)).toThrow(InvalidFlagError);
  });

  it('should throw an error when getting an invalid flag', () => {
    expect(() => emulator.getFlag('invalidFlag')).toThrow(InvalidFlagError);
  });

  it('should throw an error when setting an invalid memory address', () => {
    expect(() => emulator.setMemory(-1, 10)).toThrow(InvalidMemoryError);
  });

  it('should throw an error when getting an invalid memory address', () => {
    expect(() => emulator.getMemory(-1)).toThrow(InvalidMemoryError);
  });
});
