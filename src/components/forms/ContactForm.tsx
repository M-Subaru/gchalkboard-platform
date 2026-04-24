'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { contactSchema, ContactFormValues } from '@/lib/validations/contact'
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react'

const inputBase =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[var(--gc-slate)] ' +
  'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0ea472] focus:border-transparent ' +
  'transition-all duration-150 disabled:opacity-50'
const labelBase = 'block text-sm font-medium text-[var(--gc-slate)] mb-1.5'
const errorBase = 'mt-1 text-xs text-red-500'

function FieldError({ msg }: { msg?: string }) {
  return msg ? <p className={errorBase}>{msg}</p> : null
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  async function onSubmit(values: ContactFormValues) {
    setStatus('loading')
    setServerError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
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
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <CheckCircle2 size={44} className="text-[#0ea472]" />
        <h3 className="text-xl font-bold text-[var(--gc-slate)]" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Message sent
        </h3>
        <p className="text-[var(--gc-muted)] max-w-sm text-sm leading-relaxed">
          Thank you for getting in touch. We will reply to you at the address you provided,
          usually within one to two working days.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
        <label className={labelBase}>Your Name *</label>
        <input {...register('name')} placeholder="Full name" className={inputBase} />
        <FieldError msg={errors.name?.message} />
      </motion.div>
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}>
        <label className={labelBase}>Email Address *</label>
        <input {...register('email')} type="email" placeholder="you@example.com" className={inputBase} />
        <FieldError msg={errors.email?.message} />
      </motion.div>
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}>
        <label className={labelBase}>I am a… *</label>
        <select {...register('role')} className={inputBase}>
          <option value="">Select one</option>
          <option value="teacher">Teacher</option>
          <option value="school">School representative</option>
          <option value="other">Other</option>
        </select>
        <FieldError msg={errors.role?.message} />
      </motion.div>
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}>
        <label className={labelBase}>Message *</label>
        <textarea {...register('message')} rows={5}
          placeholder="What would you like to know?"
          className={`${inputBase} resize-y`} />
        <FieldError msg={errors.message?.message} />
      </motion.div>

      <AnimatePresence>
        {serverError && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-start gap-2 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{serverError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}>
        <button type="submit" disabled={status === 'loading'}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg
            bg-[#0ea472] text-white font-semibold text-sm hover:bg-[#0b8a60] active:scale-[0.98]
            transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed">
          {status === 'loading' ? (
            <><Loader2 size={16} className="animate-spin" /> Sending…</>
          ) : (
            'Send Message'
          )}
        </button>
      </motion.div>
    </form>
  )
}
