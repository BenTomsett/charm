import Emulator from '@/lib/emulator';
import MulInstruction from '@/lib/emulator/instructions/mul';
import { ArgumentError } from '@/lib/emulator/errors';

describe('MulInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a MUL instruction correctly', () => {
    const instruction = MulInstruction.create('MUL', ['R1', 'R2', 'R3']);
    expect(instruction.dest).toBe('R1');
    expect(instruction.src1).toBe('R2');
    expect(instruction.src2).toBe('R3');
    expect(instruction.setFlags).toBe(false);
  });

  it('creates a MULS instruction correctly', () => {
    const instruction = MulInstruction.create('MULS', ['R1', 'R2', 'R3']);
    expect(instruction.setFlags).toBe(true);
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => MulInstruction.create('MUL', ['R1', 'R2'])).toThrow(ArgumentError);
  });

  it('executes a MUL instruction correctly with register values', () => {
    emulator.setRegister('R2', 5);
    emulator.setRegister('R3', 7);
    const instruction = MulInstruction.create('MUL', ['R1', 'R2', 'R3']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(35);
  });

  it('sets flags correctly when MULS instruction is executed', () => {
    emulator.setRegister('R2', 5);
    emulator.setRegister('R3', -7);
    const instruction = MulInstruction.create('MULS', ['R1', 'R2', 'R3']);
    instruction.execute(emulator);
    expect(emulator.getFlag('N')).toBe(true);
    expect(emulator.getFlag('Z')).toBe(false);
    expect(emulator.getFlag('C')).toBe(false);
    expect(emulator.getFlag('V')).toBe(false);
  });
});
