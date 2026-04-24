'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const teacherSteps = [
  { n: '01', title: 'Register your interest', body: 'Submit your profile, CV, and a professional headshot via our talent pool form. The process takes ten to fifteen minutes.' },
  { n: '02', title: 'We review your profile', body: 'We check your qualifications, experience, and whether your background aligns with the kinds of roles we are currently sourcing for.' },
  { n: '03', title: 'We contact you directly', body: 'If we have a role that fits, we reach out. We explain the school, the location, the package — and ask whether you want to be introduced.' },
  { n: '04', title: 'Introduction and interviews', body: 'With your consent, we introduce you to the school. They run their own interview process; we are available to advise throughout.' },
  { n: '05', title: 'Offer, support, and beyond', body: 'Once an offer is made, we help with what we can — questions about the move, the role, the contract. We stay in touch through your first term.' },
]

const schoolSteps = [
  { n: '01', title: 'Post your vacancy', body: 'Tell us about the role via our short vacancy form. Role type, curriculum, grade level, contract — the basics. Takes five minutes.' },
  { n: '02', title: 'We source candidates', body: 'We search our talent pool and, where needed, reach out to our wider network. Every candidate we consider is assessed against your requirements.' },
  { n: '03', title: 'You receive a shortlist', body: 'We send you a small number of well-matched candidates — typically two to four — with a summary of each. No bulk lists.' },
  { n: '04', title: 'You interview and decide', body: 'The interviews are yours to run. We are available to advise, answer questions, or help coordinate if needed.' },
  { n: '05', title: 'Placement confirmed', body: 'Once you have made your decision and an offer is accepted, we coordinate the remaining steps and stay involved through the start of term.' },
]

function StepList({ steps }: { steps: typeof teacherSteps }) {
  return (
    <ol className="relative border-l border-[var(--gc-green-light)] ml-4 space-y-10">
      {steps.map((step, i) => (
        <motion.li key={step.n} variants={fadeUp} initial="hidden" whileInView="show"
          viewport={{ once: true }} custom={i}
          className="pl-8 relative">
          <span className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-white border-2 border-[#0ea472]
            flex items-center justify-center text-xs font-bold text-[#0ea472]"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            {i + 1}
          </span>
          <h3 className="font-semibold text-[var(--gc-slate)] mb-1.5"
            style={{ fontFamily: 'Outfit, sans-serif' }}>{step.title}</h3>
          <p className="text-sm text-[var(--gc-muted)] leading-relaxed">{step.body}</p>
        </motion.li>
      ))}
    </ol>
  )
}

export default function HowItWorksPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[var(--gc-slate)] pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
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
            A straightforward process for both teachers and schools.
            No hidden steps, no unnecessary complexity.
          </motion.p>
        </div>
      </section>

      {/* FOR TEACHERS */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#0ea472] mb-2"
                  style={{ fontFamily: 'Outfit, sans-serif' }}>For Teachers</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--gc-slate)]"
                  style={{ fontFamily: 'Outfit, sans-serif' }}>Your route to a Gulf school</h2>
                <p className="mt-3 text-[var(--gc-muted)] text-sm leading-relaxed">
                  Free to register. No fees, ever.
                </p>
              </motion.div>
              <StepList steps={teacherSteps} />
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="mt-10">
                <Link href="/talent-pool"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0ea472] text-white font-semibold text-sm hover:bg-[#0b8a60] transition-colors duration-150">
                  Join the talent pool <ArrowRight size={15} />
                </Link>
              </motion.div>
            </div>

            <div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#0ea472] mb-2"
                  style={{ fontFamily: 'Outfit, sans-serif' }}>For Schools</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--gc-slate)]"
                  style={{ fontFamily: 'Outfit, sans-serif' }}>Filling your vacancy</h2>
                <p className="mt-3 text-[var(--gc-muted)] text-sm leading-relaxed">
                  No upfront fees. Pay on successful placement only.
                </p>
              </motion.div>
              <StepList steps={schoolSteps} />
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="mt-10">
                <Link href="/post-vacancy"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0ea472] text-white font-semibold text-sm hover:bg-[#0b8a60] transition-colors duration-150">
                  Post a vacancy <ArrowRight size={15} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* HONEST NOTE */}
      <section className="section-padding bg-[var(--gc-cream)]">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-xl font-semibold text-[var(--gc-slate)] mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}>A few things worth knowing</h2>
            <p className="text-[var(--gc-muted)] leading-relaxed mb-4">
              We cannot guarantee a placement. If we take on a teacher, it is because we believe we can
              match them — but school needs change, timelines shift, and decisions are ultimately made
              by the schools themselves.
            </p>
            <p className="text-[var(--gc-muted)] leading-relaxed">
              What we can guarantee is that we will be honest with you throughout.
              If something is not working, we will say so. If a match is not right, we will tell you
              rather than push it through.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--gc-green)] py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
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
