import Instruction from '@/lib/emulator/instruction';
import AddInstruction from '@/lib/emulator/instructions/add';
import MovInstruction from '@/lib/emulator/instructions/mov';
import SubInstruction from '@/lib/emulator/instructions/sub';

type InstructionFactory = (args: string[]) => Instruction;
const instructionLookup: { [key: string]: InstructionFactory } = {
  [AddInstruction.opcode]: AddInstruction.create,
  [SubInstruction.opcode]: SubInstruction.create,
  [MovInstruction.opcode]: MovInstruction.create,
};

export const createInstruction = (line: string): Instruction | null => {
  const parts = line.trim().split(/\s+/);
  const opcode = parts[0].toUpperCase();
  const argPart = parts.slice(1).join('');
  const args = argPart.split(',').map((arg) => arg.trim());

  const instruction = instructionLookup[opcode](args);

  if (instruction) {
    return instruction;
  }

  return null;
};
