import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: '◈',
    title: 'Neural Engine',
    description: 'AI-powered processing pipeline that adapts and evolves with your creative workflow.',
    color: '#6c63ff',
  },
  {
    icon: '◇',
    title: 'Quantum Render',
    description: 'Real-time ray tracing with photorealistic quality at unprecedented speeds.',
    color: '#00d4ff',
  },
  {
    icon: '△',
    title: 'Mesh Fusion',
    description: 'Seamlessly blend complex geometries with intelligent topology optimization.',
    color: '#ff6b6b',
  },
  {
    icon: '○',
    title: 'Light Architect',
    description: 'Physically-based lighting system with volumetric atmosphere and caustics.',
    color: '#8b85ff',
  },
  {
    icon: '□',
    title: 'Motion DNA',
    description: 'Procedural animation engine with physics simulation and natural motion capture.',
    color: '#00d4ff',
  },
  {
    icon: '⬡',
    title: 'Cloud Sync',
    description: 'Distributed rendering across edge networks with zero-latency collaboration.',
    color: '#6c63ff',
  },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className="group relative p-6 md:p-8 rounded-2xl glass overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {/* Hover gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${feature.color}15, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5"
          style={{
            background: `${feature.color}15`,
            color: feature.color,
          }}
        >
          {feature.icon}
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 font-[family-name:var(--font-display)]">
          {feature.title}
        </h3>
        <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
      </div>

      {/* Bottom line accent */}
      <motion.div
        className="absolute bottom-0 left-0 h-px"
        style={{ background: feature.color }}
        initial={{ width: '0%' }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  )
}

export default function FeaturesSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const isInView = useInView(headingRef, { once: true, margin: '-100px' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.features-grid',
        { y: 80 },
        {
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative z-10 py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <motion.span
            className="text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Capabilities
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] tracking-tight mt-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-white">Powerful </span>
            <span className="gradient-text">Features</span>
          </motion.h2>
          <motion.p
            className="text-white/40 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Everything you need to create stunning digital experiences, powered
            by next-generation technology.
          </motion.p>
        </div>

        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
