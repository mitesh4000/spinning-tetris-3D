import { useGameStore } from '../../store/useGameStore';
import { TETROMINO_COLORS, type TetrominoType } from '../../game/constants';
import { TETROMINO_SHAPES } from '../../game/tetrominoes';

function MiniPreview({ type }: { type: TetrominoType }) {
  const shape = TETROMINO_SHAPES[type][0];
  const color = TETROMINO_COLORS[type];
  // Normalize to 4x4 grid
  const cells = new Set(shape.map(([x, y]) => `${x},${y}`));
  return (
    <div className="grid grid-cols-4 gap-0.5 w-16 h-16">
      {Array.from({ length: 16 }).map((_, i) => {
        const x = i % 4;
        const y = Math.floor(i / 4);
        const on = cells.has(`${x},${y}`);
        return (
          <div
            key={i}
            className="rounded-sm"
            style={{
              backgroundColor: on ? color : 'transparent',
              boxShadow: on ? `0 0 6px ${color}80` : undefined,
            }}
          />
        );
      })}
    </div>
  );
}

export function Hud() {
  const score = useGameStore((s) => s.score);
  const level = useGameStore((s) => s.level);
  const lines = useGameStore((s) => s.lines);
  const highScore = useGameStore((s) => s.highScore);
  const nextPiece = useGameStore((s) => s.nextPiece);
  const pauseGame = useGameStore((s) => s.pauseGame);
  const isPlaying = useGameStore((s) => s.isPlaying);

  if (!isPlaying) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-3 sm:p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="pointer-events-auto rounded-xl border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md">
          <div className="text-[10px] uppercase tracking-wider text-slate-400">Score</div>
          <div className="font-mono text-xl font-bold text-white sm:text-2xl">{score.toLocaleString()}</div>
          <div className="mt-1 flex gap-3 text-xs text-slate-400">
            <span>Lv <span className="text-cyan-400 font-semibold">{level}</span></span>
            <span>Lines <span className="text-purple-400 font-semibold">{lines}</span></span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <button
            onClick={pauseGame}
            className="pointer-events-auto rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-md transition hover:bg-white/10"
          >
            Pause
          </button>
          {nextPiece && (
            <div className="pointer-events-none rounded-xl border border-white/10 bg-black/40 p-2 backdrop-blur-md">
              <div className="mb-1 text-[10px] uppercase tracking-wider text-slate-400 text-center">Next</div>
              <MiniPreview type={nextPiece} />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="rounded-lg border border-white/5 bg-black/30 px-3 py-1 text-xs text-slate-500 backdrop-blur-sm">
          Best: <span className="font-mono text-slate-300">{highScore.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
