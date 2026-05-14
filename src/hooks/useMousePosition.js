import { useState, useEffect, useRef } from 'react'

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const smoothed = useRef({ x: 0, y: 0 })
  const frame = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      smoothed.current = { x, y }
    }

    const animate = () => {
      setPosition((prev) => ({
        x: prev.x + (smoothed.current.x - prev.x) * 0.05,
        y: prev.y + (smoothed.current.y - prev.y) * 0.05,
      }))
      frame.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    frame.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frame.current)
    }
  }, [])

  return position
}
