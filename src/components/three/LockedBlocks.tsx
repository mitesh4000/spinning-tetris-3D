import { memo, useMemo } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { TETROMINO_COLORS, CELL_SIZE, CELL_GAP, BOARD_WIDTH, BOARD_HEIGHT, type TetrominoType } from '../../game/constants';

const totalW = BOARD_WIDTH * (CELL_SIZE + CELL_GAP) - CELL_GAP;
const totalH = BOARD_HEIGHT * (CELL_SIZE + CELL_GAP) - CELL_GAP;

function cellWorldPos(bx: number, by: number): [number, number, number] {
  const x = -totalW / 2 + bx * (CELL_SIZE + CELL_GAP) + CELL_SIZE / 2;
  const y = totalH / 2 - by * (CELL_SIZE + CELL_GAP) - CELL_SIZE / 2;
  return [x, y, 0];
}

function LockedBlocksInner() {
  const board = useGameStore((s) => s.board);

  const blocks = useMemo(() => {
    const result: { x: number; y: number; type: TetrominoType; key: string }[] = [];
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        const cell = board[y][x];
        if (cell) {
          result.push({ x, y, type: cell, key: `${x}-${y}` });
        }
      }
    }
    return result;
  }, [board]);

  return (
    <group>
      {blocks.map(({ x, y, type, key }) => {
        const [wx, wy] = cellWorldPos(x, y);
        const color = TETROMINO_COLORS[type];
        return (
          <mesh key={key} position={[wx, wy, 0]} castShadow receiveShadow>
            <boxGeometry args={[CELL_SIZE * 0.92, CELL_SIZE * 0.92, CELL_SIZE * 0.55]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.12}
              roughness={0.5}
              metalness={0.15}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export const LockedBlocks = memo(LockedBlocksInner);
