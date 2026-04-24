'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Globe, ShieldCheck, HeartHandshake, BookOpen } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const whatWeOffer = [
  { icon: ShieldCheck, title: 'Free — always', body: 'We charge schools, not teachers. Registering, being matched, and getting placed costs you nothing.' },
  { icon: Globe, title: 'Gulf region roles', body: 'We work with schools in Saudi Arabia, Kuwait, Qatar, Bahrain and Oman across a range of curricula and subjects.' },
  { icon: HeartHandshake, title: 'Personal matching', body: 'A person reviews your profile and matches you based on your qualifications, experience and preferences. Not an algorithm.' },
  { icon: BookOpen, title: 'Cultural preparation', body: 'Before you start, we help you understand what to expect — practically and professionally. No surprises.' },
]

const steps = [
  { n: '01', title: 'Register', body: 'Complete your profile. Upload your CV and a professional photo. Takes around five minutes.' },
  { n: '02', title: 'We review', body: 'We read every submission. If your profile is a strong match for current or upcoming vacancies, we will be in touch directly.' },
  { n: '03', title: 'Introduction', body: 'We introduce you to the school. You handle your own interviews — we support you through the process.' },
  { n: '04', title: 'Placement', body: 'Once an offer is agreed, we help with next steps and remain available throughout your first term.' },
]

const whoItsFor = [
  'UK-qualified teachers (QTS holders and those with equivalent qualifications)',
  'Newly qualified and experienced teachers alike',
  'Those based in the UK or already working abroad and looking for a new role',
  'Teachers open to roles starting in the next academic year or sooner',
]

export default function ForTeachersPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[var(--gc-cream)] pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="text-xs font-semibold tracking-widest uppercase text-[var(--gc-green)] mb-4"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            For Teachers
          </motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-4xl sm:text-5xl font-bold text-[var(--gc-slate)] leading-tight"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            Teach abroad — on your terms
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mt-5 text-lg text-[var(--gc-muted)] leading-relaxed max-w-xl">
            Working internationally is a significant decision. We treat it like one. No mass
            applications, no chasing — just a straightforward process designed around you.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-8">
            <Link href="/talent-pool"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0ea472] text-white font-semibold text-sm hover:bg-[#0b8a60] transition-colors duration-150">
              Join the Talent Pool <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="mt-4 text-xs text-[var(--gc-muted)]">
            Free for teachers. No account needed to register.
          </motion.p>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-xl mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--gc-slate)]" style={{ fontFamily: 'Outfit, sans-serif' }}>What you get</h2>
            <p className="mt-3 text-[var(--gc-muted)]">We are not a job board. Here is what that actually means for you.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whatWeOffer.map(({ icon: Icon, title, body }, i) => (
              <motion.div key={title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="flex gap-4 p-6 rounded-xl border border-[var(--gc-green-light)] bg-white">
                <div className="w-10 h-10 rounded-full bg-[var(--gc-green-light)] flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-[#0ea472]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--gc-slate)] mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{title}</h3>
                  <p className="text-sm text-[var(--gc-muted)] leading-relaxed">{body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO ITS FOR */}
      <section className="section-padding bg-[var(--gc-cream)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--gc-slate)] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Who we work with</h2>
              <p className="text-[var(--gc-muted)] mb-6">We work with teachers at all stages of their career, provided they hold a UK teaching qualification or equivalent.</p>
              <ul className="space-y-3">
                {whoItsFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#0ea472] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[var(--gc-muted)]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
              className="bg-[var(--gc-slate)] rounded-2xl p-8 text-white">
              <h3 className="text-lg font-bold mb-5" style={{ fontFamily: 'Outfit, sans-serif' }}>The Gulf region at a glance</h3>
              <p className="text-sm text-white/70 leading-relaxed mb-4">
                Gulf schools — particularly those following the British or IB curriculum — are
                actively recruiting qualified UK teachers. Packages typically include tax-free salary,
                accommodation, flights and healthcare.
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                We place teachers in Saudi Arabia, Kuwait, Qatar, Bahrain and Oman. Each country has
                its own character, and we will help you understand what to expect before you commit to anything.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-xl mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--gc-slate)]" style={{ fontFamily: 'Outfit, sans-serif' }}>How it works</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div key={step.n} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
                <span className="block text-5xl font-bold text-[var(--gc-green-light)] mb-3 leading-none select-none" style={{ fontFamily: 'Outfit, sans-serif' }}>{step.n}</span>
                <h3 className="font-semibold text-[var(--gc-slate)] mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{step.title}</h3>
                <p className="text-sm text-[var(--gc-muted)] leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--gc-green)] py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>Ready to register?</h2>
            <p className="text-white/80 text-sm mb-8 max-w-md mx-auto">
              Join the talent pool and we will be in touch if your profile matches a current or upcoming vacancy.
            </p>
            <Link href="/talent-pool"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#0ea472] font-semibold text-sm hover:bg-white/90 transition-colors duration-150">
              Join the Talent Pool <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
