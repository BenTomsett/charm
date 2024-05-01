import Emulator from '@/lib/emulator';

export async function execute(code: string) {
  const emulator = new Emulator();
  const state = emulator.executeProgram(code);
  return state[state.length - 1];
}

export async function reset() {
  const emulator = new Emulator();
  return emulator.getEmulatorState();
}
