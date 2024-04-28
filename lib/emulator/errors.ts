export class InvalidRegisterError extends Error {
  constructor(address: string) {
    super(`Invalid register ${address}`);

    this.name = 'InvalidRegisterError';
  }
}

export class InvalidMemoryError extends Error {
  constructor(address: number) {
    super(`Invalid memory address ${address}`);

    this.name = 'InvalidMemoryError';
  }
}

export class InvalidFlagError extends Error {
  constructor(flag: string) {
    super(`Invalid flag ${flag}`);

    this.name = 'InvalidFlagError';
  }
}

export class SyntaxError extends Error {
  constructor(line: string) {
    super(`Syntax error on line: ${line}`);

    this.name = 'SyntaxError';
  }
}
