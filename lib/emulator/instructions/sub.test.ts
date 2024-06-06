import Emulator from '@/lib/emulator';
import SubInstruction from '@/lib/emulator/instructions/sub';
import { ArgumentError } from '@/lib/emulator/errors';

describe('SubInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a SUB instruction correctly', () => {
    const instruction = SubInstruction.create('SUB', ['R1', 'R2', 'R3']);
    expect(instruction.dest).toBe('R1');
    expect(instruction.src1).toBe('R2');
    expect(instruction.src2).toBe('R3');
    expect(instruction.setFlags).toBe(false);
  });

  it('creates a SUBS instruction correctly', () => {
    const instruction = SubInstruction.create('SUBS', ['R1', 'R2', 'R3']);
    expect(instruction.setFlags).toBe(true);
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => SubInstruction.create('SUB', ['R1', 'R2'])).toThrow(ArgumentError);
  });

  it('executes a SUB instruction correctly with register values', () => {
    emulator.setRegister('R2', 7);
    emulator.setRegister('R3', 5);
    const instruction = SubInstruction.create('SUB', ['R1', 'R2', 'R3']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(2);
  });

  it('executes a SUB instruction correctly with immediate value', () => {
    emulator.setRegister('R2', 7);
    const instruction = SubInstruction.create('SUB', ['R1', 'R2', '#5']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(2);
  });

  it('sets flags correctly when SUBS instruction is executed', () => {
    emulator.setRegister('R2', 5);
    emulator.setRegister('R3', 7);
    const instruction = SubInstruction.create('SUBS', ['R1', 'R2', 'R3']);
    instruction.execute(emulator);
    expect(emulator.getFlag('N')).toBe(true);
    expect(emulator.getFlag('Z')).toBe(false);
    expect(emulator.getFlag('C')).toBe(false);
    expect(emulator.getFlag('V')).toBe(false);
  });
});
