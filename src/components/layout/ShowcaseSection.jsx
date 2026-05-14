import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '< 10ms', label: 'Latency' },
  { value: '500K+', label: 'Active Users' },
  { value: '4.9/5', label: 'Rating' },
]

export default function ShowcaseSection() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const isInView = useInView(contentRef, { once: true, margin: '-100px' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax text
      gsap.fromTo(
        '.showcase-title',
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      )

      gsap.fromTo(
        '.showcase-desc',
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
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
      id="about"
      className="relative z-10 py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <motion.span
              className="text-xs tracking-[0.3em] uppercase text-[var(--color-accent)] font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
            >
              Why Choose Us
            </motion.span>
            <h2 className="showcase-title text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)] tracking-tight mt-4 mb-6">
              <span className="text-white">Redefining </span>
              <span className="gradient-text">Excellence</span>
            </h2>
            <p className="showcase-desc text-white/40 leading-relaxed mb-8">
              Our platform combines cutting-edge 3D rendering technology with
              intuitive design tools, enabling creators to build immersive
              digital experiences that captivate audiences and push the boundaries
              of what&#39;s possible on the web.
            </p>

            {/* Feature list */}
            <div className="space-y-4">
              {['Real-time collaboration', 'GPU-accelerated rendering', 'Zero-config deployment'].map(
                (item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] text-xs">
                      ✓
                    </div>
                    <span className="text-white/60 text-sm">{item}</span>
                  </motion.div>
                )
              )}
            </div>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="p-6 rounded-2xl glass text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(108,99,255,0.1)',
                }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text font-[family-name:var(--font-display)]">
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 mt-2 tracking-wider uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
