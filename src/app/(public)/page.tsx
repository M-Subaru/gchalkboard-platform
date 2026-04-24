'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, GraduationCap, Building2, Users } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const steps = [
  { n: '01', title: 'You tell us what you need', body: 'Teachers register their profile. Schools post a vacancy. Takes about five minutes.' },
  { n: '02', title: 'We find the right match', body: 'We review every application ourselves. No algorithm, no black box — a person looks at your profile.' },
  { n: '03', title: 'We make the introduction', body: 'Once we have a strong match, we introduce teacher and school directly and support both sides through the process.' },
  { n: '04', title: 'You get the outcome you came for', body: 'Teachers start a role abroad. Schools fill a vacancy with a qualified, prepared candidate.' },
]

const teacherBenefits = [
  'Free — no fees, ever',
  'Roles across Saudi Arabia, Kuwait, Qatar, Bahrain and Oman',
  'Personal guidance, not a job board',
  'Cultural preparation before you go',
]

const schoolBenefits = [
  'Pre-screened UK-qualified teachers',
  'Shortlist only, no volume dumping',
  'No upfront fees — pay on successful placement',
  'Support through offer and onboarding',
]

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--gc-cream)] pt-32 pb-24 md:pt-40 md:pb-32">
        <div
          aria-hidden
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #0ea472 0%, transparent 70%)' }}
        />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={0}
              className="text-sm font-semibold tracking-widest uppercase text-[var(--gc-green)] mb-5"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              UK Teachers. Gulf Schools.
            </motion.p>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--gc-slate)] leading-[1.1] tracking-tight"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Teaching abroad starts
              <br />with the right{' '}
              <span className="text-gradient">introduction</span>
            </motion.h1>

            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="mt-6 text-lg text-[var(--gc-muted)] leading-relaxed max-w-xl"
            >
              We connect UK-qualified teachers with international schools across the Gulf region.
              Personally. No algorithms, no bulk submissions — just careful matching on both sides.
            </motion.p>

            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={3}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link href="/talent-pool"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0ea472] text-white font-semibold text-sm hover:bg-[#0b8a60] transition-colors duration-150">
                Join the Talent Pool <ArrowRight size={16} />
              </Link>
              <Link href="/post-vacancy"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#0ea472] text-[#0ea472] font-semibold text-sm hover:bg-[#0ea472]/5 transition-colors duration-150">
                Post a Vacancy
              </Link>
            </motion.div>

            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={4}
              className="mt-5 text-xs text-[var(--gc-muted)]"
            >
              Always free for teachers. Schools pay only on successful placement.
            </motion.p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS TEASER */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-xl mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--gc-green)] mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>The Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--gc-slate)]" style={{ fontFamily: 'Outfit, sans-serif' }}>How we work</h2>
            <p className="mt-4 text-[var(--gc-muted)]">No large databases, no blind applications. We handle a small number of placements at a time so we can do each one properly.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div key={step.n} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
                <span className="block text-5xl font-bold text-[var(--gc-green-light)] mb-4 leading-none select-none" style={{ fontFamily: 'Outfit, sans-serif' }}>{step.n}</span>
                <h3 className="text-base font-semibold text-[var(--gc-slate)] mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{step.title}</h3>
                <p className="text-sm text-[var(--gc-muted)] leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={4} className="mt-12">
            <Link href="/how-it-works" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0ea472] hover:underline">
              See the full process <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* DUAL CTA */}
      <section className="section-padding bg-[var(--gc-cream)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
              className="rounded-2xl bg-white border border-[var(--gc-green-light)] p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[var(--gc-green-light)] flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={20} className="text-[#0ea472]" />
                </div>
                <h2 className="text-xl font-bold text-[var(--gc-slate)]" style={{ fontFamily: 'Outfit, sans-serif' }}>For Teachers</h2>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {teacherBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#0ea472] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[var(--gc-muted)]">{b}</span>
                  </li>
                ))}
              </ul>
              <Link href="/talent-pool"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0ea472] text-white font-semibold text-sm hover:bg-[#0b8a60] transition-colors duration-150">
                Join the Talent Pool <ArrowRight size={15} />
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
              className="rounded-2xl bg-[var(--gc-slate)] p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Building2 size={20} className="text-[#0ea472]" />
                </div>
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>For Schools</h2>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {schoolBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#0ea472] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/70">{b}</span>
                  </li>
                ))}
              </ul>
              <Link href="/post-vacancy"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-[#0ea472] text-[#0ea472] font-semibold text-sm hover:bg-[#0ea472]/10 transition-colors duration-150">
                Post a Vacancy <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--gc-green-light)] mb-6">
                <Users size={22} className="text-[#0ea472]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--gc-slate)] mb-5" style={{ fontFamily: 'Outfit, sans-serif' }}>We are not a job board</h2>
              <p className="text-[var(--gc-muted)] leading-relaxed">
                Global Chalkboard is a small, UK-based specialist. We work with a limited number of teachers and schools at any one time.
                That means you get a real response, not an automated acknowledgement. Every teacher we put forward has been spoken to.
                Every school we work with has been assessed for what they actually offer.
              </p>
              <Link href="/about" className="inline-flex items-center gap-1.5 mt-8 text-sm font-semibold text-[#0ea472] hover:underline">
                About Global Chalkboard <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA STRIP */}
      <section className="bg-[var(--gc-green)] py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Ready to get started?</h2>
            <p className="text-white/80 mb-8 text-sm">Teachers: register your profile and we will be in touch if we have a match. Schools: post a vacancy and we start the search.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/talent-pool" className="px-6 py-3 rounded-lg bg-white text-[#0ea472] font-semibold text-sm hover:bg-white/90 transition-colors duration-150">Join the Talent Pool</Link>
              <Link href="/post-vacancy" className="px-6 py-3 rounded-lg border border-white text-white font-semibold text-sm hover:bg-white/10 transition-colors duration-150">Post a Vacancy</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
