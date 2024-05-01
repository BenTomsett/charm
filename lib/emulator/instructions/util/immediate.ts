const parseImmediate = (arg: string) => {
  // Check if it's a binary, hexadecimal or decimal number
  if (arg.startsWith('#0x')) {
    return parseInt(arg.slice(3), 16);
  } else if (arg.startsWith('#0b')) {
    return parseInt(arg.slice(3), 2);
  } else {
    return parseInt(arg.slice(1), 10);
  }
};

export default parseImmediate;
