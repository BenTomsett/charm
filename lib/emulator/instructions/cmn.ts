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
    const regValue = emulator.getRegister(this.reg);
    let operandValue: number;

    if (this.operand.startsWith('#')) {
      operandValue = parseImmediate(this.operand);
    } else {
      operandValue = emulator.getRegister(this.operand);
    }

    const result = regValue + operandValue;

    emulator.setFlag('Z', result === 0);
    emulator.setFlag('N', result < 0);
    emulator.setFlag('C', operandValue <= 0xffffffff - regValue);
    emulator.setFlag('V', ((regValue ^ operandValue) & (result ^ regValue)) < 0);
  }
}

export default CmnInstruction;
