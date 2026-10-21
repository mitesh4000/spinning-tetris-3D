import { BoxGeometry } from 'three';
import { BOARD_WIDTH, BOARD_HEIGHT, CELL_SIZE, CELL_GAP } from '../../game/constants';

const totalW = BOARD_WIDTH * (CELL_SIZE + CELL_GAP) - CELL_GAP;
const totalH = BOARD_HEIGHT * (CELL_SIZE + CELL_GAP) - CELL_GAP;
const frameGeo = new BoxGeometry(totalW + 0.3, totalH + 0.3, 0.05);

export function BoardGrid() {
  return (
    <group position={[0, 0, -0.02]}>
      {/* Back panel */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[totalW + 0.4, totalH + 0.4]} />
        <meshStandardMaterial color="#0a0a18" transparent opacity={0.85} />
      </mesh>
      {/* Frame */}
      <lineSegments>
        <edgesGeometry args={[frameGeo]} />
        <lineBasicMaterial color="#334155" />
      </lineSegments>
      {/* Vertical grid lines */}
      {Array.from({ length: BOARD_WIDTH + 1 }).map((_, i) => {
        const x = -totalW / 2 + i * (CELL_SIZE + CELL_GAP) - CELL_GAP / 2;
        return (
          <mesh key={`v${i}`} position={[x, 0, 0]}>
            <boxGeometry args={[0.015, totalH, 0.008]} />
            <meshBasicMaterial color="#1e293b" transparent opacity={0.6} />
          </mesh>
        );
      })}
      {/* Horizontal grid lines */}
      {Array.from({ length: BOARD_HEIGHT + 1 }).map((_, i) => {
        const y = totalH / 2 - i * (CELL_SIZE + CELL_GAP) + CELL_GAP / 2;
        return (
          <mesh key={`h${i}`} position={[0, y, 0]}>
            <boxGeometry args={[totalW, 0.015, 0.008]} />
            <meshBasicMaterial color="#1e293b" transparent opacity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}
