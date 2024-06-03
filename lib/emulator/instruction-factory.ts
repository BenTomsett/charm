import { UnknownInstructionError } from '@/lib/emulator/errors';

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
import MulInstruction from '@/lib/emulator/instructions/mul';
import MvnInstruction from '@/lib/emulator/instructions/mvn';
import BeqInstruction from '@/lib/emulator/instructions/beq';
import BneInstruction from '@/lib/emulator/instructions/bne';
import AsrInstruction from '@/lib/emulator/instructions/asr';
import BgtInstruction from '@/lib/emulator/instructions/bgt';
import BltInstruction from '@/lib/emulator/instructions/blt';
import CmnInstruction from '@/lib/emulator/instructions/cmn';
import CmpInstruction from '@/lib/emulator/instructions/cmp';
import LslInstruction from '@/lib/emulator/instructions/lsl';
import LsrInstruction from '@/lib/emulator/instructions/lsr';
import RorInstruction from '@/lib/emulator/instructions/ror';
import BleInstruction from '@/lib/emulator/instructions/ble';
import BgeInstruction from '@/lib/emulator/instructions/bge';

type InstructionFactory = (opcode: string, args: string[]) => Instruction;

const instructionLookup: { [key: string]: InstructionFactory } = {
  [AddInstruction.opcode]: AddInstruction.create,
  [AddInstruction.opcode + 'S']: AddInstruction.create,

  [AndInstruction.opcode]: AndInstruction.create,
  [AndInstruction.opcode + 'S']: AndInstruction.create,

  [AsrInstruction.opcode]: AsrInstruction.create,

  [BInstruction.opcode]: BInstruction.create,

  [BeqInstruction.opcode]: BeqInstruction.create,

  [BgeInstruction.opcode]: BgeInstruction.create,

  [BgtInstruction.opcode]: BgtInstruction.create,

  [BicInstruction.opcode]: BicInstruction.create,
  [BicInstruction.opcode + 'S']: BicInstruction.create,

  [BleInstruction.opcode]: BleInstruction.create,

  [BltInstruction.opcode]: BltInstruction.create,

  [BneInstruction.opcode]: BneInstruction.create,

  [CmnInstruction.opcode]: CmnInstruction.create,

  [CmpInstruction.opcode]: CmpInstruction.create,

  [EorInstruction.opcode]: EorInstruction.create,
  [EorInstruction.opcode + 'S']: EorInstruction.create,

  [LdrInstruction.opcode]: LdrInstruction.create,

  [LslInstruction.opcode]: LslInstruction.create,

  [LsrInstruction.opcode]: LsrInstruction.create,

  [MovInstruction.opcode]: MovInstruction.create,
  [MovInstruction.opcode + 'S']: MovInstruction.create,

  [MulInstruction.opcode]: MulInstruction.create,
  [MulInstruction.opcode + 'S']: MulInstruction.create,

  [MvnInstruction.opcode]: MvnInstruction.create,
  [MvnInstruction.opcode + 'S']: MvnInstruction.create,

  [OrrInstruction.opcode]: OrrInstruction.create,
  [OrrInstruction.opcode + 'S']: OrrInstruction.create,

  [RorInstruction.opcode]: RorInstruction.create,

  [StrInstruction.opcode]: StrInstruction.create,

  [SubInstruction.opcode]: SubInstruction.create,
  [SubInstruction.opcode + 'S']: SubInstruction.create,
};

export const opcodes = Object.keys(instructionLookup);

export const createInstruction = (line: string): Instruction | null => {
  const parts = line.trim().split(/\s+/);
  const opcode = parts[0].toUpperCase();
  const args = parts
    .slice(1)
    .join('')
    .split(',')
    .map((arg) => arg.trim());

  const lookup = instructionLookup[opcode];
  if (lookup) {
    return lookup(opcode, args);
  } else {
    throw new UnknownInstructionError(opcode);
  }
};
