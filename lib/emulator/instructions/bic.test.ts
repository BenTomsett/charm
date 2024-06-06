import Emulator from '@/lib/emulator';
import BicInstruction from '@/lib/emulator/instructions/bic';
import { ArgumentError } from '@/lib/emulator/errors';

describe('BicInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a BIC instruction correctly', () => {
    const instruction = BicInstruction.create('BIC', ['R1', 'R2', 'R3']);
    expect(instruction.dest).toBe('R1');
    expect(instruction.src1).toBe('R2');
    expect(instruction.src2).toBe('R3');
    expect(instruction.setFlags).toBe(false);
  });

  it('creates a BICS instruction correctly', () => {
    const instruction = BicInstruction.create('BICS', ['R1', 'R2', 'R3']);
    expect(instruction.setFlags).toBe(true);
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => BicInstruction.create('BIC', ['R1', 'R2'])).toThrow(ArgumentError);
  });

  it('executes a BIC instruction correctly with register values', () => {
    emulator.setRegister('R2', 105);
    emulator.setRegister('R3', 199);
    const instruction = BicInstruction.create('BIC', ['R1', 'R2', 'R3']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(40);
  });

  it('executes a BIC instruction correctly with immediate value', () => {
    emulator.setRegister('R2', 105);
    const instruction = BicInstruction.create('BIC', ['R1', 'R2', '#0b11000111']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(40);
  });

  it('sets flags correctly when BICS instruction is executed', () => {
    emulator.setRegister('R2', 255);
    emulator.setRegister('R3', 255);
    const instruction = BicInstruction.create('BICS', ['R1', 'R2', 'R3']);
    instruction.execute(emulator);
    expect(emulator.getFlag('N')).toBe(false);
    expect(emulator.getFlag('Z')).toBe(true);
  });
});
