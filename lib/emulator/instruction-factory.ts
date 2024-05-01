import Instruction from '@/lib/emulator/instruction';
import instructions from '@/lib/emulator/instructions';

export class InstructionFactory {
  static create(line: string): Instruction | null {
    const parts = line.trim().split(/\s+/);
    const opcode = parts[0].toUpperCase();
    const argPart = parts.slice(1).join('');
    const args = argPart.split(',').map((arg) => arg.trim());

    // TODO: Lookup table for instructions
    for (const i of instructions) {
      if (i.opcode === opcode && i.args === args.length) {
        return i.create(args);
      }
    }

    return null;
  }
}
