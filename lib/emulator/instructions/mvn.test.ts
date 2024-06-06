import Emulator from '@/lib/emulator';
import MvnInstruction from '@/lib/emulator/instructions/mvn';
import { ArgumentError } from '@/lib/emulator/errors';

describe('MvnInstruction', () => {
  let emulator: Emulator;
  beforeEach(() => {
    emulator = new Emulator();
  });

  it('creates a MVN instruction correctly', () => {
    const instruction = MvnInstruction.create('MVN', ['R1', 'R2']);
    expect(instruction.dest).toBe('R1');
    expect(instruction.src).toBe('R2');
    expect(instruction.setFlags).toBe(false);
  });

  it('creates a MVNS instruction correctly', () => {
    const instruction = MvnInstruction.create('MVNS', ['R1', 'R2']);
    expect(instruction.setFlags).toBe(true);
  });

  it('throws an error when incorrect number of arguments are provided', () => {
    expect(() => MvnInstruction.create('MVN', ['R1'])).toThrow(ArgumentError);
  });

  it('executes a MVN instruction correctly with register values', () => {
    emulator.setRegister('R2', 5);
    const instruction = MvnInstruction.create('MVN', ['R1', 'R2']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(~5);
  });

  it('executes a MVN instruction correctly with immediate value', () => {
    const instruction = MvnInstruction.create('MVN', ['R1', '#5']);
    instruction.execute(emulator);
    expect(emulator.getRegister('R1')).toBe(~5);
  });

  it('sets flags correctly when MVNS instruction is executed', () => {
    emulator.setRegister('R2', 7);
    const instruction = MvnInstruction.create('MVNS', ['R1', 'R2']);
    instruction.execute(emulator);
    expect(emulator.getFlag('N')).toBe(true);
    expect(emulator.getFlag('Z')).toBe(false);
  });
});
