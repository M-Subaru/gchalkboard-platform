'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Users, Search, BadgeCheck, HeartHandshake } from 'lucide-react'
import { DotPattern } from '@/components/ui/dot-pattern'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const whatWeOffer = [
  { icon: Search, title: 'Pre-screened candidates', body: 'Every teacher we send you has been verified: qualifications checked, references reviewed, and assessed for suitability before introduction.' },
  { icon: Users, title: 'Focused shortlisting', body: 'We do not flood your inbox. You receive a select number of well-matched candidates, each chosen with care for your specific requirements.' },
  { icon: BadgeCheck, title: 'No upfront fees', body: 'You pay nothing until a placement is made. Our fee is agreed in advance and applies only on a successful hire.' },
  { icon: HeartHandshake, title: 'Support through the process', body: 'We remain involved from introduction through to the start of term. If anything needs attention, we are here to support you.' },
]

const steps = [
  { n: '01', title: 'Post your vacancy', body: 'Tell us about the role, curriculum, and what you need.' },
  { n: '02', title: 'We source and screen', body: 'We identify candidates from our talent pool and conduct our own assessment before making any introduction.' },
  { n: '03', title: 'You interview', body: 'We send you a shortlist. You run your own selection process. We are available to advise throughout.' },
  { n: '04', title: 'Offer and placement', body: 'Once you have made your decision, we help coordinate the offer and keep things on track through to the start date.' },
]

export default function ForSchoolsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-[var(--gc-slate)] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden noise-bg">
        <DotPattern
          width={22} height={22} cr={1}
          className="text-white/8 [mask-image:radial-gradient(ellipse_80%_80%_at_30%_50%,black_40%,transparent_100%)]"
        />
        <div className="relative container mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="text-xs font-semibold tracking-widest uppercase text-[var(--gc-green)] mb-4"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            For Schools
          </motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-4xl sm:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            Qualified UK teachers,
            <br />matched to your school
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mt-5 text-lg text-white/70 leading-relaxed max-w-xl">
            We do the sourcing, vetting and shortlisting. You do the interviews and make the
            decision. No upfront fees, and a focused shortlist of well-matched candidates.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-8 flex flex-wrap gap-4">
            <Link href="/post-vacancy"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0ea472] text-white font-semibold text-sm hover:bg-[#0b8a60] transition-colors duration-150">
              Post a Vacancy <ArrowRight size={16} />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors duration-150">
              Talk to us first
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="mt-4 text-xs text-white/50">
            No upfront fees. Pay only on successful placement.
          </motion.p>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-xl mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--gc-slate)]" style={{ fontFamily: 'Outfit, sans-serif' }}>What you get</h2>
            <p className="mt-3 text-[var(--gc-muted)]">We focus on quality of match, not volume of candidates.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whatWeOffer.map(({ icon: Icon, title, body }, i) => (
              <motion.div key={title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="flex gap-4 p-6 rounded-xl border border-[var(--gc-green-light)] bg-white card-hover card-accent">
                <div className="w-10 h-10 rounded-full bg-[var(--gc-green-light)] flex items-center justify-center flex-shrink-0 mt-0.5">
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

      {/* FEE NOTE */}
      <section className="section-padding bg-[var(--gc-cream)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--gc-slate)] mb-5" style={{ fontFamily: 'Outfit, sans-serif' }}>How fees work</h2>
              <p className="text-[var(--gc-muted)] leading-relaxed mb-4">
                We operate on a placement fee model. There are no registration fees, no monthly
                retainers, and no charges for the shortlisting process.
              </p>
              <p className="text-[var(--gc-muted)] leading-relaxed mb-6">
                Our fee is agreed with you before we begin and applies only when a candidate you
                select from our shortlist takes up the post.
              </p>
              <p className="text-sm text-[var(--gc-muted)]">
                To discuss specifics, <Link href="/contact" className="text-[#0ea472] underline underline-offset-2">get in touch</Link>. We are happy to have a conversation before you post a vacancy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-xl mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--gc-slate)]" style={{ fontFamily: 'Outfit, sans-serif' }}>The process</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={step.n} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="relative bg-white rounded-xl border border-[var(--gc-green-light)] p-6 card-hover card-accent">
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--gc-green-light)] mb-4">
                  <span className="text-xs font-bold text-[var(--gc-green)]" style={{ fontFamily: 'Outfit, sans-serif' }}>{step.n}</span>
                </div>
                <h3 className="font-semibold text-[var(--gc-slate)] mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{step.title}</h3>
                <p className="text-sm text-[var(--gc-muted)] leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[var(--gc-green)] py-16 overflow-hidden noise-bg">
        <DotPattern
          width={24} height={24} cr={1}
          className="text-white/10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_40%,transparent_100%)]"
        />
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>Ready to post a vacancy?</h2>
            <p className="text-white/80 text-sm mb-8 max-w-md mx-auto">Tell us what you need and we will start the sourcing process.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/post-vacancy"
                className="px-6 py-3 rounded-lg bg-white text-[#0ea472] font-semibold text-sm hover:bg-white/90 transition-colors duration-150">
                Post a Vacancy
              </Link>
              <Link href="/contact"
                className="px-6 py-3 rounded-lg border border-white text-white font-semibold text-sm hover:bg-white/10 transition-colors duration-150">
                Contact Us First
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
