import Emulator from '@/lib/emulator';
import LdrInstruction from '@/lib/emulator/instructions/ldr';
import { ArgumentError } from '@/lib/emulator/errors';

describe('LdrInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a LDR instruction correctly', () => {
    const instruction = LdrInstruction.create('LDR', ['R1', '[R2, #3]']);
    expect(instruction.dest).toBe('R1');
    expect(instruction.base).toBe('R2');
    expect(instruction.offset).toBe('3');
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => LdrInstruction.create('LDR', ['R1'])).toThrow(ArgumentError);
  });

  it('executes a LDR instruction correctly with register values', () => {
    emulator.setRegister('R2', 5);
    emulator.setMemory(8, 10);
    const instruction = LdrInstruction.create('LDR', ['R1', '[R2, #3]']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(10);
  });

  it('executes a LDR instruction correctly with immediate value', () => {
    emulator.setRegister('R2', 4);
    emulator.setMemory(4, 10);
    const instruction = LdrInstruction.create('LDR', ['R1', '[R2]']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(10);
  });

  it('executes a LDR instruction correctly with register offset', () => {
    emulator.setRegister('R2', 5);
    emulator.setRegister('R3', 3);
    emulator.setMemory(8, 10);
    const instruction = LdrInstruction.create('LDR', ['R1', '[R2, R3]']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(10);
  });
});
