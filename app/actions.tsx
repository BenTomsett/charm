'use server';

import Emulator from '@/lib/emulator';
import { defaultState } from '@/lib/emulator/emulator';

export async function execute(code: string) {
  const emulator = new Emulator();
  const state = emulator.executeProgram(code);
  return state[state.length - 1];
}

export async function reset() {
  return defaultState;
}
