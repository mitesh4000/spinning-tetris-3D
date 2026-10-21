import { create } from 'zustand';
import type { TetrominoType } from '../game/constants';
import { BOARD_WIDTH, INITIAL_DROP_INTERVAL } from '../game/constants';
import { createEmptyBoard, clearFullLines, type Board } from '../game/board';
import { isValidPosition } from '../game/collision';
import { tryRotate } from '../game/rotation';
import { calculateScore, calculateLevel, calculateDropInterval } from '../game/scoring';
import { RandomBag } from '../game/randomBag';
import { getCells } from '../game/tetrominoes';

const HIGH_SCORE_KEY = 'spinning-tetris-highscore';

function loadHighScore(): number {
  try {
    const v = localStorage.getItem(HIGH_SCORE_KEY);
    return v ? parseInt(v, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

function saveHighScore(score: number): void {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, String(score));
  } catch {
    // ignore
  }
}

interface Position {
  x: number;
  y: number;
}

interface GameState {
  board: Board;
  currentPiece: TetrominoType | null;
  currentRotation: number;
  currentPosition: Position;
  nextPiece: TetrominoType | null;
  score: number;
  lines: number;
  level: number;
  highScore: number;
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  dropInterval: number;
  lastDropTime: number;
  tiltX: number; // for subtle board tilt feedback

  // actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  endGame: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => boolean;
  rotatePiece: () => void;
  hardDrop: () => void;
  lockPiece: () => void;
  clearLines: () => void;
  spawnPiece: () => void;
  updateHighScore: () => void;
  tick: (now: number) => void;
  setTilt: (dir: number) => void;
}

const bag = new RandomBag();

const initialState = {
  board: createEmptyBoard(),
  currentPiece: null as TetrominoType | null,
  currentRotation: 0,
  currentPosition: { x: 3, y: 0 },
  nextPiece: null as TetrominoType | null,
  score: 0,
  lines: 0,
  level: 1,
  highScore: loadHighScore(),
  isPlaying: false,
  isPaused: false,
  isGameOver: false,
  dropInterval: INITIAL_DROP_INTERVAL,
  lastDropTime: 0,
  tiltX: 0,
};

export const useGameStore = create<GameState>((set, get) => ({
  ...initialState,

  startGame: () => {
    bag.next(); // discard any leftover
    const first = bag.next();
    const next = bag.next();
    set({
      ...initialState,
      highScore: loadHighScore(),
      isPlaying: true,
      isPaused: false,
      isGameOver: false,
      currentPiece: first,
      nextPiece: next,
      currentRotation: 0,
      currentPosition: { x: 3, y: 0 },
      lastDropTime: performance.now(),
      dropInterval: INITIAL_DROP_INTERVAL,
    });
  },

  pauseGame: () => {
    const { isPlaying, isGameOver } = get();
    if (isPlaying && !isGameOver) set({ isPaused: true });
  },

  resumeGame: () => {
    const { isPaused } = get();
    if (isPaused) set({ isPaused: false, lastDropTime: performance.now() });
  },

  resetGame: () => {
    get().startGame();
  },

  endGame: () => {
    get().updateHighScore();
    set({ isGameOver: true, isPlaying: false, isPaused: false });
  },

  updateHighScore: () => {
    const { score, highScore } = get();
    if (score > highScore) {
      saveHighScore(score);
      set({ highScore: score });
    }
  },

  spawnPiece: () => {
    const { nextPiece, board } = get();
    const piece = nextPiece ?? bag.next();
    const next = bag.next();
    const startX = 3;
    const startY = 0;
    if (!isValidPosition(board, piece, 0, startX, startY)) {
      get().endGame();
      return;
    }
    set({
      currentPiece: piece,
      nextPiece: next,
      currentRotation: 0,
      currentPosition: { x: startX, y: startY },
    });
  },

  moveLeft: () => {
    const { board, currentPiece, currentRotation, currentPosition, isPlaying, isPaused, isGameOver } = get();
    if (!isPlaying || isPaused || isGameOver || !currentPiece) return;
    const newX = currentPosition.x - 1;
    if (isValidPosition(board, currentPiece, currentRotation, newX, currentPosition.y)) {
      set({ currentPosition: { x: newX, y: currentPosition.y }, tiltX: -1 });
    }
  },

  moveRight: () => {
    const { board, currentPiece, currentRotation, currentPosition, isPlaying, isPaused, isGameOver } = get();
    if (!isPlaying || isPaused || isGameOver || !currentPiece) return;
    const newX = currentPosition.x + 1;
    if (isValidPosition(board, currentPiece, currentRotation, newX, currentPosition.y)) {
      set({ currentPosition: { x: newX, y: currentPosition.y }, tiltX: 1 });
    }
  },

  moveDown: () => {
    const { board, currentPiece, currentRotation, currentPosition, isPlaying, isPaused, isGameOver } = get();
    if (!isPlaying || isPaused || isGameOver || !currentPiece) return false;
    const newY = currentPosition.y + 1;
    if (isValidPosition(board, currentPiece, currentRotation, currentPosition.x, newY)) {
      set({ currentPosition: { x: currentPosition.x, y: newY } });
      return true;
    }
    return false;
  },

  rotatePiece: () => {
    const { board, currentPiece, currentRotation, currentPosition, isPlaying, isPaused, isGameOver } = get();
    if (!isPlaying || isPaused || isGameOver || !currentPiece) return;
    const result = tryRotate(board, currentPiece, currentRotation, currentPosition.x, currentPosition.y);
    if (result) {
      set({
        currentRotation: result.rotation,
        currentPosition: { x: result.x, y: result.y },
      });
    }
  },

  hardDrop: () => {
    const { isPlaying, isPaused, isGameOver, currentPiece } = get();
    if (!isPlaying || isPaused || isGameOver || !currentPiece) return;
    let moved = true;
    while (moved) {
      moved = get().moveDown();
    }
    get().lockPiece();
  },

  lockPiece: () => {
    const { board, currentPiece, currentRotation, currentPosition } = get();
    if (!currentPiece) return;

    const newBoard = board.map((row) => [...row]);
    const cells = getCells(currentPiece, currentRotation, currentPosition.x, currentPosition.y);
    for (const [x, y] of cells) {
      if (y >= 0 && y < newBoard.length && x >= 0 && x < BOARD_WIDTH) {
        newBoard[y][x] = currentPiece;
      }
    }
    set({ board: newBoard, currentPiece: null });
    get().clearLines();
    get().spawnPiece();
  },

  clearLines: () => {
    const { board, score, lines } = get();
    const { board: newBoard, cleared } = clearFullLines(board);
    if (cleared === 0) {
      set({ board: newBoard });
      return;
    }
    const newLines = lines + cleared;
    const newLevel = calculateLevel(newLines);
    const points = calculateScore(cleared, get().level);
    const newInterval = calculateDropInterval(newLevel);
    set({
      board: newBoard,
      score: score + points,
      lines: newLines,
      level: newLevel,
      dropInterval: newInterval,
    });
  },

  tick: (now: number) => {
    const { isPlaying, isPaused, isGameOver, lastDropTime, dropInterval } = get();
    if (!isPlaying || isPaused || isGameOver) return;
    if (now - lastDropTime >= dropInterval) {
      const moved = get().moveDown();
      if (!moved) {
        get().lockPiece();
      }
      set({ lastDropTime: now });
    }
    // decay tilt
    const { tiltX } = get();
    if (tiltX !== 0) {
      set({ tiltX: tiltX * 0.85 });
      if (Math.abs(get().tiltX) < 0.05) set({ tiltX: 0 });
    }
  },

  setTilt: (dir: number) => set({ tiltX: dir }),
}));
