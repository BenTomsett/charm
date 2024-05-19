import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import { ArgumentError, RuntimeError } from '@/lib/emulator/errors';

class BInstruction extends Instruction {
  static opcode = 'B';
  static argCount = 1;

  setsProgramCounter = true;

  constructor(public label: string) {
    super();
  }

  static create(args: string[]): BInstruction {
    if (args.length !== BInstruction.argCount) {
      throw new ArgumentError(
        `B instruction must have exactly ${BInstruction.argCount} argument(s)`
      );
    }

    return new BInstruction(args[0]);
  }

  execute(emulator: Emulator): void {
    const symbol = emulator.getSymbol(this.label);

    if (!symbol) {
      throw new RuntimeError(`Label ${this.label} not found`);
    }

    emulator.setRegister('R15', symbol.address);
  }
}

export default BInstruction;
