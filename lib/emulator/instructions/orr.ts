import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import { ArgumentError, InvalidRegisterError } from '@/lib/emulator/errors';
import parseImmediate from '@/lib/emulator/instructions/util/immediate';

class OrrInstruction extends Instruction {
  static opcode = 'ORR';
  static argCount = 3;

  constructor(
    public dest: string,
    public src1: string,
    public src2: string,
    public setFlags = false
  ) {
    super();
  }

  static create(opcode: string, args: string[]): OrrInstruction {
    if (args.length !== OrrInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${OrrInstruction.argCount} argument(s)`
      );
    }

    const setFlags = opcode === 'ORRS';

    return new OrrInstruction(args[0], args[1], args[2], setFlags);
  }

  execute(emulator: Emulator): void {
    const val1 = emulator.getRegister(this.src1);
    let val2 = 0;

    if (this.src2.startsWith('#')) {
      val2 = parseImmediate(this.src2);
    } else {
      val2 = emulator.getRegister(this.src2);
    }

    const result = val1 | val2;
    emulator.setRegister(this.dest, result);

    if (this.setFlags) {
      if (result & 0x80000000) emulator.setFlag('N', true);
      if (result === 0) emulator.setFlag('Z', true);
    }
  }
}

export default OrrInstruction;
