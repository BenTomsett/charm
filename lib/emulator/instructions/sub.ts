import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import { ArgumentError } from '@/lib/emulator/errors';

class SubInstruction extends Instruction {
  static opcode = 'SUB';
  static argCount = 3;

  constructor(
    public dest: string,
    public src1: string,
    public src2: string
  ) {
    super();
  }

  static create(args: string[]): SubInstruction {
    if (args.length !== SubInstruction.argCount) {
      throw new ArgumentError(
        `SUB instruction must have exactly ${SubInstruction.argCount} argument(s)`
      );
    }

    return new SubInstruction(args[0], args[1], args[2]);
  }

  execute(emulator: Emulator): void {
    const val1 = emulator.getRegister(this.src1);
    const val2 = emulator.getRegister(this.src2);
    emulator.setRegister(this.dest, val1 - val2);
  }
}

export default SubInstruction;
