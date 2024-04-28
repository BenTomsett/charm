'use server';

import Emulator from '@/lib/emulator';
import { AddInstruction } from '@/lib/emulator/instructions';

export async function execute(code: string) {
  const emulator = new Emulator();
  emulator.setRegister('R0', 5);
  emulator.setRegister('R1', 3);
  const addInstruction = new AddInstruction('R2', 'R0', 'R1');
  const state = emulator.executeInstruction(addInstruction);

  if (code === 'success') {
    return { status: 200, state };
  } else {
    return { status: 400 };
  }
}
