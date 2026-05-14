import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 15 + 5
        const next = Math.min(prev + increment, 100)
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsComplete(true), 500)
        }
        return next
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: '#0a0a0f' }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated background orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
              style={{ background: '#6c63ff', top: '20%', left: '30%' }}
              animate={{ x: [0, 50, -30, 0], y: [0, -30, 20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-72 h-72 rounded-full blur-3xl opacity-15"
              style={{ background: '#00d4ff', bottom: '20%', right: '25%' }}
              animate={{ x: [0, -40, 30, 0], y: [0, 30, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <motion.div
            className="relative z-10 flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Logo */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-display)] tracking-tighter"
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '-0.02em' }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <span className="gradient-text">NEXUS</span>
            </motion.h1>

            {/* Progress bar */}
            <div className="w-64 md:w-80">
              <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #6c63ff, #00d4ff)',
                    width: `${progress}%`,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between mt-3">
                <span className="text-xs text-white/40 font-mono tracking-wider">
                  INITIALIZING
                </span>
                <span className="text-xs text-white/60 font-mono">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
