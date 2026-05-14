import { motion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #6c63ff, #00d4ff, #ff6b6b)',
      }}
    />
  )
}
