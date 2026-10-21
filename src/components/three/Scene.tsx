import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { CAMERA_POSITION, CAMERA_FOV } from '../../game/constants';
import { Lights } from './Lights';
import { SpinningBoard } from './SpinningBoard';

export function Scene() {
  return (
    <Canvas
      camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV, near: 0.1, far: 100 }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false }}
      style={{ width: '100%', height: '100%', background: '#050510' }}
    >
      <color attach="background" args={['#050510']} />
      <fog attach="fog" args={['#050510', 25, 45]} />
      <Suspense fallback={null}>
        <Lights />
        <SpinningBoard />
      </Suspense>
    </Canvas>
  );
}
