'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { schoolSchema, SchoolFormValues } from '@/lib/validations/school'
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const inputBase =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[var(--gc-slate)] ' +
  'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0ea472] focus:border-transparent ' +
  'transition-all duration-150 disabled:opacity-50'

const labelBase = 'block text-sm font-medium text-[var(--gc-slate)] mb-1.5'
const errorBase = 'mt-1 text-xs text-red-500'

function FieldError({ msg }: { msg?: string }) {
  return msg ? <p className={errorBase}>{msg}</p> : null
}

export default function SchoolForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolSchema),
    defaultValues: { visa_sponsorship: undefined as unknown as 'true' | 'false' },
  })

  async function onSubmit(values: SchoolFormValues) {
    setStatus('loading')
    setServerError(null)
    try {
      const body = new URLSearchParams()
      Object.entries(values).forEach(([k, v]) => {
        if (v !== undefined && v !== null) body.append(k, String(v))
      })
      const res = await fetch('/api/submit-school', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Submission failed')
      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-24 text-center gap-4">
        <CheckCircle2 size={48} className="text-[#0ea472]" />
        <h2 className="text-2xl font-bold text-[var(--gc-slate)]" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Vacancy received
        </h2>
        <p className="text-[var(--gc-muted)] max-w-md leading-relaxed">
          Thank you. We have received your vacancy and will begin reviewing candidates from our talent pool.
          We will be in touch promptly with next steps.
        </p>
        <p className="text-sm text-[var(--gc-muted)]">
          Questions? Email us at{' '}
          <a href="mailto:info@gchalkboard.com" className="text-[#0ea472] underline underline-offset-2">
            info@gchalkboard.com
          </a>
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {/* SCHOOL DETAILS */}
      <motion.section variants={fadeUp} initial="hidden" animate="show" custom={0}>
        <h2 className="text-lg font-semibold text-[var(--gc-slate)] mb-4 pb-2 border-b border-gray-100"
          style={{ fontFamily: 'Outfit, sans-serif' }}>School Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelBase}>School Name *</label>
            <input {...register('school_name')} placeholder="e.g. Al Rowad British School" className={inputBase} />
            <FieldError msg={errors.school_name?.message} />
          </div>
          <div>
            <label className={labelBase}>Contact Person *</label>
            <input {...register('contact_person')} placeholder="Full name" className={inputBase} />
            <FieldError msg={errors.contact_person?.message} />
          </div>
          <div>
            <label className={labelBase}>Email Address *</label>
            <input {...register('email')} type="email" placeholder="you@school.com" className={inputBase} />
            <FieldError msg={errors.email?.message} />
          </div>
          <div>
            <label className={labelBase}>Phone Number *</label>
            <input {...register('phone')} type="tel" placeholder="+966 …" className={inputBase} />
            <FieldError msg={errors.phone?.message} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelBase}>School Location *</label>
            <input {...register('school_location')} placeholder="e.g. Riyadh, Saudi Arabia" className={inputBase} />
            <FieldError msg={errors.school_location?.message} />
          </div>
          <div>
            <label className={labelBase}>Curriculum *</label>
            <select {...register('curriculum')} className={inputBase}>
              <option value="">Select curriculum</option>
              <option value="British">British</option>
              <option value="IB">IB</option>
              <option value="American">American</option>
              <option value="Other">Other</option>
            </select>
            <FieldError msg={errors.curriculum?.message} />
          </div>
        </div>
      </motion.section>

      {/* VACANCY DETAILS */}
      <motion.section variants={fadeUp} initial="hidden" animate="show" custom={1}>
        <h2 className="text-lg font-semibold text-[var(--gc-slate)] mb-4 pb-2 border-b border-gray-100"
          style={{ fontFamily: 'Outfit, sans-serif' }}>Vacancy Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelBase}>Job Title *</label>
            <input {...register('job_title')} placeholder="e.g. Secondary English Teacher" className={inputBase} />
            <FieldError msg={errors.job_title?.message} />
          </div>
          <div>
            <label className={labelBase}>Subject Area *</label>
            <input {...register('subject_area')} placeholder="e.g. English Language & Literature" className={inputBase} />
            <FieldError msg={errors.subject_area?.message} />
          </div>
          <div>
            <label className={labelBase}>Grade Level / Year Group *</label>
            <input {...register('grade_level')} placeholder="e.g. Years 7–11" className={inputBase} />
            <FieldError msg={errors.grade_level?.message} />
          </div>
          <div>
            <label className={labelBase}>Contract Type *</label>
            <select {...register('contract_type')} className={inputBase}>
              <option value="">Select contract type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Fixed Term">Fixed Term</option>
            </select>
            <FieldError msg={errors.contract_type?.message} />
          </div>
          <div>
            <label className={labelBase}>Salary Range *</label>
            <input {...register('salary_range')} placeholder="e.g. SAR 8,000–10,000/month" className={inputBase} />
            <FieldError msg={errors.salary_range?.message} />
          </div>
          <div>
            <label className={labelBase}>Desired Start Date *</label>
            <input {...register('start_date')} type="date" min={new Date().toISOString().split('T')[0]} className={inputBase} />
            <FieldError msg={errors.start_date?.message} />
          </div>
        </div>
      </motion.section>

      {/* VISA + REQUIREMENTS */}
      <motion.section variants={fadeUp} initial="hidden" animate="show" custom={2}>
        <h2 className="text-lg font-semibold text-[var(--gc-slate)] mb-4 pb-2 border-b border-gray-100"
          style={{ fontFamily: 'Outfit, sans-serif' }}>Additional Information</h2>
        <div className="space-y-4">
          <div>
            <label className={labelBase}>Visa Sponsorship Available *</label>
            <div className="flex items-center gap-6 mt-1">
              <label className="flex items-center gap-2 text-sm cursor-pointer text-[var(--gc-slate)]">
                <input {...register('visa_sponsorship')}
                  type="radio" value="true" className="accent-[#0ea472]" />
                Yes
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer text-[var(--gc-slate)]">
                <input {...register('visa_sponsorship')}
                  type="radio" value="false" className="accent-[#0ea472]" />
                No
              </label>
            </div>
            <FieldError msg={errors.visa_sponsorship?.message} />
          </div>
          <div>
            <label className={labelBase}>Additional Requirements <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea {...register('additional_requirements')} rows={4}
              placeholder="Any specific requirements, experience preferred, notes for candidates…"
              className={`${inputBase} resize-y`} />
          </div>
        </div>
      </motion.section>

      {/* GDPR + SUBMIT */}
      <motion.section variants={fadeUp} initial="hidden" animate="show" custom={3}>
        <div className="p-5 rounded-xl bg-[var(--gc-cream)] border border-gray-100">
          <label className="flex items-start gap-3 cursor-pointer">
            <input {...register('gdpr_consent', { setValueAs: v => v === true || v === 'on' })}
              type="checkbox" className="mt-0.5 accent-[#0ea472] w-4 h-4 flex-shrink-0" />
            <span className="text-sm text-[var(--gc-muted)] leading-relaxed">
              I consent to Global Chalkboard storing and processing the information submitted here
              for the purposes of matching and recruitment. I understand that my data will be kept
              securely and used only for this purpose.
            </span>
          </label>
          <FieldError msg={errors.gdpr_consent?.message} />
        </div>

        <AnimatePresence>
          {serverError && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-start gap-2 mt-4 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg
            bg-[#0ea472] text-white font-semibold text-sm hover:bg-[#0b8a60] active:scale-[0.98]
            transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed">
          {status === 'loading' ? (
            <><Loader2 size={16} className="animate-spin" /> Submitting…</>
          ) : (
            'Submit Vacancy'
          )}
        </button>
        <p className="mt-3 text-xs text-[var(--gc-muted)]">
          We will review your vacancy and be in touch directly.
        </p>
      </motion.section>
    </form>
  )
}
