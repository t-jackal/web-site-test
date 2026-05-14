import { motion } from 'framer-motion'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Changelog', 'Documentation'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Community', 'Tutorials', 'Support', 'API'],
  Legal: ['Privacy', 'Terms', 'Security', 'Status'],
}

export default function FooterSection() {
  return (
    <footer id="contact" className="relative z-10 py-16 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <motion.span
              className="text-xl font-bold font-[family-name:var(--font-display)] gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              NEXUS
            </motion.span>
            <p className="text-xs text-white/30 mt-3 leading-relaxed">
              Building the future of digital experiences.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-white/30 hover:text-white/70 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
          <p className="text-xs text-white/20">
            © 2026 NEXUS. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {['Twitter', 'GitHub', 'Discord'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-white/30 hover:text-white/70 transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
