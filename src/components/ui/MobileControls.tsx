import { useGameStore } from '../../store/useGameStore';

const btnClass =
  'flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-black/50 text-2xl text-white backdrop-blur-md active:bg-white/20 active:scale-95 transition select-none touch-manipulation';

export function MobileControls() {
  const isPlaying = useGameStore((s) => s.isPlaying);
  const isPaused = useGameStore((s) => s.isPaused);
  const isGameOver = useGameStore((s) => s.isGameOver);
  const moveLeft = useGameStore((s) => s.moveLeft);
  const moveRight = useGameStore((s) => s.moveRight);
  const moveDown = useGameStore((s) => s.moveDown);
  const rotatePiece = useGameStore((s) => s.rotatePiece);
  const hardDrop = useGameStore((s) => s.hardDrop);

  if (!isPlaying || isPaused || isGameOver) return null;

  return (
    <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-3 px-4 sm:hidden">
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          type="button"
          className={btnClass}
          onTouchStart={(e) => { e.preventDefault(); moveLeft(); }}
          aria-label="Move left"
        >
          ←
        </button>
        <button
          type="button"
          className={btnClass}
          onTouchStart={(e) => { e.preventDefault(); rotatePiece(); }}
          aria-label="Rotate"
        >
          ↻
        </button>
        <button
          type="button"
          className={btnClass}
          onTouchStart={(e) => { e.preventDefault(); moveRight(); }}
          aria-label="Move right"
        >
          →
        </button>
      </div>
      <div className="pointer-events-auto flex flex-col gap-2">
        <button
          type="button"
          className={btnClass}
          onTouchStart={(e) => { e.preventDefault(); hardDrop(); }}
          aria-label="Hard drop"
        >
          ⬇
        </button>
        <button
          type="button"
          className={btnClass}
          onTouchStart={(e) => { e.preventDefault(); moveDown(); }}
          aria-label="Soft drop"
        >
          ↓
        </button>
      </div>
    </div>
  );
}
