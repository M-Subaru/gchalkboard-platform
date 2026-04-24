'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '@/components/shared/Logo'

const navLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/for-teachers', label: 'For Teachers' },
  { href: '/for-schools', label: 'For Schools' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link href="/" aria-label="Global Chalkboard home">
            <Logo size="md" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors duration-150 hover:text-[#0ea472] cursor-pointer ${
                  pathname === href ? 'text-[#0ea472]' : 'text-muted-foreground'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/post-vacancy"
              className="px-4 py-2 text-sm font-medium rounded-lg border border-[#0ea472] text-[#0ea472] hover:bg-[#0ea472]/5 transition-colors duration-150"
            >
              Post a Vacancy
            </Link>
            <Link
              href="/talent-pool"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-[#0ea472] text-white hover:bg-[#0b8a60] transition-colors duration-150"
            >
              Join Talent Pool
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-foreground cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-5 flex flex-col gap-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    pathname === href ? 'text-[#0ea472]' : 'text-foreground'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                <Link
                  href="/post-vacancy"
                  className="px-4 py-2.5 text-sm font-medium rounded-lg border border-[#0ea472] text-[#0ea472] text-center"
                >
                  Post a Vacancy
                </Link>
                <Link
                  href="/talent-pool"
                  className="px-4 py-2.5 text-sm font-medium rounded-lg bg-[#0ea472] text-white text-center"
                >
                  Join Talent Pool
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
