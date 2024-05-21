import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import { ArgumentError, RuntimeError } from '@/lib/emulator/errors';

class BgtInstruction extends Instruction {
  static opcode = 'BGT';
  static argCount = 1;

  setsProgramCounter = true;

  constructor(public label: string) {
    super();
  }

  static create(opcode: string, args: string[]): BgtInstruction {
    if (args.length !== BgtInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${BgtInstruction.argCount} argument(s)`
      );
    }

    return new BgtInstruction(args[0]);
  }

  execute(emulator: Emulator): void {
    const zFlag = emulator.getFlag('Z');
    const nFlag = emulator.getFlag('N');
    const vFlag = emulator.getFlag('V');

    if (!zFlag && nFlag === vFlag) {
      const symbol = emulator.getSymbol(this.label);

      if (!symbol) {
        throw new RuntimeError(`Label ${this.label} not found`);
      }

      emulator.setRegister('R15', symbol.address);
    }
  }
}

export default BgtInstruction;
