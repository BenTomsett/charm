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

  it('should load and execute an instruction', () => {
    const instruction: Instruction = {
      opcode: 'ADD',
      execute: jest.fn(),
    };
    emulator.loadInstruction(instruction);
    expect(instruction.execute).toHaveBeenCalledWith(emulator);
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
