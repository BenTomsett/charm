import Emulator from '@/lib/emulator';
import OrrInstruction from '@/lib/emulator/instructions/orr';
import { ArgumentError } from '@/lib/emulator/errors';

describe('OrrInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates an ORR instruction correctly', () => {
    const instruction = OrrInstruction.create('ORR', ['R1', 'R2', 'R3']);
    expect(instruction.dest).toBe('R1');
    expect(instruction.src1).toBe('R2');
    expect(instruction.src2).toBe('R3');
    expect(instruction.setFlags).toBe(false);
  });

  it('creates an ORRS instruction correctly', () => {
    const instruction = OrrInstruction.create('ORRS', ['R1', 'R2', 'R3']);
    expect(instruction.setFlags).toBe(true);
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => OrrInstruction.create('ORR', ['R1', 'R2'])).toThrow(ArgumentError);
  });

  it('executes an ORR instruction correctly with register values', () => {
    emulator.setRegister('R2', 5);
    emulator.setRegister('R3', 3);
    const instruction = OrrInstruction.create('ORR', ['R1', 'R2', 'R3']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(7);
  });

  it('executes an ORR instruction correctly with immediate value', () => {
    emulator.setRegister('R2', 5);
    const instruction = OrrInstruction.create('ORR', ['R1', 'R2', '#3']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(7);
  });

  it('sets flags correctly when ORRS instruction is executed', () => {
    emulator.setRegister('R2', 5);
    emulator.setRegister('R3', -7);
    const instruction = OrrInstruction.create('ORRS', ['R1', 'R2', 'R3']);
    instruction.execute(emulator);
    expect(emulator.getFlag('N')).toBe(true);
    expect(emulator.getFlag('Z')).toBe(false);
  });
});
