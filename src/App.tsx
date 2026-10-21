import { Scene } from './components/three/Scene';
import { StartScreen } from './components/ui/StartScreen';
import { Hud } from './components/ui/Hud';
import { PauseMenu } from './components/ui/PauseMenu';
import { GameOverScreen } from './components/ui/GameOverScreen';
import { MobileControls } from './components/ui/MobileControls';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import { useGameLoop } from './hooks/useGameLoop';
import { useGameStore } from './store/useGameStore';

function App() {
  useKeyboardControls();
  useGameLoop();

  const isPlaying = useGameStore((s) => s.isPlaying);
  const isGameOver = useGameStore((s) => s.isGameOver);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Scene />
      {!isPlaying && !isGameOver && <StartScreen />}
      <Hud />
      <PauseMenu />
      <GameOverScreen />
      <MobileControls />
    </div>
  );
}

export default App;
