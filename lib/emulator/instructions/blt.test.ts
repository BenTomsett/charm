import Emulator from '@/lib/emulator';
import BltInstruction from '@/lib/emulator/instructions/blt';
import { ArgumentError, RuntimeError } from '@/lib/emulator/errors';

describe('BltInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a BLT instruction correctly', () => {
    const instruction = BltInstruction.create('BLT', ['label']);
    expect(instruction.label).toBe('label');
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => BltInstruction.create('BLT', ['label1', 'label2'])).toThrow(ArgumentError);
  });

  it('executes a BLT instruction correctly when N does not equal V', () => {
    emulator.setFlag('N', true);
    emulator.setFlag('V', false);
    emulator.setSymbol('label', { address: 100, lineIndex: 0 });
    const instruction = BltInstruction.create('BLT', ['label']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R15')).toBe(100);
  });

  it('increments program counter when N equals V', () => {
    emulator.setFlag('N', true);
    emulator.setFlag('V', true);
    emulator.setRegister('R15', 50);
    const instruction = BltInstruction.create('BLT', ['label']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R15')).toBe(54);
  });

  it('throws an error when label is not found', () => {
    emulator.setFlag('N', true);
    emulator.setFlag('V', false);
    const instruction = BltInstruction.create('BLT', ['nonexistent']);
    expect(() => instruction.execute(emulator)).toThrow(RuntimeError);
  });
});
