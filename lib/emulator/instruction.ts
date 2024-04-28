import Emulator from '@/lib/emulator';

abstract class Instruction {
  public static opcode: string;
  public static args: number;
  public abstract execute(emulator: Emulator): void;
}

export default Instruction;
