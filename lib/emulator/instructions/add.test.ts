import Emulator from '@/lib/emulator';
import AddInstruction from '@/lib/emulator/instructions/add';
import { ArgumentError } from '@/lib/emulator/errors';

describe('AddInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates an ADD instruction correctly', () => {
    const instruction = AddInstruction.create('ADD', ['R1', 'R2', 'R3']);
    expect(instruction.dest).toBe('R1');
    expect(instruction.src1).toBe('R2');
    expect(instruction.src2).toBe('R3');
    expect(instruction.setFlags).toBe(false);
  });

  it('creates an ADDS instruction correctly', () => {
    const instruction = AddInstruction.create('ADDS', ['R1', 'R2', 'R3']);
    expect(instruction.setFlags).toBe(true);
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => AddInstruction.create('ADD', ['R1', 'R2'])).toThrow(ArgumentError);
  });

  it('executes an ADD instruction correctly with register values', () => {
    emulator.setRegister('R2', 5);
    emulator.setRegister('R3', 7);
    const instruction = AddInstruction.create('ADD', ['R1', 'R2', 'R3']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(12);
  });

  it('executes an ADD instruction correctly with immediate value', () => {
    emulator.setRegister('R2', 5);
    const instruction = AddInstruction.create('ADD', ['R1', 'R2', '#7']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(12);
  });

  it('sets flags correctly when ADDS instruction is executed', () => {
    emulator.setRegister('R2', 5);
    emulator.setRegister('R3', -7);
    const instruction = AddInstruction.create('ADDS', ['R1', 'R2', 'R3']);
    instruction.execute(emulator);
    expect(emulator.getFlag('N')).toBe(true);
    expect(emulator.getFlag('Z')).toBe(false);
    expect(emulator.getFlag('C')).toBe(false);
    expect(emulator.getFlag('V')).toBe(false);
  });
});
