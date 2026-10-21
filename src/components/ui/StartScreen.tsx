import { useGameStore } from '../../store/useGameStore';

export function StartScreen() {
  const startGame = useGameStore((s) => s.startGame);
  const highScore = useGameStore((s) => s.highScore);

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#050510]/90 backdrop-blur-sm">
      <div className="mx-4 max-w-md w-full rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-center text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-orange-400 sm:text-5xl">
          SPINNING TETRIS
        </h1>
        <p className="mt-3 text-center text-sm text-slate-400">
          Classic Tetris in a rotating 3D world
        </p>

        <div className="mt-8 flex justify-center">
          <button
            onClick={startGame}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-10 py-3.5 text-lg font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:scale-105 hover:shadow-purple-500/50 active:scale-95"
          >
            Start Game
          </button>
        </div>

        <div className="mt-8 rounded-xl border border-white/5 bg-black/30 p-4 text-sm text-slate-300">
          <p className="mb-2 font-semibold text-slate-200">Controls</p>
          <ul className="space-y-1 text-xs sm:text-sm">
            <li><kbd className="rounded bg-white/10 px-1.5 py-0.5">←</kbd> / <kbd className="rounded bg-white/10 px-1.5 py-0.5">A</kbd> Move left</li>
            <li><kbd className="rounded bg-white/10 px-1.5 py-0.5">→</kbd> / <kbd className="rounded bg-white/10 px-1.5 py-0.5">D</kbd> Move right</li>
            <li><kbd className="rounded bg-white/10 px-1.5 py-0.5">↓</kbd> / <kbd className="rounded bg-white/10 px-1.5 py-0.5">S</kbd> Soft drop</li>
            <li><kbd className="rounded bg-white/10 px-1.5 py-0.5">↑</kbd> / <kbd className="rounded bg-white/10 px-1.5 py-0.5">W</kbd> Rotate</li>
            <li><kbd className="rounded bg-white/10 px-1.5 py-0.5">Space</kbd> Hard drop</li>
            <li><kbd className="rounded bg-white/10 px-1.5 py-0.5">P</kbd> Pause · <kbd className="rounded bg-white/10 px-1.5 py-0.5">R</kbd> Restart</li>
          </ul>
        </div>

        {highScore > 0 && (
          <p className="mt-6 text-center text-sm text-slate-400">
            High Score: <span className="font-mono font-semibold text-cyan-400">{highScore.toLocaleString()}</span>
          </p>
        )}
      </div>
    </div>
  );
}
