'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[var(--gc-slate)] pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="text-xs font-semibold tracking-widest uppercase text-[var(--gc-green)] mb-4"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            About Us
          </motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-4xl sm:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            A small team with one clear focus
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mt-5 text-lg text-white/70 leading-relaxed max-w-xl">
            We connect UK-qualified teachers with international schools across the Gulf region.
            That is all we do, and we do it properly.
          </motion.p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--gc-slate)] mb-5"
                style={{ fontFamily: 'Outfit, sans-serif' }}>Who we are</h2>
              <p className="text-[var(--gc-muted)] leading-relaxed mb-4">
                Global Chalkboard is a UK-based recruitment service founded by two people with
                direct experience on both sides of the teacher-placement process.
              </p>
              <p className="text-[var(--gc-muted)] leading-relaxed mb-4">
                We have seen the generic job boards. We have seen the agencies that treat
                teachers as numbers and schools as invoices. We wanted to do something different —
                a service built around relationships and a genuine understanding of what Gulf
                schools need and what teachers moving abroad actually face.
              </p>
              <p className="text-[var(--gc-muted)] leading-relaxed">
                We work with a small number of schools at a time. We take on teachers whose
                backgrounds we can actually match to roles. We would rather do fewer things well
                than many things poorly.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
              className="p-8 rounded-2xl bg-[var(--gc-cream)] border border-gray-100">
              <h3 className="text-lg font-semibold text-[var(--gc-slate)] mb-4"
                style={{ fontFamily: 'Outfit, sans-serif' }}>Our approach</h3>
              <ul className="space-y-3">
                {[
                  'We check qualifications and references before making any introduction.',
                  'Schools receive a shortlist of two to four candidates, not a bulk dump.',
                  'Teachers pay nothing — our fee comes from the school on successful placement.',
                  'We stay involved through offer and start of term, not just introduction.',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[var(--gc-muted)] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0ea472] flex-shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* THE GULF — WHY */}
      <section className="section-padding bg-[var(--gc-cream)]">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--gc-slate)] mb-5"
              style={{ fontFamily: 'Outfit, sans-serif' }}>Why the Gulf?</h2>
            <p className="text-[var(--gc-muted)] leading-relaxed mb-4">
              International schools across Saudi Arabia, Kuwait, Qatar, Bahrain and Oman have grown
              significantly over the past decade. Many follow British or international curricula and
              actively recruit UK-trained teachers — particularly those with QTS and classroom
              experience at GCSE or A-Level equivalent.
            </p>
            <p className="text-[var(--gc-muted)] leading-relaxed mb-4">
              For teachers, these roles typically come with a tax-free salary,
              accommodation, flights and healthcare. The cost of living is low relative
              to the package. It is not for everyone, but for teachers who go in with clear
              expectations, the experience tends to leave a mark.
            </p>
            <p className="text-[var(--gc-muted)] leading-relaxed">
              We focus on this region because we know it. We understand the schools, the curricula,
              and the practical considerations teachers face when making the move.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--gc-slate)]"
              style={{ fontFamily: 'Outfit, sans-serif' }}>What sets us apart</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                label: 'Not a job board',
                body: 'We do not publish listings and wait for applications. We proactively match teachers from our talent pool to specific vacancies. Every introduction is deliberate.',
              },
              {
                label: 'Honest about fit',
                body: 'If a teacher is not right for a role, we say so. If a school cannot offer what a teacher needs, we are upfront about that too. Mismatches waste everyone\'s time.',
              },
              {
                label: 'Support that continues',
                body: 'We do not disappear after the placement fee lands. If something comes up in the first weeks, we are still reachable and still involved.',
              },
            ].map(({ label, body }, i) => (
              <motion.div key={label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
                <h3 className="font-semibold text-[var(--gc-slate)] mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{label}</h3>
                <p className="text-sm text-[var(--gc-muted)] leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--gc-green)] py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3"
              style={{ fontFamily: 'Outfit, sans-serif' }}>Ready to get started?</h2>
            <p className="text-white/80 text-sm mb-8 max-w-md mx-auto">
              Whether you are a teacher exploring options or a school with a vacancy, we are
              straightforward to reach.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/talent-pool"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#0ea472] font-semibold text-sm hover:bg-white/90 transition-colors duration-150">
                Join our talent pool <ArrowRight size={15} />
              </Link>
              <Link href="/contact"
                className="px-6 py-3 rounded-lg border border-white text-white font-semibold text-sm hover:bg-white/10 transition-colors duration-150">
                Get in touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
