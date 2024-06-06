import Emulator from '@/lib/emulator';
import BgtInstruction from '@/lib/emulator/instructions/bgt';
import { ArgumentError, RuntimeError } from '@/lib/emulator/errors';

describe('BgtInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a BGT instruction correctly', () => {
    const instruction = BgtInstruction.create('BGT', ['label']);
    expect(instruction.label).toBe('label');
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => BgtInstruction.create('BGT', ['label1', 'label2'])).toThrow(ArgumentError);
  });

  it('executes a BGT instruction correctly when Z is false and N equals V', () => {
    emulator.setFlag('Z', false);
    emulator.setFlag('N', true);
    emulator.setFlag('V', true);
    emulator.setSymbol('label', { address: 100, lineIndex: 0 });
    const instruction = BgtInstruction.create('BGT', ['label']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R15')).toBe(100);
  });

  it('increments program counter when Z is true or N does not equal V', () => {
    emulator.setFlag('Z', true);
    emulator.setFlag('N', true);
    emulator.setFlag('V', false);
    emulator.setRegister('R15', 50);
    const instruction = BgtInstruction.create('BGT', ['label']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R15')).toBe(54);
  });

  it('throws an error when label is not found', () => {
    emulator.setFlag('Z', false);
    emulator.setFlag('N', true);
    emulator.setFlag('V', true);
    const instruction = BgtInstruction.create('BGT', ['nonexistent']);
    expect(() => instruction.execute(emulator)).toThrow(RuntimeError);
  });
});
