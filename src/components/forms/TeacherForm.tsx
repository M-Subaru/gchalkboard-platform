'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { teacherSchema, type TeacherFormValues } from '@/lib/validations/teacher'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

function FileDropZone({
  label,
  hint,
  accept,
  multiple,
  files,
  onChange,
  error,
}: {
  label: string
  hint: string
  accept: string
  multiple?: boolean
  files: File[]
  onChange: (files: File[]) => void
  error?: string
}) {
  const [dragging, setDragging] = useState(false)

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return
    const arr = Array.from(newFiles)
    onChange(multiple ? [...files, ...arr] : arr)
  }

  const remove = (i: number) => {
    const next = [...files]
    next.splice(i, 1)
    onChange(next)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-[var(--gc-slate)] mb-1.5">{label}</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
        className={`relative border-2 border-dashed rounded-xl px-4 py-6 text-center transition-colors duration-150 cursor-pointer ${
          dragging ? 'border-[#0ea472] bg-[var(--gc-green-light)]' : 'border-border hover:border-[#0ea472]/50'
        } ${error ? 'border-destructive' : ''}`}
        onClick={() => document.getElementById(`file-${label}`)?.click()}
      >
        <input
          id={`file-${label}`}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />
        <Upload size={20} className="mx-auto mb-2 text-[var(--gc-muted)]" />
        <p className="text-sm text-[var(--gc-muted)]">{hint}</p>
      </div>
      {files.length > 0 && (
        <ul className="mt-2 space-y-1">
          {files.map((f, i) => (
            <li key={i} className="flex items-center justify-between text-xs text-[var(--gc-muted)] bg-[var(--gc-cream)] rounded-lg px-3 py-1.5">
              <span className="truncate">{f.name}</span>
              <button type="button" onClick={() => remove(i)} className="ml-2 text-destructive hover:opacity-70 flex-shrink-0">
                <X size={13} />
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--gc-slate)] mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  )
}

const inputCls = "w-full rounded-lg border border-input bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0ea472]/40 focus:border-[#0ea472] transition-colors duration-150"
const selectCls = inputCls + " cursor-pointer"

export default function TeacherForm() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [cvFiles, setCvFiles] = useState<File[]>([])
  const [photoFiles, setPhotoFiles] = useState<File[]>([])
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([])
  const [locationOther, setLocationOther] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
  })

  const currentLocation = watch('current_location')

  const onSubmit = async (data: TeacherFormValues) => {
    if (cvFiles.length === 0) {
      alert('Please upload your CV before submitting.')
      return
    }
    if (photoFiles.length === 0) {
      alert('Please upload a professional headshot before submitting.')
      return
    }

    setSubmitState('loading')
    setSubmitError(null)

    try {
      const formData = new FormData()
      const { first_name, last_name, ...rest } = data
      formData.append('first_name', first_name)
      formData.append('last_name', last_name)
      // If "Other" location, append the typed value instead
      Object.entries(rest).forEach(([k, v]) => {
        if (k === 'current_location' && v === 'Other') {
          formData.append(k, locationOther || 'Other')
        } else {
          formData.append(k, String(v))
        }
      })
      formData.append('cv', cvFiles[0])
      formData.append('photo', photoFiles[0])
      // Only include real File objects with content
      additionalFiles
        .filter((f): f is File => f instanceof File && f.size > 0)
        .forEach((f) => formData.append('additional', f))

      const res = await fetch('/api/submit-teacher', { method: 'POST', body: formData })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error || 'Submission failed')
      }
      setSubmitState('success')
    } catch (err: unknown) {
      setSubmitState('error')
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again or email us at info@gchalkboard.com.')
    }
  }

  if (submitState === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--gc-green-light)] mb-5">
          <CheckCircle2 size={28} className="text-[#0ea472]" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--gc-slate)] mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Application received
        </h2>
        <p className="text-[var(--gc-muted)] max-w-sm mx-auto">
          Thank you for registering. We will review your profile and be in touch directly.
          A confirmation has been sent to your email.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-7">
      {/* Personal details */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--gc-green)] mb-5"
          style={{ fontFamily: 'Outfit, sans-serif' }}>Personal Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="First Name *" error={errors.first_name?.message}>
            <input {...register('first_name')} placeholder="Sara" className={inputCls} />
          </Field>
          <Field label="Last Name *" error={errors.last_name?.message}>
            <input {...register('last_name')} placeholder="Morgan" className={inputCls} />
          </Field>
          <Field label="Email Address *" error={errors.email?.message}>
            <input {...register('email')} type="email" placeholder="sara@example.com" className={inputCls} />
          </Field>
          <Field label="Phone Number *" error={errors.phone?.message}>
            <input {...register('phone')} type="tel" placeholder="+44 7700 900000" className={inputCls} />
          </Field>
          <Field label="Current Location *" error={errors.current_location?.message}>
            <select {...register('current_location')} className={selectCls}>
              <option value="">Select...</option>
              <option value="UK">United Kingdom</option>
              <option value="Gulf">Already in the Gulf</option>
              <option value="Other">Other</option>
            </select>
          </Field>
          {currentLocation === 'Other' && (
            <Field label="Please specify location">
              <input
                value={locationOther}
                onChange={e => setLocationOther(e.target.value)}
                placeholder="e.g. Australia, Canada..."
                className={inputCls}
              />
            </Field>
          )}
        </div>
      </div>

      {/* Qualifications */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--gc-green)] mb-5"
          style={{ fontFamily: 'Outfit, sans-serif' }}>Qualifications & Experience</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Highest Qualification *" error={errors.highest_qualification?.message}>
            <select {...register('highest_qualification')} className={selectCls}>
              <option value="">Select...</option>
              <option value="Bachelor">Bachelor's Degree</option>
              <option value="Master">Master's Degree</option>
              <option value="PhD">PhD</option>
            </select>
          </Field>
          <Field label="Years of Teaching Experience *" error={errors.years_experience?.message}>
            <input {...register('years_experience', { valueAsNumber: true })} type="number" min={0} max={60} placeholder="e.g. 5" className={inputCls} />
          </Field>
          <Field label="Teaching Certifications *" error={errors.teaching_certifications?.message}>
            <input {...register('teaching_certifications')} placeholder="e.g. PGCE, QTS" className={inputCls} />
          </Field>
          <Field label="QTS Status *" error={errors.qts_status?.message}>
            <select {...register('qts_status', { setValueAs: (v) => v === 'true' })} className={selectCls}>
              <option value="">Select...</option>
              <option value="true">Yes, I hold QTS</option>
              <option value="false">No</option>
            </select>
          </Field>
          <Field label="Subjects Taught *" error={errors.subjects_taught?.message}>
            <input {...register('subjects_taught')} placeholder="e.g. Mathematics, Further Maths" className={inputCls} />
          </Field>
          <Field label="Preferred Year Groups / Grade Levels *" error={errors.preferred_grade_levels?.message}>
            <input {...register('preferred_grade_levels')} placeholder="e.g. Year 7-11, KS4" className={inputCls} />
          </Field>
          <Field label="Earliest Available Start Date *" error={errors.earliest_start_date?.message}>
            <input {...register('earliest_start_date')} type="date" min={new Date().toISOString().split('T')[0]} className={inputCls} />
          </Field>
        </div>
      </div>

      {/* Documents */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--gc-green)] mb-5"
          style={{ fontFamily: 'Outfit, sans-serif' }}>Documents</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FileDropZone
            label="CV / Resume *"
            hint="PDF or Word document, max 5 MB"
            accept=".pdf,.doc,.docx"
            files={cvFiles}
            onChange={setCvFiles}
          />
          <FileDropZone
            label="Professional Headshot *"
            hint="Clear photo of your face. JPG, PNG or WebP, max 2 MB"
            accept="image/jpeg,image/png,image/webp"
            files={photoFiles}
            onChange={setPhotoFiles}
          />
        </div>
        <div className="mt-5">
          <FileDropZone
            label="Additional Documents (optional)"
            hint="References, certificates, DBS. Up to 5 files, 5 MB each"
            accept=".pdf,.doc,.docx,image/*"
            multiple
            files={additionalFiles}
            onChange={setAdditionalFiles}
          />
        </div>
      </div>

      {/* GDPR */}
      <div className="rounded-xl border border-border bg-[var(--gc-cream)] p-5">
        <div className="flex items-start gap-3">
          <input
            {...register('gdpr_consent')}
            id="gdpr"
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-input accent-[#0ea472] cursor-pointer"
          />
          <label htmlFor="gdpr" className="text-sm text-[var(--gc-muted)] leading-relaxed cursor-pointer">
            I consent to Global Chalkboard storing and processing my personal information for
            recruitment purposes. I understand my data will be held securely and used only to
            match me with relevant school vacancies.{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#0ea472] underline underline-offset-2">Privacy Policy</a>.
          </label>
        </div>
        {errors.gdpr_consent && (
          <p className="mt-2 text-xs text-destructive flex items-center gap-1">
            <AlertCircle size={12} /> {errors.gdpr_consent.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <AnimatePresence>
        {submitState === 'error' && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-sm text-destructive flex items-start gap-2">
            <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
            {submitError || 'Something went wrong. Please try again or email us at info@gchalkboard.com.'}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={submitState === 'loading'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[#0ea472] text-white font-semibold text-sm hover:bg-[#0b8a60] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitState === 'loading' ? (
          <><Loader2 size={16} className="animate-spin" /> Submitting...</>
        ) : (
          'Submit Application'
        )}
      </button>
    </form>
  )
}
