import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import parseImmediate from '@/lib/emulator/instructions/util/immediate';
import { InvalidRegisterError } from '@/lib/emulator/errors';

class MovInstruction extends Instruction {
  static opcode = 'MOV';
  static argCount = 2;

  constructor(
    public dest: string,
    public src: string
  ) {
    super();
  }

  static create(args: string[]): MovInstruction {
    if (args.length !== MovInstruction.argCount) {
      throw new Error(`MOV instruction must have exactly ${MovInstruction.argCount} arguments`);
    }

    return new MovInstruction(args[0], args[1]);
  }

  execute(emulator: Emulator): void {
    try {
      const val = emulator.getRegister(this.src);
      emulator.setRegister(this.dest, val);
    } catch (e) {
      if (!(e instanceof InvalidRegisterError)) {
        throw e;
      } else if (!this.src.startsWith('#')) {
        throw e;
      } else {
        emulator.setRegister(this.dest, parseImmediate(this.src));
      }
    }
  }
}

export default MovInstruction;
