import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { useMousePosition } from '../../hooks/useMousePosition'
import { useScrollProgress } from '../../hooks/useScrollProgress'

export default function FloatingObject() {
  const meshRef = useRef()
  const innerRef = useRef()
  const mouse = useMousePosition()
  const scroll = useScrollProgress()
  const targetRotation = useRef({ x: 0, y: 0 })
  const targetPosition = useRef({ x: 0, y: 0, z: 0 })

  const positions = useMemo(() => [
    { x: 0, y: 0, z: 0 },
    { x: -1.5, y: -2, z: -1 },
    { x: 2, y: -4, z: -2 },
    { x: 0, y: -6, z: 0 },
  ], [])

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.getElapsedTime()

    // Determine position from scroll
    const segmentCount = positions.length - 1
    const rawIndex = scroll * segmentCount
    const index = Math.min(Math.floor(rawIndex), segmentCount - 1)
    const t = rawIndex - index
    const current = positions[index]
    const next = positions[Math.min(index + 1, positions.length - 1)]

    targetPosition.current.x = current.x + (next.x - current.x) * t
    targetPosition.current.y = current.y + (next.y - current.y) * t
    targetPosition.current.z = current.z + (next.z - current.z) * t

    // Floating motion
    const floatX = Math.sin(time * 0.5) * 0.3
    const floatY = Math.cos(time * 0.3) * 0.2 + Math.sin(time * 0.7) * 0.1
    const floatZ = Math.sin(time * 0.4) * 0.15

    // Apply position with mouse offset and floating
    meshRef.current.position.x += (targetPosition.current.x + floatX + mouse.x * 0.3 - meshRef.current.position.x) * 0.03
    meshRef.current.position.y += (targetPosition.current.y + floatY + mouse.y * 0.2 - meshRef.current.position.y) * 0.03
    meshRef.current.position.z += (targetPosition.current.z + floatZ - meshRef.current.position.z) * 0.03

    // Smooth rotation with mouse influence
    targetRotation.current.x = time * 0.15 + mouse.y * 0.4
    targetRotation.current.y = time * 0.2 + mouse.x * 0.4

    meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * 0.02
    meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * 0.02
    meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.1

    // Scale based on scroll
    const scale = 1 + Math.sin(scroll * Math.PI) * 0.2
    meshRef.current.scale.setScalar(scale)

    // Inner object counter-rotation
    if (innerRef.current) {
      innerRef.current.rotation.x = -time * 0.3
      innerRef.current.rotation.y = -time * 0.4
    }
  })

  return (
    <group ref={meshRef}>
      {/* Main torus knot with transmission material */}
      <mesh castShadow>
        <torusKnotGeometry args={[1, 0.35, 256, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.4}
          chromaticAberration={0.3}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.3}
          temporalDistortion={0.1}
          ior={1.5}
          color="#6c63ff"
          roughness={0}
          toneMapped={false}
        />
      </mesh>

      {/* Inner glowing sphere */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.5, 4]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Orbiting rings */}
      <OrbitRing radius={2} speed={0.5} color="#6c63ff" />
      <OrbitRing radius={2.5} speed={-0.3} color="#00d4ff" axis="y" />
      <OrbitRing radius={1.8} speed={0.7} color="#ff6b6b" axis="z" />
    </group>
  )
}

function OrbitRing({ radius, speed, color, axis = 'x' }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    if (axis === 'x') ref.current.rotation.x = t * speed
    if (axis === 'y') ref.current.rotation.y = t * speed
    if (axis === 'z') ref.current.rotation.z = t * speed
  })

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.008, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={3}
        toneMapped={false}
      />
    </mesh>
  )
}
