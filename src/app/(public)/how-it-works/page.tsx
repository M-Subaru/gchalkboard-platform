'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { DotPattern } from '@/components/ui/dot-pattern'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const steps = [
  {
    teacher: { title: 'Register your interest', body: 'Submit your profile, CV, and a professional headshot via our talent pool form.' },
    school:  { title: 'Post your vacancy', body: 'Tell us about the role via our short vacancy form. Role type, curriculum, grade level, contract.' },
  },
  {
    teacher: { title: 'We review your profile', body: 'We look at your qualifications, experience, and teaching background to identify the best opportunities for you.' },
    school:  { title: 'We source candidates', body: 'We search our talent pool and, where needed, reach out to our wider network. Every candidate is assessed against your requirements.' },
  },
  {
    teacher: { title: 'We contact you directly', body: 'When we find a role that suits you, we reach out. We explain the school, the location, the package and ask whether you want to be introduced.' },
    school:  { title: 'You receive a shortlist', body: 'We send you a select number of well-matched candidates with a summary of each. You decide who to take forward.' },
  },
  {
    teacher: { title: 'Introduction and interviews', body: 'With your consent, we introduce you to the school. They run their own interview process; we are available to advise throughout.' },
    school:  { title: 'You run your own process', body: 'The selection process is yours to run. We are available to advise, answer questions, or help coordinate if needed.' },
  },
  {
    teacher: { title: 'Offer, support, and beyond', body: 'Once an offer is made, we help with questions about the move, the role, the contract. We stay in touch and remain available to both you and the school.' },
    school:  { title: 'Placement confirmed', body: 'Once you have made your decision and an offer is accepted, we coordinate the remaining steps and stay involved through the start of term.' },
  },
]

export default function HowItWorksPage() {
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
            The Process
          </motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-4xl sm:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            How it works
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mt-5 text-lg text-white/70 leading-relaxed max-w-xl">
            The same care, the same transparency, for teachers and schools alike.
          </motion.p>
        </div>
      </section>

      {/* ALIGNED STEP TABLE */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

          {/* Column headers */}
          <div className="grid grid-cols-[1fr_2px_1fr] gap-0 mb-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="pr-8 lg:pr-12">
              <p className="text-xs font-semibold tracking-widest uppercase text-[#0ea472] mb-1"
                style={{ fontFamily: 'Outfit, sans-serif' }}>For Teachers</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--gc-slate)]"
                style={{ fontFamily: 'Outfit, sans-serif' }}>Your route to a Gulf school</h2>
              <p className="mt-2 text-[var(--gc-muted)] text-sm">Free to register. No fees, ever.</p>
            </motion.div>
            <div className="bg-[var(--gc-green-light)]" />
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              custom={1} className="pl-8 lg:pl-12">
              <p className="text-xs font-semibold tracking-widest uppercase text-[#0ea472] mb-1"
                style={{ fontFamily: 'Outfit, sans-serif' }}>For Schools</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--gc-slate)]"
                style={{ fontFamily: 'Outfit, sans-serif' }}>Filling your vacancy</h2>
              <p className="mt-2 text-[var(--gc-muted)] text-sm">No upfront fees. Pay on successful placement only.</p>
            </motion.div>
          </div>

          {/* Steps: each row is one paired step so they always align */}
          <div className="space-y-0">
            {steps.map((pair, i) => {
              const isLast = i === steps.length - 1
              return (
                <motion.div
                  key={i}
                  variants={fadeUp} initial="hidden" whileInView="show"
                  viewport={{ once: true }} custom={i * 0.5}
                  className="grid grid-cols-[1fr_2px_1fr] gap-0"
                >
                  {/* Teacher step */}
                  <div className={`pr-8 lg:pr-12 flex gap-4 py-6 ${!isLast ? 'border-b border-[var(--gc-green-light)]' : ''}`}>
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-[#0ea472] flex items-center justify-center text-xs font-bold text-[#0ea472]"
                        style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {i + 1}
                      </div>
                    </div>
                    <div className="pt-0.5">
                      <h3 className="font-semibold text-[var(--gc-slate)] mb-1.5"
                        style={{ fontFamily: 'Outfit, sans-serif' }}>{pair.teacher.title}</h3>
                      <p className="text-sm text-[var(--gc-muted)] leading-relaxed">{pair.teacher.body}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className={`bg-[var(--gc-green-light)] mx-0 ${!isLast ? '' : ''}`} />

                  {/* School step */}
                  <div className={`pl-8 lg:pl-12 flex gap-4 py-6 ${!isLast ? 'border-b border-[var(--gc-green-light)]' : ''}`}>
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-[#0ea472] flex items-center justify-center text-xs font-bold text-[#0ea472]"
                        style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {i + 1}
                      </div>
                    </div>
                    <div className="pt-0.5">
                      <h3 className="font-semibold text-[var(--gc-slate)] mb-1.5"
                        style={{ fontFamily: 'Outfit, sans-serif' }}>{pair.school.title}</h3>
                      <p className="text-sm text-[var(--gc-muted)] leading-relaxed">{pair.school.body}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Buttons row — same grid so they align with their column */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={3}
            className="grid grid-cols-[1fr_2px_1fr] gap-0 mt-8"
          >
            <div className="pr-8 lg:pr-12">
              <Link href="/talent-pool"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0ea472] text-white font-semibold text-sm hover:bg-[#0b8a60] transition-colors duration-150">
                Join the talent pool <ArrowRight size={15} />
              </Link>
            </div>
            <div />
            <div className="pl-8 lg:pl-12">
              <Link href="/post-vacancy"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0ea472] text-white font-semibold text-sm hover:bg-[#0b8a60] transition-colors duration-150">
                Post a vacancy <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* HONEST NOTE */}
      <section className="section-padding bg-[var(--gc-cream)]">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-xl font-semibold text-[var(--gc-slate)] mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}>A few things worth knowing</h2>
            <p className="text-[var(--gc-muted)] leading-relaxed mb-4">
              We cannot guarantee a placement. School needs change, timelines shift, and decisions
              are ultimately made by the schools and teachers themselves. But we will always keep
              you informed, we will always be honest with you, and we will support both sides
              throughout the process.
            </p>
            <p className="text-[var(--gc-muted)] leading-relaxed">
              If something is not working, we will say so. If a match is not right, we will tell you
              rather than push it through. Our commitment is to an outcome that genuinely works for
              both the teacher and the school.
            </p>
          </motion.div>
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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3"
              style={{ fontFamily: 'Outfit, sans-serif' }}>Questions about the process?</h2>
            <p className="text-white/80 text-sm mb-8 max-w-sm mx-auto">
              We are happy to talk through anything before you commit to registering or posting.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#0ea472] font-semibold text-sm hover:bg-white/90 transition-colors duration-150">
              Get in touch <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
