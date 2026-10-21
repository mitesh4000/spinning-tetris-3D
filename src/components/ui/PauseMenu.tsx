import { useGameStore } from '../../store/useGameStore';

export function PauseMenu() {
  const isPaused = useGameStore((s) => s.isPaused);
  const resumeGame = useGameStore((s) => s.resumeGame);
  const resetGame = useGameStore((s) => s.resetGame);

  if (!isPaused) return null;

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-xs rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white">Game Paused</h2>
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={resumeGame}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 active:scale-95"
          >
            Resume
          </button>
          <button
            onClick={resetGame}
            className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-medium text-slate-200 transition hover:bg-white/10"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
