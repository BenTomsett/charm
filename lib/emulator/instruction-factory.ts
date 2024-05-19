import Instruction from '@/lib/emulator/instruction';
import AddInstruction from '@/lib/emulator/instructions/add';
import MovInstruction from '@/lib/emulator/instructions/mov';
import SubInstruction from '@/lib/emulator/instructions/sub';
import AndInstruction from '@/lib/emulator/instructions/and';
import OrrInstruction from '@/lib/emulator/instructions/orr';
import EorInstruction from '@/lib/emulator/instructions/eor';
import BicInstruction from '@/lib/emulator/instructions/bic';
import BInstruction from '@/lib/emulator/instructions/b';
import StrInstruction from '@/lib/emulator/instructions/str';
import LdrInstruction from '@/lib/emulator/instructions/ldr';

type InstructionFactory = (args: string[]) => Instruction;
const instructionLookup: { [key: string]: InstructionFactory } = {
  [AddInstruction.opcode]: AddInstruction.create,
  [SubInstruction.opcode]: SubInstruction.create,
  [MovInstruction.opcode]: MovInstruction.create,
  [AndInstruction.opcode]: AndInstruction.create,
  [OrrInstruction.opcode]: OrrInstruction.create,
  [EorInstruction.opcode]: EorInstruction.create,
  [BicInstruction.opcode]: BicInstruction.create,
  [BInstruction.opcode]: BInstruction.create,
  [StrInstruction.opcode]: StrInstruction.create,
  [LdrInstruction.opcode]: LdrInstruction.create,
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
