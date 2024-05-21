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
    try {
      const regValue = emulator.getRegister(this.reg);
      let operandValue: number;

      if (this.operand.startsWith('#')) {
        operandValue = parseImmediate(this.operand);
      } else {
        operandValue = emulator.getRegister(this.operand);
      }
      const result = regValue - operandValue;

      emulator.setFlag('Z', result === 0);
      emulator.setFlag('N', result < 0);
      emulator.setFlag('C', !(operandValue > regValue));
      emulator.setFlag('V', ((regValue ^ operandValue) & (regValue ^ result)) < 0);
    } catch (e) {
      if (!(e instanceof InvalidRegisterError)) {
        throw e;
      }
    }
  }
}

export default CmpInstruction;
