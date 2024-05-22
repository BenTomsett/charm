import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export type DisplayBase = 'hex' | 'bin' | 'dec';

export const formatValue = (base: DisplayBase, value: number): string => {
  switch (base) {
    case 'hex':
      // Convert to 32-bit signed integer
      const hexValue = (value >>> 0).toString(16).padStart(8, '0').toUpperCase();
      return `0x${hexValue}`;
    case 'bin':
      // Convert to 32-bit signed integer, and separate each byte with an underscore
      return `0b${(value >>> 0)
        .toString(2)
        .padStart(32, '0')
        .replace(/(.{8})(?=.)/g, '$1_')}`;
    case 'dec':
      return value.toString();
  }
};
