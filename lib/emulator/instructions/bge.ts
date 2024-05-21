import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import { ArgumentError, RuntimeError } from '@/lib/emulator/errors';

class BgeInstruction extends Instruction {
  static opcode = 'BGE';
  static argCount = 1;

  setsProgramCounter = true;

  constructor(public label: string) {
    super();
  }

  static create(opcode: string, args: string[]): BgeInstruction {
    if (args.length !== BgeInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${BgeInstruction.argCount} argument(s)`
      );
    }

    return new BgeInstruction(args[0]);
  }

  execute(emulator: Emulator): void {
    const nFlag = emulator.getFlag('N');
    const vFlag = emulator.getFlag('V');

    // Branch if Negative flag is equal to Overflow flag
    if (nFlag === vFlag) {
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

export default BgeInstruction;
