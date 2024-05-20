import Emulator from '@/lib/emulator';

abstract class Instruction {
  public static opcode: string;
  public static args: number;
  public setsProgramCounter: boolean = false;
  public abstract execute(emulator: Emulator): void;

  static create(opcode: string, args: string[]): Instruction {
    throw new Error('Cannot create an abstract instruction');
  }
}

export default Instruction;
