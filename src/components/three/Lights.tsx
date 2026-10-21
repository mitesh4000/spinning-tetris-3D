export function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[8, 15, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-6, 8, 4]} intensity={0.6} color="#22d3ee" />
      <pointLight position={[6, 6, -2]} intensity={0.4} color="#a855f7" />
      <pointLight position={[0, -2, 8]} intensity={0.3} color="#f97316" />
    </>
  );
}
