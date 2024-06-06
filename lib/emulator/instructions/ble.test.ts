import Emulator from '@/lib/emulator';
import BleInstruction from '@/lib/emulator/instructions/ble';
import { ArgumentError, RuntimeError } from '@/lib/emulator/errors';

describe('BleInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a BLE instruction correctly', () => {
    const instruction = BleInstruction.create('BLE', ['label']);
    expect(instruction.label).toBe('label');
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => BleInstruction.create('BLE', ['label1', 'label2'])).toThrow(ArgumentError);
  });

  it('executes a BLE instruction correctly when Z is true', () => {
    emulator.setFlag('Z', true);
    emulator.setSymbol('label', { address: 100, lineIndex: 0 });
    const instruction = BleInstruction.create('BLE', ['label']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R15')).toBe(100);
  });

  it('executes a BLE instruction correctly when N does not equal V', () => {
    emulator.setFlag('N', true);
    emulator.setFlag('V', false);
    emulator.setSymbol('label', { address: 100, lineIndex: 0 });
    const instruction = BleInstruction.create('BLE', ['label']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R15')).toBe(100);
  });

  it('increments program counter when Z is false and N equals V', () => {
    emulator.setFlag('Z', false);
    emulator.setFlag('N', true);
    emulator.setFlag('V', true);
    emulator.setRegister('R15', 50);
    const instruction = BleInstruction.create('BLE', ['label']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R15')).toBe(54);
  });

  it('throws an error when label is not found', () => {
    emulator.setFlag('Z', true);
    const instruction = BleInstruction.create('BLE', ['nonexistent']);
    expect(() => instruction.execute(emulator)).toThrow(RuntimeError);
  });
});
