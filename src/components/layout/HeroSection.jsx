import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 2 + i * 0.15,
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
}

export default function HeroSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -150,
        opacity: 0,
        scale: 0.9,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-screen flex items-center justify-center px-6"
    >
      <div className="hero-content max-w-5xl mx-auto text-center">
        <motion.div
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-white/60 tracking-widest uppercase mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Now Available — Version 3.0
        </motion.div>

        <motion.h1
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-display)] tracking-tight leading-[0.9] mb-6"
        >
          <span className="text-white">Build the </span>
          <span className="gradient-text">Future</span>
          <br />
          <span className="text-white/80">of Digital</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          A next-generation platform that transforms your ideas into
          extraordinary digital experiences with cutting-edge 3D technology.
        </motion.p>

        <motion.div
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            className="px-8 py-3.5 rounded-full font-medium bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white text-sm"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 40px rgba(108,99,255,0.4)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            Start Building →
          </motion.button>
          <motion.button
            className="px-8 py-3.5 rounded-full font-medium glass text-white/80 text-sm"
            whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
          >
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-white/40"
              animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
