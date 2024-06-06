import Emulator from '@/lib/emulator';
import CmpInstruction from '@/lib/emulator/instructions/cmp';
import { ArgumentError } from '@/lib/emulator/errors';

describe('CmpInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a CMP instruction correctly', () => {
    const instruction = CmpInstruction.create('CMP', ['R1', 'R2']);
    expect(instruction.reg).toBe('R1');
    expect(instruction.operand).toBe('R2');
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => CmpInstruction.create('CMP', ['R1'])).toThrow(ArgumentError);
  });

  it('executes a CMP instruction correctly with register values', () => {
    emulator.setRegister('R1', 5);
    emulator.setRegister('R2', 7);
    const instruction = CmpInstruction.create('CMP', ['R1', 'R2']);
    instruction.execute(emulator);
    expect(emulator.getFlag('Z')).toBe(false);
    expect(emulator.getFlag('N')).toBe(true);
    expect(emulator.getFlag('C')).toBe(false);
    expect(emulator.getFlag('V')).toBe(false);
  });

  it('executes a CMP instruction correctly with immediate value', () => {
    emulator.setRegister('R1', 5);
    const instruction = CmpInstruction.create('CMP', ['R1', '#7']);
    instruction.execute(emulator);
    expect(emulator.getFlag('Z')).toBe(false);
    expect(emulator.getFlag('N')).toBe(true);
    expect(emulator.getFlag('C')).toBe(false);
    expect(emulator.getFlag('V')).toBe(false);
  });

  it('sets flags correctly when result is zero', () => {
    emulator.setRegister('R1', 5);
    emulator.setRegister('R2', 5);
    const instruction = CmpInstruction.create('CMP', ['R1', 'R2']);
    instruction.execute(emulator);
    expect(emulator.getFlag('Z')).toBe(true);
    expect(emulator.getFlag('N')).toBe(false);
    expect(emulator.getFlag('C')).toBe(true);
    expect(emulator.getFlag('V')).toBe(false);
  });

  it('sets flags correctly when result is positive', () => {
    emulator.setRegister('R1', 7);
    emulator.setRegister('R2', 5);
    const instruction = CmpInstruction.create('CMP', ['R1', 'R2']);
    instruction.execute(emulator);
    expect(emulator.getFlag('Z')).toBe(false);
    expect(emulator.getFlag('N')).toBe(false);
    expect(emulator.getFlag('C')).toBe(true);
    expect(emulator.getFlag('V')).toBe(false);
  });
});
