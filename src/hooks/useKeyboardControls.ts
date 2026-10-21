import { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';

export function useKeyboardControls() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const state = useGameStore.getState();
      if (!state.isPlaying && e.key !== 'r' && e.key !== 'R') return;

      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          state.moveLeft();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          state.moveRight();
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          state.moveDown();
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          state.rotatePiece();
          break;
        case ' ':
          e.preventDefault();
          state.hardDrop();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          if (state.isPaused) state.resumeGame();
          else state.pauseGame();
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          if (state.isGameOver || state.isPlaying) state.resetGame();
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
}
