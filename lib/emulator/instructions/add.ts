import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';

class AddInstruction extends Instruction {
  static opcode = 'ADD';
  static argCount = 3;

  constructor(
    public dest: string,
    public src1: string,
    public src2: string
  ) {
    super();
  }

  static create(args: string[]): AddInstruction {
    if (args.length !== this.argCount) {
      throw new Error(`ADD instruction must have exactly ${this.argCount} argument(s)`);
    }

    return new AddInstruction(args[0], args[1], args[2]);
  }

  execute(emulator: Emulator): void {
    const val1 = emulator.getRegister(this.src1);
    const val2 = emulator.getRegister(this.src2);
    emulator.setRegister(this.dest, val1 + val2);
  }
}

export default AddInstruction;
