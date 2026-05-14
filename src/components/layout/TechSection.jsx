import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const techStack = [
  { name: 'WebGPU', desc: 'Next-gen graphics API' },
  { name: 'WASM', desc: 'Near-native performance' },
  { name: 'WebXR', desc: 'Immersive experiences' },
  { name: 'Edge AI', desc: 'Intelligent processing' },
  { name: 'CRDT', desc: 'Real-time collaboration' },
  { name: 'WebRTC', desc: 'Peer-to-peer streaming' },
]

export default function TechSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="technology" className="relative z-10 py-32 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent-warm)] font-medium"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            Technology Stack
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] tracking-tight mt-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <span className="text-white">Built on </span>
            <span className="gradient-text">Innovation</span>
          </motion.h2>
        </div>

        {/* Tech grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              className="group relative p-8 rounded-2xl glass text-center overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-display)] mb-2 relative z-10">
                {tech.name}
              </h3>
              <p className="text-xs text-white/40 relative z-10">{tech.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-24 text-center p-12 md:p-16 rounded-3xl glass relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/10 via-transparent to-[var(--color-accent)]/10" />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-4">
              <span className="text-white">Ready to </span>
              <span className="gradient-text">Transform?</span>
            </h3>
            <p className="text-white/40 max-w-lg mx-auto mb-8">
              Join thousands of creators who are already building the future of
              digital experiences with our platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                className="px-8 py-3.5 rounded-full font-medium bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white text-sm"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(108,99,255,0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial →
              </motion.button>
              <motion.button
                className="px-8 py-3.5 rounded-full font-medium glass text-white/80 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Talk to Sales
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
