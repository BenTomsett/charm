import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import parseImmediate from '@/lib/emulator/instructions/util/immediate';
import { ArgumentError, InvalidRegisterError } from '@/lib/emulator/errors';

class AsrInstruction extends Instruction {
  static opcode = 'ASR';
  static argCount = 2;

  constructor(
    public dest: string,
    public src: string,
    public shiftAmount: string
  ) {
    super();
  }

  static create(opcode: string, args: string[]): AsrInstruction {
    if (args.length !== AsrInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${AsrInstruction.argCount} arguments`
      );
    }

    return new AsrInstruction(args[0], args[1], args[2]);
  }

  execute(emulator: Emulator): void {
    try {
      const srcValue = emulator.getRegister(this.src);
      const shiftValue = parseImmediate(this.shiftAmount);

      const result = srcValue >> shiftValue;
      emulator.setRegister(this.dest, result);
    } catch (e) {
      if (!(e instanceof InvalidRegisterError)) {
        throw e;
      }
    }
  }
}

export default AsrInstruction;
