import Emulator from '@/lib/emulator';
import EorInstruction from '@/lib/emulator/instructions/eor';
import { ArgumentError } from '@/lib/emulator/errors';

describe('EorInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates an EOR instruction correctly', () => {
    const instruction = EorInstruction.create('EOR', ['R1', 'R2', 'R3']);
    expect(instruction.dest).toBe('R1');
    expect(instruction.src1).toBe('R2');
    expect(instruction.src2).toBe('R3');
    expect(instruction.setFlags).toBe(false);
  });

  it('creates an EORS instruction correctly', () => {
    const instruction = EorInstruction.create('EORS', ['R1', 'R2', 'R3']);
    expect(instruction.setFlags).toBe(true);
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => EorInstruction.create('EOR', ['R1', 'R2'])).toThrow(ArgumentError);
  });

  it('executes an EOR instruction correctly with register values', () => {
    emulator.setRegister('R2', 5);
    emulator.setRegister('R3', 3);
    const instruction = EorInstruction.create('EOR', ['R1', 'R2', 'R3']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(6);
  });

  it('executes an EOR instruction correctly with immediate value', () => {
    emulator.setRegister('R2', 5);
    const instruction = EorInstruction.create('EOR', ['R1', 'R2', '#3']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(6);
  });

  it('sets flags correctly when EORS instruction is executed', () => {
    emulator.setRegister('R2', 5);
    emulator.setRegister('R3', -7);
    const instruction = EorInstruction.create('EORS', ['R1', 'R2', 'R3']);
    instruction.execute(emulator);
    expect(emulator.getFlag('N')).toBe(true);
    expect(emulator.getFlag('Z')).toBe(false);
  });
});
