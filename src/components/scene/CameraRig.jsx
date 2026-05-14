import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMousePosition } from '../../hooks/useMousePosition'
import { useScrollProgress } from '../../hooks/useScrollProgress'

export default function CameraRig() {
  const mouse = useMousePosition()
  const scroll = useScrollProgress()
  const target = useRef({ x: 0, y: 0, z: 6 })

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Camera follows scroll vertically
    target.current.y = -scroll * 8

    // Subtle camera sway from mouse
    const cameraX = mouse.x * 0.5
    const cameraY = target.current.y + mouse.y * 0.3

    // Smooth camera zoom on scroll
    const cameraZ = 6 + Math.sin(scroll * Math.PI) * -1

    // Subtle breathing motion
    const breathX = Math.sin(t * 0.2) * 0.1
    const breathY = Math.cos(t * 0.15) * 0.05

    state.camera.position.x += (cameraX + breathX - state.camera.position.x) * 0.02
    state.camera.position.y += (cameraY + breathY - state.camera.position.y) * 0.02
    state.camera.position.z += (cameraZ - state.camera.position.z) * 0.02

    // Camera looks slightly ahead of position
    state.camera.lookAt(0, target.current.y, 0)
  })

  return null
}
