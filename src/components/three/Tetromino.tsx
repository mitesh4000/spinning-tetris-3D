import { memo, useMemo } from 'react';
import { TETROMINO_COLORS, CELL_SIZE, CELL_GAP, type TetrominoType } from '../../game/constants';
import { getCells } from '../../game/tetrominoes';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../../game/constants';

interface Props {
  type: TetrominoType;
  rotation: number;
  position: { x: number; y: number };
  glowing?: boolean;
}

const totalW = BOARD_WIDTH * (CELL_SIZE + CELL_GAP) - CELL_GAP;
const totalH = BOARD_HEIGHT * (CELL_SIZE + CELL_GAP) - CELL_GAP;

function cellWorldPos(bx: number, by: number): [number, number, number] {
  const x = -totalW / 2 + bx * (CELL_SIZE + CELL_GAP) + CELL_SIZE / 2;
  const y = totalH / 2 - by * (CELL_SIZE + CELL_GAP) - CELL_SIZE / 2;
  return [x, y, 0];
}

function TetrominoInner({ type, rotation, position, glowing = true }: Props) {
  const cells = useMemo(
    () => getCells(type, rotation, position.x, position.y),
    [type, rotation, position.x, position.y]
  );
  const color = TETROMINO_COLORS[type];

  return (
    <group>
      {cells.map(([cx, cy], i) => {
        if (cy < 0) return null;
        const [wx, wy] = cellWorldPos(cx, cy);
        return (
          <mesh key={i} position={[wx, wy, 0.1]} castShadow>
            <boxGeometry args={[CELL_SIZE * 0.92, CELL_SIZE * 0.92, CELL_SIZE * 0.6]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={glowing ? 0.45 : 0.15}
              roughness={0.35}
              metalness={0.25}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export const Tetromino = memo(TetrominoInner);
