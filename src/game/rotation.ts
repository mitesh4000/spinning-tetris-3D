import type { TetrominoType } from './constants';
import type { Board } from './board';
import { isValidPosition } from './collision';

/** Basic wall kicks: try current, then shift left 1, right 1, left 2, right 2. */
const KICKS = [0, -1, 1, -2, 2];

export function tryRotate(
  board: Board,
  type: TetrominoType,
  currentRotation: number,
  posX: number,
  posY: number
): { rotation: number; x: number; y: number } | null {
  const nextRotation = (currentRotation + 1) % 4;
  for (const kick of KICKS) {
    if (isValidPosition(board, type, nextRotation, posX + kick, posY)) {
      return { rotation: nextRotation, x: posX + kick, y: posY };
    }
  }
  return null;
}
