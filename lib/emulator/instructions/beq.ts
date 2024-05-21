import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import { ArgumentError, RuntimeError } from '@/lib/emulator/errors';

class BeqInstruction extends Instruction {
  static opcode = 'BEQ';
  static argCount = 1;

  setsProgramCounter = true;

  constructor(public label: string) {
    super();
  }

  static create(opcode: string, args: string[]): BeqInstruction {
    if (args.length !== BeqInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${BeqInstruction.argCount} argument(s)`
      );
    }

    return new BeqInstruction(args[0]);
  }

  execute(emulator: Emulator): void {
    if (emulator.getFlag('Z')) {
      const symbol = emulator.getSymbol(this.label);

      if (!symbol) {
        throw new RuntimeError(`Label ${this.label} not found`);
      }

      emulator.setRegister('R15', symbol.address);
    } else {
      emulator.incrementProgramCounter();
    }
  }
}

export default BeqInstruction;
