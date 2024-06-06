import Emulator from '@/lib/emulator';
import LslInstruction from '@/lib/emulator/instructions/lsl';
import { ArgumentError } from '@/lib/emulator/errors';

describe('LslInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a LSL instruction correctly', () => {
    const instruction = LslInstruction.create('LSL', ['R1', 'R2', '#3']);
    expect(instruction.dest).toBe('R1');
    expect(instruction.src).toBe('R2');
    expect(instruction.shiftAmount).toBe('#3');
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => LslInstruction.create('LSL', ['R1', 'R2'])).toThrow(ArgumentError);
  });

  it('executes a LSL instruction correctly with register values', () => {
    emulator.setRegister('R2', 5);
    const instruction = LslInstruction.create('LSL', ['R1', 'R2', '#3']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(40);
  });

  it('executes a LSL instruction correctly with immediate value', () => {
    emulator.setRegister('R2', 5);
    const instruction = LslInstruction.create('LSL', ['R1', 'R2', '#2']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(20);
  });
});
