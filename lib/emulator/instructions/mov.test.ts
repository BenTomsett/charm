import Emulator from '@/lib/emulator';
import MovInstruction from '@/lib/emulator/instructions/mov';
import { ArgumentError } from '@/lib/emulator/errors';

describe('MovInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a MOV instruction correctly', () => {
    const instruction = MovInstruction.create('MOV', ['R1', 'R2']);
    expect(instruction.dest).toBe('R1');
    expect(instruction.src).toBe('R2');
    expect(instruction.setFlags).toBe(false);
  });

  it('creates a MOVS instruction correctly', () => {
    const instruction = MovInstruction.create('MOVS', ['R1', 'R2']);
    expect(instruction.setFlags).toBe(true);
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => MovInstruction.create('MOV', ['R1'])).toThrow(ArgumentError);
  });

  it('executes a MOV instruction correctly with register values', () => {
    emulator.setRegister('R2', 5);
    const instruction = MovInstruction.create('MOV', ['R1', 'R2']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(5);
  });

  it('executes a MOV instruction correctly with immediate value', () => {
    const instruction = MovInstruction.create('MOV', ['R1', '#5']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(5);
  });

  it('sets flags correctly when MOVS instruction is executed', () => {
    emulator.setRegister('R2', -7);
    const instruction = MovInstruction.create('MOVS', ['R1', 'R2']);
    instruction.execute(emulator);
    expect(emulator.getFlag('N')).toBe(true);
    expect(emulator.getFlag('Z')).toBe(false);
  });
});
