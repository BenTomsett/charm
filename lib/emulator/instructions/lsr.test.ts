import Emulator from '@/lib/emulator';
import LsrInstruction from '@/lib/emulator/instructions/lsr';
import { ArgumentError } from '@/lib/emulator/errors';

describe('LsrInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a LSR instruction correctly', () => {
    const instruction = LsrInstruction.create('LSR', ['R1', 'R2', '#3']);
    expect(instruction.dest).toBe('R1');
    expect(instruction.src).toBe('R2');
    expect(instruction.shiftAmount).toBe('#3');
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => LsrInstruction.create('LSR', ['R1', 'R2'])).toThrow(ArgumentError);
  });

  it('executes a LSR instruction correctly with register values', () => {
    emulator.setRegister('R2', 20);
    const instruction = LsrInstruction.create('LSR', ['R1', 'R2', '#2']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(5);
  });

  it('executes a LSR instruction correctly with immediate value', () => {
    emulator.setRegister('R2', 40);
    const instruction = LsrInstruction.create('LSR', ['R1', 'R2', '#3']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(5);
  });
});
