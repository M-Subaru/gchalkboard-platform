import SchoolForm from '@/components/forms/SchoolForm'

export const metadata = {
  title: 'Post a Vacancy — Global Chalkboard',
  description: 'Tell us about your opening and we will identify the best-matched UK teachers from our talent pool.',
}

export default function PostVacancyPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="bg-[var(--gc-slate)] pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--gc-green)] mb-4"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            For Schools
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            Post a Vacancy
          </h1>
          <p className="mt-5 text-lg text-white/70 leading-relaxed max-w-xl">
            Fill in the details below and we will begin identifying the right candidates from our talent pool.
            No upfront fees — you only pay when a placement is made.
          </p>
        </div>
      </section>

      {/* INTRO + FORM */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* SIDEBAR */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-28 space-y-6">
                <div className="p-6 rounded-xl bg-[var(--gc-cream)] border border-gray-100">
                  <h3 className="font-semibold text-[var(--gc-slate)] mb-3"
                    style={{ fontFamily: 'Outfit, sans-serif' }}>What happens next?</h3>
                  <ol className="space-y-3 text-sm text-[var(--gc-muted)]">
                    <li className="flex gap-2">
                      <span className="font-semibold text-[#0ea472] flex-shrink-0">1.</span>
                      We review your vacancy, usually within one working day.
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-[#0ea472] flex-shrink-0">2.</span>
                      We identify the best-matched candidates from our talent pool.
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-[#0ea472] flex-shrink-0">3.</span>
                      We share a focused shortlist of well-matched candidates.
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-[#0ea472] flex-shrink-0">4.</span>
                      You run your own selection process. We support throughout.
                    </li>
                  </ol>
                </div>
                <div className="p-6 rounded-xl border border-[var(--gc-green-light)]">
                  <p className="text-sm text-[var(--gc-muted)] leading-relaxed">
                    Prefer to speak first?{' '}
                    <a href="/contact" target="_blank" rel="noopener noreferrer" className="text-[#0ea472] underline underline-offset-2 font-medium">
                      Get in touch
                    </a>{' '}
                    and we can walk you through the process before you post.
                  </p>
                </div>
              </div>
            </aside>

            {/* FORM */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <SchoolForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
