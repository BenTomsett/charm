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

export class UnalignedMemoryError extends Error {
  constructor(address: number) {
    super(`Memory address ${address} is not aligned to 4-byte boundary`);

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

export class RuntimeError extends Error {
  constructor(line: string) {
    super(line);

    this.name = 'RuntimeError';
  }
}

export class InfiniteLoopError extends Error {
  constructor(executionLimit: number) {
    super(`Possible infinite loop detected (execution limit ${executionLimit} reached).`);

    this.name = 'RuntimeError';
  }
}

export class ArgumentError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'ArgumentError';
  }
}
