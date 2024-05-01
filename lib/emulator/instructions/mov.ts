import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import { InvalidRegisterError } from '@/lib/emulator/errors';

class MovInstruction extends Instruction {
  static opcode = 'MOV';
  static argCount = 2;

  constructor(
    public dest: string,
    public src: string
  ) {
    super();
  }

  static create(args: string[]): MovInstruction {
    console.log(args);
    if (args.length !== MovInstruction.argCount) {
      throw new Error(`MOV instruction must have exactly ${MovInstruction.argCount} arguments`);
    }

    return new MovInstruction(args[0], args[1]);
  }

  execute(emulator: Emulator): void {
    try {
      // If the source is a register, get the value from the register
      const val = emulator.getRegister(this.src);
      emulator.setRegister(this.dest, val);
    } catch (e) {
      // Otherwise, parse the source as a number
      if (!(e instanceof InvalidRegisterError)) {
        throw e;
      } else if (!this.src.startsWith('#')) {
        throw e;
      } else {
        // Check if it's a binary, hexadecimal or decimal number
        let val: number;
        if (this.src.startsWith('#0x')) {
          val = parseInt(this.src.slice(3), 16);
        } else if (this.src.startsWith('#0b')) {
          val = parseInt(this.src.slice(3), 2);
        } else {
          val = parseInt(this.src.slice(1), 10);
        }
        emulator.setRegister(this.dest, val);
      }
    }
  }
}

export default MovInstruction;
