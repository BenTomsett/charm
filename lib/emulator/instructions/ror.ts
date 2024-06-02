import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import parseImmediate from '@/lib/emulator/instructions/util/immediate';
import { ArgumentError, InvalidRegisterError } from '@/lib/emulator/errors';

class RorInstruction extends Instruction {
  static opcode = 'ROR';
  static argCount = 2;

  constructor(
    public dest: string,
    public src: string,
    public rotateAmount: string
  ) {
    super();
  }

  static create(opcode: string, args: string[]): RorInstruction {
    if (args.length !== RorInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${RorInstruction.argCount} arguments`
      );
    }

    return new RorInstruction(args[0], args[1], args[2]);
  }

  execute(emulator: Emulator): void {
    const srcValue = emulator.getRegister(this.src);
    const rotateValue = parseImmediate(this.rotateAmount);
    const valueBits = 32;

    const effectiveRotate = rotateValue % valueBits;
    const result = (srcValue >>> effectiveRotate) | (srcValue << (valueBits - effectiveRotate));

    emulator.setRegister(this.dest, result);
  }
}

export default RorInstruction;
