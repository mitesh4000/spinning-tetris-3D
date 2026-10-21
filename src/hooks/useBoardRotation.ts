import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../store/useGameStore';
import { BOARD_ROTATION_SPEED, MAX_BOARD_TILT } from '../game/constants';
import type { Group } from 'three';

export function useBoardRotation() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const { isPlaying, isPaused, isGameOver, tiltX } = useGameStore.getState();
    const targetSpeed = isPlaying && !isPaused && !isGameOver ? BOARD_ROTATION_SPEED : 0;

    // smooth rotation speed
    const current = (group.userData.rotSpeed as number) ?? 0;
    const newSpeed = current + (targetSpeed - current) * Math.min(1, delta * 3);
    group.userData.rotSpeed = newSpeed;
    group.rotation.y += newSpeed * delta;

    // subtle tilt based on horizontal movement
    const targetTilt = tiltX * MAX_BOARD_TILT * 0.15;
    group.rotation.z += (targetTilt - group.rotation.z) * Math.min(1, delta * 5);
  });

  return groupRef;
}
