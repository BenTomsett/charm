import Emulator from '@/lib/emulator';
import BneInstruction from '@/lib/emulator/instructions/bne';
import { ArgumentError, RuntimeError } from '@/lib/emulator/errors';

describe('BneInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a BNE instruction correctly', () => {
    const instruction = BneInstruction.create('BNE', ['label']);
    expect(instruction.label).toBe('label');
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => BneInstruction.create('BNE', ['label1', 'label2'])).toThrow(ArgumentError);
  });

  it('executes a BNE instruction correctly when Z is false', () => {
    emulator.setFlag('Z', false);
    emulator.setSymbol('label', { address: 100, lineIndex: 0 });
    const instruction = BneInstruction.create('BNE', ['label']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R15')).toBe(100);
  });

  it('increments program counter when Z is true', () => {
    emulator.setFlag('Z', true);
    emulator.setRegister('R15', 50);
    const instruction = BneInstruction.create('BNE', ['label']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R15')).toBe(54);
  });

  it('throws an error when label is not found', () => {
    emulator.setFlag('Z', false);
    const instruction = BneInstruction.create('BNE', ['nonexistent']);
    expect(() => instruction.execute(emulator)).toThrow(RuntimeError);
  });
});
