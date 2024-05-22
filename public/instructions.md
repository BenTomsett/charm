#### Arithmetic Instructions

| Instruction | Description                                                                                                                    | Syntax           |
|-------------|--------------------------------------------------------------------------------------------------------------------------------|------------------|
| ADD(S)      | Adds two registers or a register and an immediate value. Updates condition flags if `S` suffix is used.                        | `ADD Rd, Rn, Rm` |
| SUB(S)      | Subtracts one register value from another or a register and an immediate value. Updates condition flags if `S` suffix is used. | `SUB Rd, Rn, Rm` |
| MUL(S)      | Multiplies two register values. Updates condition flags if `S` suffix is used.                                                 | `MUL Rd, Rn, Rm` |
| CMN         | Adds two registers and updates the condition flags.                                                                            | `CMN Rn, Rm`     |
| CMP         | Subtracts one register from another and updates the condition flags.                                                           | `CMP Rn, Rm`     |

#### Logical Instructions

| Instruction | Description                                                                                                                                    | Syntax            |
|-------------|------------------------------------------------------------------------------------------------------------------------------------------------|-------------------|
| AND(S)      | Performs a bitwise AND operation on two registers or a register and an immediate value. Updates condition flags if `S` suffix is used.         | `AND Rd, Rn, Rm`  |
| BIC(S)      | Bit Clear. Clears specified bits in a register. Updates condition flags if `S` suffix is used.                                                 | `BIC Rd, Rn, Rm`  |
| EOR(S)      | Performs a bitwise XOR operation on two registers or a register and an immediate value. Updates condition flags if `S` suffix is used.         | `EOR Rd, Rn, Rm`  |
| MVN(S)      | Performs a bitwise NOT operation on a register value and stores the result in another register. Updates condition flags if `S` suffix is used. | `MVN Rd, Rm`      |
| ORR(S)      | Performs a bitwise OR operation on two registers or a register and an immediate value. Updates condition flags if `S` suffix is used.          | `ORR Rd, Rn, Rm`  |

#### Data Movement Instructions

| Instruction | Description                                                                                 | Syntax               |
|-------------|---------------------------------------------------------------------------------------------|----------------------|
| LDR         | Loads a value from memory into a register.                                                  | `LDR Rt, [Rn, #imm]` |
| STR         | Stores a value from a register into memory.                                                 | `STR Rt, [Rn, #imm]` |
| MOV(S)      | Copies a value from one register to another. Updates condition flags if `S` suffix is used. | `MOV Rd, Rm`         |

#### Shift and Rotate Instructions

| Instruction | Description                                                                                                    | Syntax             |
|-------------|----------------------------------------------------------------------------------------------------------------|--------------------|
| ASR         | Arithmetic Shift Right. Shifts a register value right by a specified number of bits, maintaining the sign bit. | `ASR Rd, Rm, #imm` |
| LSL         | Logical Shift Left. Shifts a register value left by a specified number of bits.                                | `LSL Rd, Rm, #imm` |
| LSR         | Logical Shift Right. Shifts a register value right by a specified number of bits.                              | `LSR Rd, Rm, #imm` |
| ROR         | Rotate Right. Rotates the bits in a register value to the right by a specified number of bits.                 | `ROR Rd, Rm, #imm` |

#### Branch Instructions

| Instruction | Description                                                                                                   | Syntax      |
|-------------|---------------------------------------------------------------------------------------------------------------|-------------|
| B           | Branch. Causes an unconditional jump to a specified address.                                                  | `B label`   |
| BEQ         | Branch if Equal. Jumps to a specified address if the zero flag is set.                                        | `BEQ label` |
| BGE         | Branch if Greater or Equal. Jumps to a specified address if the signed comparison indicates greater or equal. | `BGE label` |
| BGT         | Branch if Greater Than. Jumps to a specified address if the signed comparison indicates greater than.         | `BGT label` |
| BLE         | Branch if Less or Equal. Jumps to a specified address if the signed comparison indicates less or equal.       | `BLE label` |
| BLT         | Branch if Less Than. Jumps to a specified address if the signed comparison indicates less than.               | `BLT label` |
| BNE         | Branch if Not Equal. Jumps to a specified address if the zero flag is not set.                                | `BNE label` |