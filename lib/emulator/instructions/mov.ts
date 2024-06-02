import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import parseImmediate from '@/lib/emulator/instructions/util/immediate';
import { ArgumentError, InvalidRegisterError } from '@/lib/emulator/errors';

class MovInstruction extends Instruction {
  static opcode = 'MOV';
  static argCount = 2;

  constructor(
    public dest: string,
    public src: string,
    public setFlags = false
  ) {
    super();
  }

  static create(opcode: string, args: string[]): MovInstruction {
    if (args.length !== MovInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${MovInstruction.argCount} arguments`
      );
    }

    const setFlags = opcode === 'MOVS';

    return new MovInstruction(args[0], args[1], setFlags);
  }

  execute(emulator: Emulator): void {
    let value = 0;

    if (this.src.startsWith('#')) {
      value = parseImmediate(this.src);
    } else {
      value = emulator.getRegister(this.src);
    }

    emulator.setRegister(this.dest, value);

    if (this.setFlags) {
      if (value & 0x80000000) emulator.setFlag('N', true);
      if (value === 0) emulator.setFlag('Z', true);
    }
  }
}

export default MovInstruction;
