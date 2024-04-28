import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';

class AddInstruction extends Instruction {
  static opcode = 'ADD';
  static args = 3;

  constructor(
    public dest: string,
    public src1: string,
    public src2: string
  ) {
    super();
  }

  execute(emulator: Emulator): void {
    const val1 = emulator.getRegister(this.src1);
    const val2 = emulator.getRegister(this.src2);
    emulator.setRegister(this.dest, val1 + val2);
  }
}

export default AddInstruction;
