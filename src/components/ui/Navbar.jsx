import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = ['About', 'Features', 'Technology', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3' : 'py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 1.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-xl font-bold font-[family-name:var(--font-display)] tracking-tight"
          whileHover={{ scale: 1.05 }}
        >
          <span className="gradient-text">NEXUS</span>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-white/60 hover:text-white transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          <motion.button
            className="px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(108,99,255,0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <motion.span
            className="block w-6 h-0.5 bg-white"
            animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-white"
            animate={{ opacity: mobileOpen ? 0 : 1 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-white"
            animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden glass mt-2 mx-4 rounded-2xl p-6"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-white/70 hover:text-white py-2 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
