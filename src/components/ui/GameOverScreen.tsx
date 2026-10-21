import { useGameStore } from '../../store/useGameStore';

export function GameOverScreen() {
  const isGameOver = useGameStore((s) => s.isGameOver);
  const score = useGameStore((s) => s.score);
  const lines = useGameStore((s) => s.lines);
  const level = useGameStore((s) => s.level);
  const highScore = useGameStore((s) => s.highScore);
  const resetGame = useGameStore((s) => s.resetGame);

  if (!isGameOver) return null;

  const isNewHigh = score > 0 && score >= highScore;

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-red-400">Game Over</h2>

        {isNewHigh && (
          <p className="mt-2 text-sm font-semibold text-yellow-400 animate-pulse">
            🎉 New High Score!
          </p>
        )}

        <div className="mt-6 space-y-2 text-slate-300">
          <p className="text-lg">
            Score: <span className="font-mono font-bold text-white">{score.toLocaleString()}</span>
          </p>
          <p>
            Lines: <span className="font-semibold text-purple-400">{lines}</span>
          </p>
          <p>
            Level: <span className="font-semibold text-cyan-400">{level}</span>
          </p>
          <p className="text-sm text-slate-500">
            Best: {highScore.toLocaleString()}
          </p>
        </div>

        <button
          onClick={resetGame}
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 active:scale-95"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
