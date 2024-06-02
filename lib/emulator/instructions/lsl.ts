import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import parseImmediate from '@/lib/emulator/instructions/util/immediate';
import { ArgumentError, InvalidRegisterError } from '@/lib/emulator/errors';

class LslInstruction extends Instruction {
  static opcode = 'LSL';
  static argCount = 2;

  constructor(
    public dest: string,
    public src: string,
    public shiftAmount: string
  ) {
    super();
  }

  static create(opcode: string, args: string[]): LslInstruction {
    if (args.length !== LslInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${LslInstruction.argCount} arguments`
      );
    }

    return new LslInstruction(args[0], args[1], args[2]);
  }

  execute(emulator: Emulator): void {
    const srcValue = emulator.getRegister(this.src);
    const shiftValue = parseImmediate(this.shiftAmount);

    const result = srcValue << shiftValue;
    emulator.setRegister(this.dest, result);
  }
}

export default LslInstruction;
