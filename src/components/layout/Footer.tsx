import Link from 'next/link'
import Logo from '@/components/shared/Logo'

const footerLinks = {
  teachers: [
    { href: '/for-teachers', label: 'For Teachers' },
    { href: '/talent-pool', label: 'Join the Talent Pool' },
    { href: '/how-it-works', label: 'How It Works' },
  ],
  schools: [
    { href: '/for-schools', label: 'For Schools' },
    { href: '/post-vacancy', label: 'Post a Vacancy' },
    { href: '/how-it-works', label: 'Our Process' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[var(--gc-slate)] text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Logo size="md" className="[&_span]:text-white" />
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
              Connecting UK-qualified teachers with international schools across
              the Gulf region.
            </p>
            <p className="mt-4 text-xs text-white/40">
              UK-based. Always free for teachers.
            </p>
          </div>

          {/* Teachers */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest text-[var(--gc-green)] mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Teachers
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.teachers.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Schools */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest text-[var(--gc-green)] mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Schools
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.schools.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest text-[var(--gc-green)] mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Global Chalkboard. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Registered in the United Kingdom
          </p>
        </div>
      </div>
    </footer>
  )
}
