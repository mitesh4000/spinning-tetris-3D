import { BOARD_WIDTH, BOARD_HEIGHT, type TetrominoType } from './constants';

export type Cell = TetrominoType | null;
export type Board = Cell[][];

export function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null)
  );
}

export function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

/** Returns the list of full row indices (0 = top). */
export function findFullLines(board: Board): number[] {
  const lines: number[] = [];
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    if (board[y].every((cell) => cell !== null)) {
      lines.push(y);
    }
  }
  return lines;
}

/** Removes full lines and returns the new board + number of lines cleared. */
export function clearFullLines(board: Board): { board: Board; cleared: number } {
  const full = findFullLines(board);
  if (full.length === 0) return { board, cleared: 0 };

  const remaining = board.filter((_, y) => !full.includes(y));
  const emptyRows = Array.from({ length: full.length }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null as Cell)
  );
  return {
    board: [...emptyRows, ...remaining],
    cleared: full.length,
  };
}
