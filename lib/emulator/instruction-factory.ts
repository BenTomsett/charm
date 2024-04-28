import * as Instructions from '@/lib/emulator/instructions';
import Instruction from '@/lib/emulator/instruction';
import { AddInstruction } from '@/lib/emulator/instructions';

export class InstructionFactory {
  static create(line: string): Instruction | null {
    const parts = line.trim().split(/\s+/);
    const opcode = parts[0].toUpperCase();
    const args = parts.slice(1);

    switch (true) {
      case opcode === AddInstruction.opcode && args.length === AddInstruction.args:
        return new AddInstruction(args[0], args[1], args[2]);
      default:
        return null;
    }
  }
}
