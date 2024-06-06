import Emulator from '@/lib/emulator';
import StrInstruction from '@/lib/emulator/instructions/str';
import { ArgumentError } from '@/lib/emulator/errors';

describe('StrInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a STR instruction correctly', () => {
    const instruction = StrInstruction.create('STR', ['R1', '[R2]']);
    expect(instruction.source).toBe('R1');
    expect(instruction.base).toBe('R2');
    expect(instruction.offset).toBe(0);
  });

  it('creates a STR instruction correctly with offset', () => {
    const instruction = StrInstruction.create('STR', ['R1', '[R2, #3]']);
    expect(instruction.source).toBe('R1');
    expect(instruction.base).toBe('R2');
    expect(instruction.offset).toBe('3');
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => StrInstruction.create('STR', ['R1'])).toThrow(ArgumentError);
  });

  it('executes a STR instruction correctly with register values', () => {
    emulator.setRegister('R1', 5);
    emulator.setRegister('R2', 1000);
    const instruction = StrInstruction.create('STR', ['R1', '[R2]']);
    instruction.execute(emulator);
    expect(emulator.getMemory(1000)).toBe(5);
  });

  it('executes a STR instruction correctly with offset', () => {
    emulator.setRegister('R1', 5);
    emulator.setRegister('R2', 1000);
    const instruction = StrInstruction.create('STR', ['R1', '[R2, #4]']);
    instruction.execute(emulator);
    expect(emulator.getMemory(1004)).toBe(5);
  });
});
