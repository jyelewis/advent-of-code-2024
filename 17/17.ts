import { range, sscanf } from "../utilities";
import assert from "node:assert";

function parseInput(input: string) {
  let [regA, regB, regC, instructionSeqString] = sscanf`Register A: ${Number}
Register B: ${Number}
Register C: ${Number}

Program: ${String}`(input);
  assert(regB === 0);
  assert(regC === 0);
  const instructions = instructionSeqString.split(",").map((s: string) => parseInt(s, 10));
  return { regA, instructions };
}

export function day17a(input: string) {
  const { regA, instructions } = parseInput(input);
  const outputs = runProgram(regA, instructions);

  return outputs.join(",");
}

export function day17b(input: string) {
  const { instructions } = parseInput(input);

  let regA = 0;
  for (const numOutputs of range(instructions.length)) {
    const targetOutput = instructions.slice(instructions.length - numOutputs - 1);
    regA *= 8;

    for (const i of range(64)) {
      const output = runProgram(regA, instructions);
      if (output.join(",") === targetOutput.join(",")) {
        break; // we've found this output, onto the next one
      }
      regA += 1;
      if (i === 64 - 1) {
        assert(false, `never found target output :(`);
      }
    }
  }

  return regA;
}

export function runProgram(regANum: number, instructions: number[]): number[] {
  let regA = BigInt(regANum);
  let regB = 0n;
  let regC = 0n;
  let instructionPointer = 0;
  const outputs: number[] = [];

  while (instructionPointer >= 0 && instructionPointer < instructions.length) {
    const instruction = instructions[instructionPointer];
    const literalOperand = instructions[instructionPointer + 1];

    // Combo operands 0 through 3 represent literal values 0 through 3.
    // Combo operand 4 represents the value of register A.
    // Combo operand 5 represents the value of register B.
    // Combo operand 6 represents the value of register C.
    // Combo operand 7 is reserved and will not appear in valid programs.
    let comboOperand = 0n;
    switch (literalOperand) {
      case 0:
      case 1:
      case 2:
      case 3:
        comboOperand = BigInt(literalOperand);
        break;
      case 4:
        comboOperand = regA;
        break;
      case 5:
        comboOperand = regB;
        break;
      case 6:
        comboOperand = regC;
        break;
    }

    switch (instruction) {
      case 0: {
        // The adv instruction (opcode 0) performs division. The numerator is the value in the A register.
        // The denominator is found by raising 2 to the power of the instruction's combo operand.
        // (So, an operand of 2 would divide A by 4 (2^2); an operand of 5 would divide A by 2^B.)
        // The result of the division operation is truncated to an integer and then written to the A register

        const numerator = regA;
        const denominator = 2n ** comboOperand;
        regA = numerator / denominator; // bigint division is integer division
        break;
      }
      case 1: {
        // The bxl instruction (opcode 1) calculates the bitwise XOR of register B and the instruction's literal operand, then stores the result in register B.
        regB = regB ^ BigInt(literalOperand);
        break;
      }
      case 2: {
        // The bst instruction (opcode 2) calculates the value of its combo operand modulo 8 (thereby keeping only its lowest 3 bits), then writes that value to the B register.
        regB = comboOperand % 8n;
        break;
      }
      case 3: {
        // The jnz instruction (opcode 3) does nothing if the A register is 0. However, if the A register is not zero, it jumps by setting the instruction pointer to the value of its literal operand; if this instruction jumps, the instruction pointer is not increased by 2 after this instruction.
        if (regA !== 0n) {
          instructionPointer = literalOperand;
          continue;
        }
        break;
      }
      case 4: {
        // The bxc instruction (opcode 4) calculates the bitwise XOR of register B and register C, then stores the result in register B.
        // (For legacy reasons, this instruction reads an operand but ignores it.)
        regB = regB ^ regC;
        break;
      }
      case 5: {
        // The out instruction (opcode 5) calculates the value of its combo operand modulo 8, then outputs that value.
        // (If a program outputs multiple values, they are separated by commas.)
        outputs.push(Number(comboOperand % 8n));
        break;
      }
      case 6: {
        // The bdv instruction (opcode 6) works exactly like the adv instruction except that the result is stored in the B register.
        // (The numerator is still read from the A register.)
        const numerator = regA;
        const denominator = 2n ** comboOperand;
        regB = numerator / denominator;
        break;
      }
      case 7: {
        // The cdv instruction (opcode 7) works exactly like the adv instruction except that the result is stored in the C register.
        // (The numerator is still read from the A register.)
        const numerator = regA;
        const denominator = 2n ** comboOperand;
        regC = numerator / denominator;
        break;
      }
      default:
        assert.fail(`Unknown instruction code: ${instruction}`);
    }

    instructionPointer += 2;
  }

  return outputs;
}
