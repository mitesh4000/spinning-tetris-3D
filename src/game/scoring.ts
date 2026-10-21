import { SCORE_TABLE, LINES_PER_LEVEL, INITIAL_DROP_INTERVAL, MIN_DROP_INTERVAL, SPEED_DECREASE_PER_LEVEL } from './constants';

export function calculateScore(linesCleared: number, level: number): number {
  const base = SCORE_TABLE[linesCleared] ?? 0;
  return base * level;
}

export function calculateLevel(totalLines: number): number {
  return Math.floor(totalLines / LINES_PER_LEVEL) + 1;
}

export function calculateDropInterval(level: number): number {
  return Math.max(
    MIN_DROP_INTERVAL,
    INITIAL_DROP_INTERVAL - (level - 1) * SPEED_DECREASE_PER_LEVEL
  );
}
