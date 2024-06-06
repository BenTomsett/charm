import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import parseImmediate from '@/lib/emulator/instructions/util/immediate';
import { ArgumentError, InvalidRegisterError } from '@/lib/emulator/errors';

class CmpInstruction extends Instruction {
  static opcode = 'CMP';
  static argCount = 2;

  constructor(
    public reg: string,
    public operand: string
  ) {
    super();
  }

  static create(opcode: string, args: string[]): CmpInstruction {
    if (args.length !== CmpInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${CmpInstruction.argCount} arguments`
      );
    }

    return new CmpInstruction(args[0], args[1]);
  }

  execute(emulator: Emulator): void {
    const val1 = emulator.getRegister(this.reg);
    let val2: number;

    if (this.operand.startsWith('#')) {
      val2 = parseImmediate(this.operand);
    } else {
      val2 = emulator.getRegister(this.operand);
    }
    const result = val1 - val2;

    emulator.setFlag('Z', result === 0);
    emulator.setFlag('N', result < 0);
    emulator.setFlag('C', !(val2 > val1));
    emulator.setFlag('V', ((val1 ^ val2) & (val1 ^ result)) < 0);
  }
}

export default CmpInstruction;
