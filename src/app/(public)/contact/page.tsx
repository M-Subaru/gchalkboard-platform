import ContactForm from '@/components/forms/ContactForm'
import { Mail, Clock, MapPin } from 'lucide-react'

export const metadata = {
  title: 'Contact — Global Chalkboard',
  description: 'Get in touch with Global Chalkboard. We are happy to answer questions before you register or post a vacancy.',
}

export default function ContactPage() {
  return (
    <>
      {/* HEADER */}
      <section className="bg-[var(--gc-slate)] pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--gc-green)] mb-4"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            Contact
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            Get in touch
          </h1>
          <p className="mt-5 text-lg text-white/70 leading-relaxed max-w-xl">
            Whether you have a question before registering, or you are a school that wants to
            talk through the process first — we are easy to reach.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl">

            {/* SIDEBAR */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-28 space-y-6">
                <div>
                  <h3 className="font-semibold text-[var(--gc-slate)] mb-4"
                    style={{ fontFamily: 'Outfit, sans-serif' }}>Contact details</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-sm text-[var(--gc-muted)]">
                      <Mail size={16} className="text-[#0ea472] flex-shrink-0 mt-0.5" />
                      <span>
                        <a href="mailto:info@gchalkboard.com"
                          className="text-[#0ea472] underline underline-offset-2">
                          info@gchalkboard.com
                        </a>
                      </span>
                    </li>
                    <li className="flex gap-3 text-sm text-[var(--gc-muted)]">
                      <Clock size={16} className="text-[#0ea472] flex-shrink-0 mt-0.5" />
                      <span>We typically reply within one to two working days.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-[var(--gc-muted)]">
                      <MapPin size={16} className="text-[#0ea472] flex-shrink-0 mt-0.5" />
                      <span>UK-based. Working with schools across the Gulf region.</span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-[var(--gc-cream)] border border-gray-100">
                  <p className="text-sm font-medium text-[var(--gc-slate)] mb-2"
                    style={{ fontFamily: 'Outfit, sans-serif' }}>Ready to register?</p>
                  <p className="text-xs text-[var(--gc-muted)] leading-relaxed mb-3">
                    Teachers can join our talent pool directly. Schools can post a vacancy.
                  </p>
                  <div className="flex flex-col gap-2">
                    <a href="/talent-pool"
                      className="text-xs font-semibold text-[#0ea472] underline underline-offset-2">
                      Join the talent pool →
                    </a>
                    <a href="/post-vacancy"
                      className="text-xs font-semibold text-[#0ea472] underline underline-offset-2">
                      Post a vacancy →
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* FORM */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
