import Emulator from '@/lib/emulator';
import AsrInstruction from '@/lib/emulator/instructions/asr';
import { ArgumentError } from '@/lib/emulator/errors';

describe('AsrInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates an ASR instruction correctly', () => {
    const instruction = AsrInstruction.create('ASR', ['R1', 'R2', '#3']);
    expect(instruction.dest).toBe('R1');
    expect(instruction.src).toBe('R2');
    expect(instruction.shiftAmount).toBe('#3');
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => AsrInstruction.create('ASR', ['R1', 'R2'])).toThrow(ArgumentError);
  });

  it('executes an ASR instruction correctly with register values', () => {
    emulator.setRegister('R2', 8);
    const instruction = AsrInstruction.create('ASR', ['R1', 'R2', '#2']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(2);
  });

  it('executes an ASR instruction correctly with negative register value', () => {
    emulator.setRegister('R2', -8);
    const instruction = AsrInstruction.create('ASR', ['R1', 'R2', '#2']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(-2);
  });
});
