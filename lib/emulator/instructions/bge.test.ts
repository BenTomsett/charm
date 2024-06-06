import Emulator from '@/lib/emulator';
import BgeInstruction from '@/lib/emulator/instructions/bge';
import { ArgumentError, RuntimeError } from '@/lib/emulator/errors';

describe('BgeInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a BGE instruction correctly', () => {
    const instruction = BgeInstruction.create('BGE', ['label']);
    expect(instruction.label).toBe('label');
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => BgeInstruction.create('BGE', ['label1', 'label2'])).toThrow(ArgumentError);
  });

  it('executes a BGE instruction correctly when N equals V', () => {
    emulator.setFlag('N', true);
    emulator.setFlag('V', true);
    emulator.setSymbol('label', { address: 100, lineIndex: 0 });
    const instruction = BgeInstruction.create('BGE', ['label']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R15')).toBe(100);
  });

  it('increments program counter when N does not equal V', () => {
    emulator.setFlag('N', true);
    emulator.setFlag('V', false);
    emulator.setRegister('R15', 50);
    const instruction = BgeInstruction.create('BGE', ['label']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R15')).toBe(54);
  });

  it('throws an error when label is not found', () => {
    emulator.setFlag('N', true);
    emulator.setFlag('V', true);
    const instruction = BgeInstruction.create('BGE', ['nonexistent']);
    expect(() => instruction.execute(emulator)).toThrow(RuntimeError);
  });
});
