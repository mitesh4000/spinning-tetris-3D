import { useBoardRotation } from '../../hooks/useBoardRotation';
import { useGameStore } from '../../store/useGameStore';
import { BoardGrid } from './BoardGrid';
import { LockedBlocks } from './LockedBlocks';
import { Tetromino } from './Tetromino';

export function SpinningBoard() {
  const groupRef = useBoardRotation();
  const currentPiece = useGameStore((s) => s.currentPiece);
  const currentRotation = useGameStore((s) => s.currentRotation);
  const currentPosition = useGameStore((s) => s.currentPosition);

  return (
    <group ref={groupRef}>
      <BoardGrid />
      <LockedBlocks />
      {currentPiece && (
        <Tetromino
          type={currentPiece}
          rotation={currentRotation}
          position={currentPosition}
          glowing
        />
      )}
    </group>
  );
}
