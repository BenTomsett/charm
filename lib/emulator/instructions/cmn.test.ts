import Emulator from '@/lib/emulator';
import CmnInstruction from '@/lib/emulator/instructions/cmn';
import { ArgumentError } from '@/lib/emulator/errors';

describe('CmnInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a CMN instruction correctly', () => {
    const instruction = CmnInstruction.create('CMN', ['R1', 'R2']);
    expect(instruction.reg).toBe('R1');
    expect(instruction.operand).toBe('R2');
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => CmnInstruction.create('CMN', ['R1'])).toThrow(ArgumentError);
  });

  it('executes a CMN instruction correctly with register values', () => {
    emulator.setRegister('R1', 5);
    emulator.setRegister('R2', 7);
    const instruction = CmnInstruction.create('CMN', ['R1', 'R2']);
    instruction.execute(emulator);
    expect(emulator.getFlag('Z')).toBe(false);
    expect(emulator.getFlag('N')).toBe(false);
    expect(emulator.getFlag('C')).toBe(false);
    expect(emulator.getFlag('V')).toBe(false);
  });

  it('executes a CMN instruction correctly with immediate value', () => {
    emulator.setRegister('R1', 5);
    const instruction = CmnInstruction.create('CMN', ['R1', '#7']);
    instruction.execute(emulator);
    expect(emulator.getFlag('Z')).toBe(false);
    expect(emulator.getFlag('N')).toBe(false);
    expect(emulator.getFlag('C')).toBe(false);
    expect(emulator.getFlag('V')).toBe(false);
  });

  it('sets flags correctly when result is zero', () => {
    emulator.setRegister('R1', 5);
    emulator.setRegister('R2', -5);
    const instruction = CmnInstruction.create('CMN', ['R1', 'R2']);
    instruction.execute(emulator);
    expect(emulator.getFlag('Z')).toBe(true);
    expect(emulator.getFlag('N')).toBe(false);
    expect(emulator.getFlag('C')).toBe(false);
    expect(emulator.getFlag('V')).toBe(false);
  });
});
