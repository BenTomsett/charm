import Emulator from '@/lib/emulator';

abstract class Instruction {
  abstract opcode: string;
  abstract execute(emulator: Emulator): void;
}

export default Instruction;
