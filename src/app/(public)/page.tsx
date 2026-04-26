'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, GraduationCap, Building2, Users, Sparkles } from 'lucide-react'
import { DotPattern } from '@/components/ui/dot-pattern'
import { NumberTicker } from '@/components/ui/number-ticker'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { Globe } from '@/components/ui/globe'
import { Highlighter } from '@/components/ui/highlighter'
import { DottedMap } from '@/components/ui/dotted-map'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const steps = [
  { n: '01', title: 'You tell us what you need', body: 'Teachers register their profile. Schools post a vacancy. Our team reviews every submission personally.' },
  { n: '02', title: 'We find the right match', body: 'Every submission is reviewed carefully. We match based on qualifications, experience, and the specific needs of both teacher and school.' },
  { n: '03', title: 'We make the introduction', body: 'Once we have a strong match, we introduce teacher and school directly and support both sides through the process.' },
  { n: '04', title: 'You get the outcome you came for', body: 'Teachers start a role abroad. Schools fill a vacancy with a qualified, prepared candidate.' },
]

const teacherBenefits = [
  'Free, no fees ever',
  'Roles across Saudi Arabia, Kuwait, Qatar, Bahrain and Oman',
  'Careful matching based on your qualifications and preferences',
  'Preparation and context before you go',
]

const schoolBenefits = [
  'Pre-screened UK-qualified teachers',
  'A focused shortlist, matched to your requirements',
  'No upfront fees, pay on successful placement',
  'Support through offer and onboarding',
]

const stats = [
  { value: 5, suffix: '', label: 'Gulf countries covered' },
  { value: 100, suffix: '%', label: 'UK-qualified teachers' },
]

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--gc-cream)] pt-32 pb-24 md:pt-40 md:pb-32">
        <DotPattern
          width={22} height={22} cr={1}
          className="text-[#0ea472]/15 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]"
        />
        <div
          aria-hidden
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #0ea472 0%, transparent 70%)' }}
        />

        <div className="relative container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: headline */}
            <div>
              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={0}
                className="inline-flex items-center gap-2 rounded-full border border-[#0ea472]/30 bg-[#0ea472]/8 px-4 py-1.5 mb-6"
              >
                <Sparkles size={13} className="text-[#0ea472]" />
                <span
                  className="text-xs font-semibold tracking-widest uppercase animate-shimmer-badge"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  UK Teachers. Gulf Schools.
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp} initial="hidden" animate="show" custom={1}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--gc-slate)] leading-[1.1] tracking-tight"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Teaching abroad starts
                <br />with the right{' '}
                <Highlighter
                  action="underline"
                  color="#0ea472"
                  strokeWidth={2.5}
                  animationDuration={600}
                  iterations={1}
                  isView={false}
                  delay={900}
                  className="text-gradient"
                >
                  introduction
                </Highlighter>
              </motion.h1>

              <motion.p
                variants={fadeUp} initial="hidden" animate="show" custom={2}
                className="mt-6 text-lg text-[var(--gc-muted)] leading-relaxed max-w-xl"
              >
                We connect UK-qualified teachers with international schools across the Gulf region.
                Personally. Every match is considered carefully, on both sides.
              </motion.p>

              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={3}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link href="/talent-pool"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0ea472] text-white font-semibold text-sm hover:bg-[#0b8a60] transition-colors duration-150 shadow-sm">
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

            {/* Right: Globe */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="hidden lg:flex flex-col items-center justify-center"
            >
              <div className="relative w-full max-w-[420px]">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[95%] aspect-square rounded-full border border-[#0ea472]/10" />
                  <div className="absolute w-[75%] aspect-square rounded-full border border-[#0ea472]/10" />
                </div>
                <Globe className="w-full" />
              </div>

              {/* Gulf countries list */}
              <div className="mt-3 w-full max-w-[380px]">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--gc-muted)] mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Placing teachers in</p>
                <div className="flex flex-wrap gap-2">
                  {['Saudi Arabia', 'Kuwait', 'Qatar', 'Bahrain', 'Oman'].map((country) => (
                    <span key={country} className="inline-flex items-center gap-1.5 text-xs text-[var(--gc-slate)] bg-white border border-[var(--gc-green-light)] rounded-full px-3 py-1 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0ea472] flex-shrink-0" />
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-white border-y border-[var(--gc-green-light)] py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-center">
            {stats.map(({ value, suffix, label }, i) => (
              <motion.div key={label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
                <p className="text-3xl font-bold text-[var(--gc-slate)]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <NumberTicker value={value} className="text-[var(--gc-green)]" />{suffix}
                </p>
                <p className="text-xs text-[var(--gc-muted)] mt-1 leading-snug">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS TEASER */}
      <section className="section-padding bg-[var(--gc-cream)]">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-xl mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--gc-green)] mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>The Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--gc-slate)]" style={{ fontFamily: 'Outfit, sans-serif' }}>How we work</h2>
            <p className="mt-4 text-[var(--gc-muted)]">Careful, considered placements. We give each teacher and school the attention they deserve.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="relative bg-white rounded-xl border border-[var(--gc-green-light)] p-6 card-hover card-accent overflow-hidden"
              >
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--gc-green-light)] mb-4">
                  <span className="text-xs font-bold text-[var(--gc-green)]" style={{ fontFamily: 'Outfit, sans-serif' }}>{step.n}</span>
                </div>
                <h3 className="text-sm font-semibold text-[var(--gc-slate)] mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{step.title}</h3>
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
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Teachers */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
              className="rounded-2xl bg-white border border-[var(--gc-green-light)] p-8 flex flex-col card-hover card-accent overflow-hidden">
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
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0ea472] text-white font-semibold text-sm hover:bg-[#0b8a60] transition-colors duration-150 shadow-sm">
                Join the Talent Pool <ArrowRight size={15} />
              </Link>
            </motion.div>

            {/* Schools */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
              className="rounded-2xl bg-[var(--gc-slate)] p-8 flex flex-col relative overflow-hidden noise-bg">
              <div className="relative flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Building2 size={20} className="text-[#0ea472]" />
                </div>
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>For Schools</h2>
              </div>
              <ul className="relative space-y-3 mb-8 flex-1">
                {schoolBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#0ea472] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/70">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="relative">
                <Link href="/post-vacancy"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-[#0ea472] text-[#0ea472] font-semibold text-sm hover:bg-[#0ea472]/10 transition-colors duration-150">
                  Post a Vacancy <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER + DOTTED MAP */}
      <section className="section-padding bg-[var(--gc-cream)] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: text */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--gc-green-light)] mb-6">
                <Users size={22} className="text-[#0ea472]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--gc-slate)] mb-5" style={{ fontFamily: 'Outfit, sans-serif' }}>How we are different</h2>
              <p className="text-[var(--gc-muted)] leading-relaxed">
                Global Chalkboard is a UK-based specialist focused entirely on Gulf placements.
                We prioritise quality over volume, giving each teacher and school the time and attention
                their situation deserves. Every teacher in our pool is reviewed personally. Every school
                we work with is one we know well.
              </p>
              <Link href="/about" className="inline-flex items-center gap-1.5 mt-8 text-sm font-semibold text-[#0ea472] hover:underline">
                About Global Chalkboard <ArrowRight size={15} />
              </Link>
            </motion.div>

            {/* Right: dotted map */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-[var(--gc-green-light)] bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold tracking-widest uppercase text-[var(--gc-green)] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Where we place
                </p>
                <DottedMap
                  width={160}
                  height={80}
                  mapSamples={5000}
                  dotColor="#94a3b880"
                  markerColor="#0ea472"
                  dotRadius={0.6}
                  pulse
                  markers={[
                    { lat: 51.5074, lng: -0.1278,  size: 0.8 },   // UK
                    { lat: 24.7136, lng: 46.6753,  size: 0.9 },   // Saudi Arabia
                    { lat: 29.3759, lng: 47.9774,  size: 0.7 },   // Kuwait
                    { lat: 25.2854, lng: 51.531,   size: 0.7 },   // Qatar
                    { lat: 26.0667, lng: 50.5577,  size: 0.7 },   // Bahrain
                    { lat: 23.614,  lng: 58.5922,  size: 0.8 },   // Oman
                  ]}
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { label: 'United Kingdom', tag: 'Origin' },
                    { label: 'Saudi Arabia' },
                    { label: 'Kuwait' },
                    { label: 'Qatar' },
                    { label: 'Bahrain' },
                    { label: 'Oman' },
                  ].map(({ label, tag }) => (
                    <span key={label} className="inline-flex items-center gap-1.5 text-xs text-[var(--gc-slate)] bg-[var(--gc-cream)] border border-[var(--gc-green-light)] rounded-full px-2.5 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0ea472] flex-shrink-0" />
                      {label}
                      {tag && <span className="text-[10px] text-[var(--gc-muted)]">({tag})</span>}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA STRIP */}
      <section className="relative bg-[var(--gc-green)] py-16 overflow-hidden noise-bg">
        <DotPattern
          width={24} height={24} cr={1}
          className="text-white/10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_40%,transparent_100%)]"
        />
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Ready to get started?</h2>
            <p className="text-white/80 mb-8 text-sm">Teachers: register your profile and we will review your details and be in touch. Schools: post a vacancy and we begin the search.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/talent-pool" className="px-6 py-3 rounded-lg bg-white text-[#0ea472] font-semibold text-sm hover:bg-white/90 transition-colors duration-150 shadow-sm">Join the Talent Pool</Link>
              <Link href="/post-vacancy" className="px-6 py-3 rounded-lg border border-white text-white font-semibold text-sm hover:bg-white/10 transition-colors duration-150">Post a Vacancy</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
