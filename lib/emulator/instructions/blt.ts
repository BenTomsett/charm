import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import { ArgumentError, RuntimeError } from '@/lib/emulator/errors';

class BltInstruction extends Instruction {
  static opcode = 'BLT';
  static argCount = 1;

  setsProgramCounter = true;

  constructor(public label: string) {
    super();
  }

  static create(opcode: string, args: string[]): BltInstruction {
    if (args.length !== BltInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${BltInstruction.argCount} argument(s)`
      );
    }

    return new BltInstruction(args[0]);
  }

  execute(emulator: Emulator): void {
    if (emulator.getFlag('N') !== emulator.getFlag('V')) {
      const symbol = emulator.getSymbol(this.label);

      if (!symbol) {
        throw new RuntimeError(`Label ${this.label} not found`);
      }

      emulator.setRegister('R15', symbol.address);
    }
  }
}

export default BltInstruction;
