import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Preload } from '@react-three/drei'
import FloatingObject from './FloatingObject'
import Lights from './Lights'
import ParticleField from './ParticleField'
import PostProcessing from './PostProcessing'
import CameraRig from './CameraRig'

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        camera={{ position: [0, 0, 6], fov: 55, near: 0.1, far: 100 }}
      >
        <color attach="background" args={['#0a0a0f']} />
        <fog attach="fog" args={['#0a0a0f', 10, 30]} />

        <Suspense fallback={null}>
          <CameraRig />
          <Lights />
          <FloatingObject />
          <ParticleField />
          <Environment
            preset="night"
            backgroundIntensity={0}
            environmentIntensity={0.5}
          />
          <PostProcessing />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
