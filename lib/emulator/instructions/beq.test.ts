import Emulator from '@/lib/emulator';
import BeqInstruction from '@/lib/emulator/instructions/beq';
import { ArgumentError, RuntimeError } from '@/lib/emulator/errors';

describe('BeqInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a BEQ instruction correctly', () => {
    const instruction = BeqInstruction.create('BEQ', ['label']);
    expect(instruction.label).toBe('label');
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => BeqInstruction.create('BEQ', ['label1', 'label2'])).toThrow(ArgumentError);
  });

  it('executes a BEQ instruction correctly when Z flag is set', () => {
    emulator.setFlag('Z', true);
    emulator.setSymbol('label', { address: 100, lineIndex: 0 });
    const instruction = BeqInstruction.create('BEQ', ['label']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R15')).toBe(100);
  });

  it('increments program counter when Z flag is not set', () => {
    emulator.setFlag('Z', false);
    emulator.setRegister('R15', 50);
    const instruction = BeqInstruction.create('BEQ', ['label']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R15')).toBe(54);
  });

  it('throws an error when label is not found', () => {
    emulator.setFlag('Z', true);
    const instruction = BeqInstruction.create('BEQ', ['nonexistent']);
    expect(() => instruction.execute(emulator)).toThrow(RuntimeError);
  });
});
