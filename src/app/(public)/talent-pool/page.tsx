import type { Metadata } from 'next'
import TeacherForm from '@/components/forms/TeacherForm'

export const metadata: Metadata = {
  title: 'Join the Talent Pool',
  description: 'Register with Global Chalkboard. UK-qualified teachers matched with Gulf international schools. Free — no fees ever.',
}

export default function TalentPoolPage() {
  return (
    <div className="bg-[var(--gc-cream)] min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Intro */}
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--gc-green)] mb-3"
              style={{ fontFamily: 'Outfit, sans-serif' }}>
              Teacher Registration
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--gc-slate)] mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}>
              Join the Talent Pool
            </h1>
            <p className="text-[var(--gc-muted)] leading-relaxed">
              Fill in your details below and upload your CV. We review every submission
              personally. If your profile is a strong match for a current or upcoming vacancy,
              we will contact you directly.
            </p>
            <p className="mt-3 text-sm text-[var(--gc-muted)]">
              Registration is completely free. Fields marked * are required.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-[var(--gc-green-light)] p-6 sm:p-8 shadow-sm">
            <TeacherForm />
          </div>
        </div>
      </div>
    </div>
  )
}
