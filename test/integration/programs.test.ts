import path from 'path';
import fs from 'fs';

import Emulator from '@/lib/emulator';

function loadTestProgram(program: string) {
  const filePath = path.join(__dirname, `./${program}.asm`);
  return fs.readFileSync(filePath, 'utf8');
}

describe('Program tests', () => {
  describe("Euclid's Algorithm", () => {
    it('should calculate the greatest common divisor of two numbers', async () => {
      const program = loadTestProgram('euclid');
      const emulator = new Emulator();
      emulator.preprocessProgram(program);
      emulator.execute();

      expect(emulator.getRegister('R0')).toBe(16);
      expect(emulator.getRegister('R15')).toBe(40);

      expect(emulator.getFlag('Z')).toBe(true);
      expect(emulator.getFlag('C')).toBe(true);

      expect(emulator.getSymbol('main')).toStrictEqual({ address: 0, lineIndex: 0 });
      expect(emulator.getSymbol('gcd_loop')).toStrictEqual({ address: 8, lineIndex: 4 });
      expect(emulator.getSymbol('greater')).toStrictEqual({ address: 24, lineIndex: 10 });
      expect(emulator.getSymbol('less')).toStrictEqual({ address: 32, lineIndex: 14 });
      expect(emulator.getSymbol('end')).toStrictEqual({ address: 40, lineIndex: 18 });
    });
  });

  describe('Factorial', () => {
    it('should calculate the factorial of a number', async () => {
      const program = loadTestProgram('factorial');
      const emulator = new Emulator();
      emulator.preprocessProgram(program);
      emulator.execute();

      expect(emulator.getRegister('R0')).toBe(1);
      expect(emulator.getRegister('R1')).toBe(120);
      expect(emulator.getRegister('R15')).toBe(28);

      expect(emulator.getFlag('Z')).toBe(true);
      expect(emulator.getFlag('C')).toBe(true);

      expect(emulator.getSymbol('start')).toStrictEqual({ address: 0, lineIndex: 0 });
      expect(emulator.getSymbol('loop')).toStrictEqual({ address: 8, lineIndex: 4 });
      expect(emulator.getSymbol('end_loop')).toStrictEqual({ address: 28, lineIndex: 12 });
    });
  });

  describe('Fibonacci', () => {
    it('should calculate the first 10 terms of the Fibonacci sequence', async () => {
      const program = loadTestProgram('fibonacci');
      const emulator = new Emulator();
      emulator.preprocessProgram(program);
      emulator.execute();

      expect(emulator.getRegister('R0')).toBe(10);
      expect(emulator.getRegister('R1')).toBe(55);
      expect(emulator.getRegister('R2')).toBe(89);
      expect(emulator.getRegister('R3')).toBe(10);
      expect(emulator.getRegister('R4')).toBe(40);
      expect(emulator.getRegister('R5')).toBe(89);
      expect(emulator.getRegister('R15')).toBe(52);

      expect(emulator.getFlag('Z')).toBe(true);
      expect(emulator.getFlag('C')).toBe(true);

      expect(emulator.getMemory(0)).toBe(0);
      expect(emulator.getMemory(4)).toBe(1);
      expect(emulator.getMemory(8)).toBe(1);
      expect(emulator.getMemory(12)).toBe(2);
      expect(emulator.getMemory(16)).toBe(3);
      expect(emulator.getMemory(20)).toBe(5);
      expect(emulator.getMemory(24)).toBe(8);
      expect(emulator.getMemory(28)).toBe(13);
      expect(emulator.getMemory(32)).toBe(21);
      expect(emulator.getMemory(36)).toBe(34);

      expect(emulator.getSymbol('start')).toStrictEqual({ address: 0, lineIndex: 0 });
      expect(emulator.getSymbol('loop')).toStrictEqual({ address: 16, lineIndex: 6 });
      expect(emulator.getSymbol('end')).toStrictEqual({ address: 52, lineIndex: 20 });
    });
  });
});
