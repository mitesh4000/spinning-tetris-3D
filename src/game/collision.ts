import { BOARD_WIDTH, BOARD_HEIGHT, type TetrominoType } from './constants';
import type { Board } from './board';
import { getCells } from './tetrominoes';

export function isValidPosition(
  board: Board,
  type: TetrominoType,
  rotation: number,
  posX: number,
  posY: number
): boolean {
  const cells = getCells(type, rotation, posX, posY);
  for (const [x, y] of cells) {
    if (x < 0 || x >= BOARD_WIDTH || y >= BOARD_HEIGHT) return false;
    if (y < 0) continue; // allow above board while spawning
    if (board[y][x] !== null) return false;
  }
  return true;
}
