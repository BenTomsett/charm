import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import { ArgumentError } from '@/lib/emulator/errors';

class MulInstruction extends Instruction {
  static opcode = 'MUL';
  static argCount = 3;

  constructor(
    public dest: string,
    public src1: string,
    public src2: string
  ) {
    super();
  }

  static create(opcode: string, args: string[]): MulInstruction {
    if (args.length !== MulInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${MulInstruction.argCount} argument(s)`
      );
    }

    return new MulInstruction(args[0], args[1], args[2]);
  }

  execute(emulator: Emulator): void {
    const val1 = emulator.getRegister(this.src1);
    const val2 = emulator.getRegister(this.src2);
    emulator.setRegister(this.dest, val1 * val2);
  }
}

export default MulInstruction;
