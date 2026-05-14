import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 2000

function generateParticleData() {
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const velocities = new Float32Array(PARTICLE_COUNT * 3)
  const colors = new Float32Array(PARTICLE_COUNT * 3)

  const palette = [
    new THREE.Color('#6c63ff'),
    new THREE.Color('#00d4ff'),
    new THREE.Color('#ff6b6b'),
    new THREE.Color('#8b85ff'),
  ]

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 40
    positions[i3 + 1] = (Math.random() - 0.5) * 40
    positions[i3 + 2] = (Math.random() - 0.5) * 40

    velocities[i3] = (Math.random() - 0.5) * 0.005
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.005
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.005

    const color = palette[Math.floor(Math.random() * palette.length)]
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
  }

  return { positions, velocities, colors }
}

export default function ParticleField() {
  const pointsRef = useRef()
  const [data] = useState(generateParticleData)

  useFrame((state) => {
    if (!pointsRef.current) return

    const positionsArr = pointsRef.current.geometry.attributes.position.array
    const t = state.clock.getElapsedTime()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3

      positionsArr[i3] += data.velocities[i3] + Math.sin(t * 0.1 + i * 0.01) * 0.002
      positionsArr[i3 + 1] += data.velocities[i3 + 1] + Math.cos(t * 0.15 + i * 0.01) * 0.002
      positionsArr[i3 + 2] += data.velocities[i3 + 2]

      for (let j = 0; j < 3; j++) {
        if (positionsArr[i3 + j] > 20) positionsArr[i3 + j] = -20
        if (positionsArr[i3 + j] < -20) positionsArr[i3 + j] = 20
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y = t * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={data.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={data.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
