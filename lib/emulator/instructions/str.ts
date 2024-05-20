import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import { ArgumentError } from '@/lib/emulator/errors';

class StrInstruction extends Instruction {
  static opcode = 'STR';
  static argCount = 2;

  constructor(
    public source: string,
    public base: string,
    public offset: string | number
  ) {
    super();
  }

  static create(opcode: string, args: string[]): StrInstruction {
    if (args.length !== StrInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${StrInstruction.argCount} argument(s)`
      );
    }

    const [source, memoryOperand] = args;
    const match = /\[([Rr][0-9]+)(, #?([Rr][0-9]+|\d+))?]/.exec(memoryOperand);
    if (!match) {
      throw new ArgumentError('Invalid memory operand format for STR instruction');
    }

    const base = match[1];
    const offset = match[3] || 0; // Default offset to 0 if not specified

    return new StrInstruction(source, base, offset);
  }

  execute(emulator: Emulator): void {
    const sourceValue = emulator.getRegister(this.source);
    let address = emulator.getRegister(this.base);

    if (typeof this.offset === 'number') {
      address += this.offset;
    } else {
      const offsetValue = emulator.getRegister(this.offset);
      address += offsetValue;
    }

    emulator.setMemory(address, sourceValue);
  }
}

export default StrInstruction;
