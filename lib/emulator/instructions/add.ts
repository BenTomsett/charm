import Emulator, { Instruction } from '@/lib/emulator';

class AddInstruction extends Instruction {
  opcode = 'ADD';

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
