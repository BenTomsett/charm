import Emulator from '@/lib/emulator';
import RorInstruction from '@/lib/emulator/instructions/ror';
import { ArgumentError } from '@/lib/emulator/errors';

describe('RorInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a ROR instruction correctly', () => {
    const instruction = RorInstruction.create('ROR', ['R1', 'R2', '#3']);
    expect(instruction.dest).toBe('R1');
    expect(instruction.src).toBe('R2');
    expect(instruction.rotateAmount).toBe('#3');
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => RorInstruction.create('ROR', ['R1', 'R2'])).toThrow(ArgumentError);
  });

  it('executes a ROR instruction correctly with register values', () => {
    emulator.setRegister('R2', 20);
    const instruction = RorInstruction.create('ROR', ['R1', 'R2', '#2']);
    instruction.execute(emulator);
    const expectedValue = (20 >>> 2) | (20 << (32 - 2));
    expect(emulator.getRegister('R1')).toBe(expectedValue);
  });

  it('executes a ROR instruction correctly with immediate value', () => {
    emulator.setRegister('R2', 40);
    const instruction = RorInstruction.create('ROR', ['R1', 'R2', '#3']);
    instruction.execute(emulator);
    const expectedValue = (40 >>> 3) | (40 << (32 - 3));
    expect(emulator.getRegister('R1')).toBe(expectedValue);
  });
});
