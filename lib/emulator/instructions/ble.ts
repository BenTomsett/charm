import Emulator from '@/lib/emulator';
import Instruction from '@/lib/emulator/instruction';
import { ArgumentError, RuntimeError } from '@/lib/emulator/errors';

class BleInstruction extends Instruction {
  static opcode = 'BLE';
  static argCount = 1;

  setsProgramCounter = true;

  constructor(public label: string) {
    super();
  }

  static create(opcode: string, args: string[]): BleInstruction {
    if (args.length !== BleInstruction.argCount) {
      throw new ArgumentError(
        `${opcode} instruction must have exactly ${BleInstruction.argCount} argument(s)`
      );
    }

    return new BleInstruction(args[0]);
  }

  execute(emulator: Emulator): void {
    if (emulator.getFlag('Z') || emulator.getFlag('N') !== emulator.getFlag('V')) {
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

export default BleInstruction;
