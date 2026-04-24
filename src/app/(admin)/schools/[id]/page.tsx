import { createAdminClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import StatusSelector from '@/components/admin/StatusSelector'
import NotesEditor from '@/components/admin/NotesEditor'
import EmailModal from '@/components/admin/EmailModal'

export const dynamic = 'force-dynamic'

const SCHOOL_STATUSES = ['New', 'Contacted', 'Shortlisting', 'Filled', 'Closed', 'On Hold']

interface Props { params: Promise<{ id: string }> }

function Field({ label, value }: { label: string; value: string | boolean | null | undefined }) {
  const display = value === true ? 'Yes' : value === false ? 'No' : (value ?? '—')
  return (
    <div>
      <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">{label}</dt>
      <dd className="text-sm text-[var(--gc-slate)]">{String(display)}</dd>
    </div>
  )
}

export default async function SchoolDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createAdminClient()

  const { data: school } = await supabase
    .from('school_vacancies')
    .select('*')
    .eq('id', id)
    .single()

  if (!school) notFound()

  const submittedAt = new Date(school.submitted_at).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
  const startDate = school.start_date
    ? new Date(school.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link href="/schools"
          className="text-sm text-slate-500 hover:text-[var(--gc-slate)] transition">
          ← Schools
        </Link>
        <EmailModal
          recipientEmail={school.email}
          recipientName={school.contact_person}
          relatedSchoolId={school.id}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h1 className="text-xl font-bold text-[var(--gc-slate)]"
              style={{ fontFamily: 'Outfit, sans-serif' }}>{school.school_name}</h1>
            <p className="text-sm text-slate-500 mt-1">
              {school.contact_person} · {school.email} · {school.phone}
            </p>
            <p className="text-xs text-slate-400 mt-1">Submitted {submittedAt}</p>
          </div>

          {/* Vacancy fields */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-[var(--gc-slate)] mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}>Vacancy details</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="School location" value={school.school_location} />
              <Field label="Curriculum" value={school.curriculum} />
              <Field label="Job title" value={school.job_title} />
              <Field label="Subject area" value={school.subject_area} />
              <Field label="Grade level" value={school.grade_level} />
              <Field label="Contract type" value={school.contract_type} />
              <Field label="Salary range" value={school.salary_range} />
              <Field label="Start date" value={startDate} />
              <Field label="Visa sponsorship" value={school.visa_sponsorship} />
            </dl>
            {school.additional_requirements && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                  Additional requirements
                </dt>
                <dd className="text-sm text-[var(--gc-slate)] whitespace-pre-wrap">
                  {school.additional_requirements}
                </dd>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-[var(--gc-slate)] mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}>Status</h2>
            <StatusSelector
              table="school_vacancies"
              id={school.id}
              currentStatus={school.status}
              options={SCHOOL_STATUSES}
            />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <NotesEditor
              table="school_vacancies"
              id={school.id}
              initialNotes={school.notes}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
