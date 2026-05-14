import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Lights() {
  const movingLightRef = useRef()
  const rimLightRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Moving light for dynamic reflections
    if (movingLightRef.current) {
      movingLightRef.current.position.x = Math.sin(t * 0.3) * 6
      movingLightRef.current.position.y = Math.cos(t * 0.2) * 4 + 2
      movingLightRef.current.position.z = Math.cos(t * 0.4) * 6
    }

    // Rim light subtle movement
    if (rimLightRef.current) {
      rimLightRef.current.position.x = Math.sin(t * 0.15) * 3
    }
  })

  return (
    <>
      {/* Ambient fill */}
      <ambientLight intensity={0.15} color="#1a1a3e" />

      {/* Key light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Moving accent light */}
      <pointLight
        ref={movingLightRef}
        intensity={80}
        color="#6c63ff"
        distance={20}
        decay={2}
      />

      {/* Rim / back light */}
      <pointLight
        ref={rimLightRef}
        position={[-5, 2, -5]}
        intensity={60}
        color="#00d4ff"
        distance={15}
        decay={2}
      />

      {/* Fill light from below */}
      <pointLight
        position={[0, -5, 3]}
        intensity={30}
        color="#ff6b6b"
        distance={12}
        decay={2}
      />

      {/* Spotlight for dramatic effect */}
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={40}
        color="#8b85ff"
        castShadow
      />
    </>
  )
}
