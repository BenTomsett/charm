import Emulator from '@/lib/emulator';
import AndInstruction from '@/lib/emulator/instructions/and';
import { ArgumentError } from '@/lib/emulator/errors';

describe('AndInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates an AND instruction correctly', () => {
    const instruction = AndInstruction.create('AND', ['R1', 'R2', 'R3']);
    expect(instruction.dest).toBe('R1');
    expect(instruction.src1).toBe('R2');
    expect(instruction.src2).toBe('R3');
    expect(instruction.setFlags).toBe(false);
  });

  it('creates an ANDS instruction correctly', () => {
    const instruction = AndInstruction.create('ANDS', ['R1', 'R2', 'R3']);
    expect(instruction.setFlags).toBe(true);
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => AndInstruction.create('AND', ['R1', 'R2'])).toThrow(ArgumentError);
  });

  it('executes an AND instruction correctly with register values', () => {
    emulator.setRegister('R2', 5);
    emulator.setRegister('R3', 3);
    const instruction = AndInstruction.create('AND', ['R1', 'R2', 'R3']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(1);
  });

  it('executes an AND instruction correctly with immediate value', () => {
    emulator.setRegister('R2', 5);
    const instruction = AndInstruction.create('AND', ['R1', 'R2', '#3']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(1);
  });

  it('sets flags correctly when ANDS instruction is executed', () => {
    emulator.setRegister('R2', 15); // 0x00F
    emulator.setRegister('R3', 240); // 0x0F0
    const instruction = AndInstruction.create('ANDS', ['R1', 'R2', 'R3']);
    instruction.execute(emulator);
    expect(emulator.getFlag('N')).toBe(false);
    expect(emulator.getFlag('Z')).toBe(true);
  });
});
