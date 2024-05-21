import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import parseImmediate from '@/lib/emulator/instructions/util/immediate';
import { ArgumentError, InvalidRegisterError } from '@/lib/emulator/errors';

class MvnInstruction extends Instruction {
  static opcode = 'MVN';
  static argCount = 2;

  constructor(
    public dest: string,
    public src: string,
    public setFlags = false
  ) {
    super();
  }

  static create(opcode: string, args: string[]): MvnInstruction {
    if (args.length !== MvnInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${MvnInstruction.argCount} arguments`
      );
    }

    const setFlags = opcode === 'MVNS';

    return new MvnInstruction(args[0], args[1], setFlags);
  }

  execute(emulator: Emulator): void {
    let value = 0;

    try {
      if (this.src.startsWith('#')) {
        value = parseImmediate(this.src);
      } else {
        value = emulator.getRegister(this.src);
      }

      value = ~value;

      emulator.setRegister(this.dest, value);
    } catch (e) {
      if (!(e instanceof InvalidRegisterError)) {
        throw e;
      }
    }

    if (this.setFlags) {
      if (value & 0x80000000) emulator.setFlag('N', true);
      if (value === 0) emulator.setFlag('Z', true);
    }
  }
}

export default MvnInstruction;
