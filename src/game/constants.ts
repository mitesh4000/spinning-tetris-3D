export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const CELL_SIZE = 1;
export const CELL_GAP = 0.05;
export const INITIAL_DROP_INTERVAL = 900;
export const MIN_DROP_INTERVAL = 120;
export const SPEED_DECREASE_PER_LEVEL = 70;
export const LINES_PER_LEVEL = 10;
export const BOARD_ROTATION_SPEED = 0.15;
export const MAX_BOARD_TILT = 0.35;
export const CAMERA_POSITION: [number, number, number] = [0, 4, 22];
export const CAMERA_FOV = 45;

export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export const TETROMINO_COLORS: Record<TetrominoType, string> = {
  I: '#22d3ee',
  O: '#facc15',
  T: '#a855f7',
  S: '#22c55e',
  Z: '#ef4444',
  J: '#3b82f6',
  L: '#f97316',
};

export const SCORE_TABLE: Record<number, number> = {
  1: 100,
  2: 300,
  3: 500,
  4: 800,
};
