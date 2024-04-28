import Emulator from '@/lib/emulator';
import AddInstruction from '@/lib/emulator/instructions/add';

describe('AddInstruction', () => {
  let emulator: Emulator;
  let addInstruction: AddInstruction;

  beforeEach(() => {
    emulator = new Emulator();
    addInstruction = new AddInstruction('R1', 'R2', 'R3');
  });

  it('should correctly add positive numbers', () => {
    emulator.setRegister('R2', 5);
    emulator.setRegister('R3', 10);
    addInstruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(15);
  });

  it('should correctly add negative numbers', () => {
    emulator.setRegister('R2', -5);
    emulator.setRegister('R3', -10);
    addInstruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(-15);
  });

  it('should correctly add a positive and a negative number', () => {
    emulator.setRegister('R2', 5);
    emulator.setRegister('R3', -10);
    addInstruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(-5);
  });

  it('should correctly add zero', () => {
    emulator.setRegister('R2', 0);
    emulator.setRegister('R3', 10);
    addInstruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(10);
  });

  it('should correctly add to zero', () => {
    emulator.setRegister('R2', 10);
    emulator.setRegister('R3', -10);
    addInstruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(0);
  });
});
