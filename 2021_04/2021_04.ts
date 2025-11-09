import { parse2DArray, range } from "../utilities";
import assert from "node:assert";

// TODO: new API for boards

export function day2021_04a(input: string) {
  const [bingoNumbersStr, ...boardStrs] = input.split("\n\n");
  const bingoNumbers = bingoNumbersStr.split(",").map((n) => parseInt(n, 10));
  const boards = boardStrs.map(parse2DArray);

  const playedNumbers: number[] = [];
  for (const bingoNumber of bingoNumbers) {
    playedNumbers.push(bingoNumber);
    const winningBoard = boards.find((b) => boardHasWon(b, playedNumbers));
    if (winningBoard !== undefined) {
      // we have a winner! calculate score
      const winningBoardSum = winningBoard
        .flat()
        .filter((n) => !playedNumbers.includes(n))
        .sum();

      return winningBoardSum * bingoNumber;
    }
  }

  assert(false);
}

export function day2021_04b(input: string) {
  const [bingoNumbersStr, ...boardStrs] = input.split("\n\n");
  const bingoNumbers = bingoNumbersStr.split(",").map((n) => parseInt(n, 10));
  const boards = boardStrs.map(parse2DArray);

  const playedNumbers: number[] = [];
  let boardsInPlay = [...boards];

  for (const bingoNumber of bingoNumbers) {
    playedNumbers.push(bingoNumber);

    // remove any boards that have won with this new bingoNumber
    const boardsLeftInPlay = boardsInPlay.filter((b) => !boardHasWon(b, playedNumbers));

    // if all players are now finished, find the last winner
    if (boardsLeftInPlay.length === 0) {
      // our last board just won!
      assert(boardsInPlay.length === 1, "More than one board won last turn");

      const lastBoardToWin = boardsInPlay[0];
      const lastBoardSum = lastBoardToWin
        .flat()
        .filter((n) => !playedNumbers.includes(n))
        .sum();

      return lastBoardSum * bingoNumber;
    }

    boardsInPlay = boardsLeftInPlay;
  }

  assert(false);
}

function boardHasWon(board: number[][], markedNumbers: number[]): boolean {
  const anyRowIsComplete = range(board.length).some((row) => board[row].every((cell) => markedNumbers.includes(cell)));
  const anyColIsComplete = range(board[0].length).some((col) => board.every((row) => markedNumbers.includes(row[col])));

  return anyRowIsComplete || anyColIsComplete;
}
