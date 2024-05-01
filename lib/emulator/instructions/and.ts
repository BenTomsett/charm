import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import { ArgumentError, InvalidRegisterError } from '@/lib/emulator/errors';
import parseImmediate from '@/lib/emulator/instructions/util/immediate';

class AndInstruction extends Instruction {
  static opcode = 'AND';
  static argCount = 3;

  constructor(
    public dest: string,
    public src1: string,
    public src2: string
  ) {
    super();
  }

  static create(args: string[]): AndInstruction {
    if (args.length !== AndInstruction.argCount) {
      throw new ArgumentError(
        `AND instruction must have exactly ${AndInstruction.argCount} argument(s)`
      );
    }

    return new AndInstruction(args[0], args[1], args[2]);
  }

  execute(emulator: Emulator): void {
    const val1 = emulator.getRegister(this.src1);

    let val2;

    try {
      val2 = emulator.getRegister(this.src2);
    } catch (e) {
      if (!(e instanceof InvalidRegisterError)) {
        throw e;
      } else if (!this.src2.startsWith('#')) {
        throw e;
      } else {
        val2 = parseImmediate(this.src2);
      }
    }

    emulator.setRegister(this.dest, val1 & val2);
  }
}

export default AndInstruction;
