import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import { ArgumentError } from '@/lib/emulator/errors';

class AddInstruction extends Instruction {
  static opcode = 'ADD';
  static argCount = 3;

  constructor(
    public dest: string,
    public src1: string,
    public src2: string,
    public setFlags = false
  ) {
    super();
  }

  static create(opcode: string, args: string[]): AddInstruction {
    console.log(args);
    if (args.length !== AddInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${AddInstruction.argCount} argument(s)`
      );
    }

    const setFlags = opcode === 'ADDS';

    return new AddInstruction(args[0], args[1], args[2], setFlags);
  }

  execute(emulator: Emulator): void {
    const val1 = emulator.getRegister(this.src1);
    const val2 = emulator.getRegister(this.src2);

    const result = val1 + val2;
    emulator.setRegister(this.dest, result);

    if (this.setFlags) {
      if (result === 0) emulator.setFlag('Z', true);
      if (result < 0) emulator.setFlag('N', true);
      if (val1 >= val2) emulator.setFlag('C', true);
      if ((val1 >= 0 && val2 < 0 && result < 0) || (val1 < 0 && val2 > 0 && result >= 0))
        emulator.setFlag('V', true);
    }
  }
}

export default AddInstruction;
