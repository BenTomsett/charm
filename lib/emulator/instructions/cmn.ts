import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import parseImmediate from '@/lib/emulator/instructions/util/immediate';
import { ArgumentError, InvalidRegisterError } from '@/lib/emulator/errors';

class CmnInstruction extends Instruction {
  static opcode = 'CMN';
  static argCount = 2;

  constructor(
    public reg: string,
    public operand: string
  ) {
    super();
  }

  static create(opcode: string, args: string[]): CmnInstruction {
    if (args.length !== CmnInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${CmnInstruction.argCount} arguments`
      );
    }

    return new CmnInstruction(args[0], args[1]);
  }

  execute(emulator: Emulator): void {
    const val1 = emulator.getRegister(this.reg);
    let val2: number;

    if (this.operand.startsWith('#')) {
      val2 = parseImmediate(this.operand);
    } else {
      val2 = emulator.getRegister(this.operand);
    }

    const result = val1 + val2;

    const unsignedOverflow = val1 > 0xffffffff - val2;
    const signedOverflow = ((val1 ^ result) & (val2 ^ result)) < 0;

    emulator.setFlag('Z', result === 0);
    emulator.setFlag('N', result < 0);
    emulator.setFlag('C', unsignedOverflow);
    emulator.setFlag('V', signedOverflow);
  }
}

export default CmnInstruction;
