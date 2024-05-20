import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import { ArgumentError } from '@/lib/emulator/errors';

class LdrInstruction extends Instruction {
  static opcode = 'LDR';
  static argCount = 2;

  constructor(
    public dest: string,
    public base: string,
    public offset: string | number
  ) {
    super();
  }

  static create(opcode: string, args: string[]): LdrInstruction {
    if (args.length !== LdrInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${LdrInstruction.argCount} argument(s)`
      );
    }

    const [dest, memoryOperand] = args;
    const match = /\[([Rr][0-9]+)(, #?([Rr][0-9]+|\d+))?]/.exec(memoryOperand);
    if (!match) {
      throw new ArgumentError('Invalid memory operand format for LDR instruction');
    }

    const base = match[1];
    const offset = match[3] || 0; // Default offset to 0 if not specified

    return new LdrInstruction(dest, base, offset);
  }

  execute(emulator: Emulator): void {
    let address = emulator.getRegister(this.base);

    if (typeof this.offset === 'number') {
      address += this.offset;
    } else {
      const offsetValue = emulator.getRegister(this.offset);
      address += offsetValue;
    }

    const value = emulator.getMemory(address);
    emulator.setRegister(this.dest, value);
  }
}

export default LdrInstruction;
