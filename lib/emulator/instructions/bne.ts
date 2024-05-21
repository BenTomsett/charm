import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import { ArgumentError, RuntimeError } from '@/lib/emulator/errors';

class BneInstruction extends Instruction {
  static opcode = 'BNE';
  static argCount = 1;

  setsProgramCounter = true;

  constructor(public label: string) {
    super();
  }

  static create(opcode: string, args: string[]): BneInstruction {
    if (args.length !== BneInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${BneInstruction.argCount} argument(s)`
      );
    }

    return new BneInstruction(args[0]);
  }

  execute(emulator: Emulator): void {
    if (!emulator.getFlag('Z')) {
      const symbol = emulator.getSymbol(this.label);

      if (!symbol) {
        throw new RuntimeError(`Label ${this.label} not found`);
      }

      emulator.setRegister('R15', symbol.address);
    }
  }
}

export default BneInstruction;
