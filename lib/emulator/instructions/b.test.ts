import Emulator from '@/lib/emulator';
import BInstruction from '@/lib/emulator/instructions/b';
import { ArgumentError, RuntimeError } from '@/lib/emulator/errors';

describe('BInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a B instruction correctly', () => {
    const instruction = BInstruction.create('B', ['label']);
    expect(instruction.label).toBe('label');
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => BInstruction.create('B', ['label1', 'label2'])).toThrow(ArgumentError);
  });

  it('executes a B instruction correctly', () => {
    emulator.setSymbol('label', { address: 100, lineIndex: 0 });
    const instruction = BInstruction.create('B', ['label']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R15')).toBe(100);
  });

  it('throws an error when label is not found', () => {
    const instruction = BInstruction.create('B', ['nonexistent']);
    expect(() => instruction.execute(emulator)).toThrow(RuntimeError);
  });
});
