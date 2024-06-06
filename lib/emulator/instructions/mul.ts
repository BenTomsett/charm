import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import { ArgumentError } from '@/lib/emulator/errors';

class MulInstruction extends Instruction {
  static opcode = 'MUL';
  static argCount = 3;

  constructor(
    public dest: string,
    public src1: string,
    public src2: string,
    public setFlags = false
  ) {
    super();
  }

  static create(opcode: string, args: string[]): MulInstruction {
    if (args.length !== MulInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${MulInstruction.argCount} argument(s)`
      );
    }

    const setFlags = opcode === 'MULS';

    return new MulInstruction(args[0], args[1], args[2], setFlags);
  }

  execute(emulator: Emulator): void {
    const val1 = emulator.getRegister(this.src1);
    const val2 = emulator.getRegister(this.src2);

    const result = val1 * val2;
    emulator.setRegister(this.dest, result);

    if (this.setFlags) {
      if (result === 0) emulator.setFlag('Z', true);
      if (result < 0) emulator.setFlag('N', true);

      const bigVal1 = BigInt(val1);
      const bigVal2 = BigInt(val2);
      const bigResult = bigVal1 + bigVal2;

      emulator.setFlag('C', bigResult > BigInt(0xffffffff));

      const overflow = (val1 > 0 && val2 > 0 && result < 0) || (val1 < 0 && val2 < 0 && result > 0);
      emulator.setFlag('V', overflow);
    }
  }
}

export default MulInstruction;
