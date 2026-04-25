import { createAdminClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import StatusSelector from '@/components/admin/StatusSelector'
import NotesEditor from '@/components/admin/NotesEditor'
import EmailModal from '@/components/admin/EmailModal'

export const dynamic = 'force-dynamic'

const TEACHER_STATUSES = ['New', 'Contacted', 'Interview', 'Offered', 'Placed', 'Declined', 'On Hold']

interface Props { params: Promise<{ id: string }> }

function Field({ label, value }: { label: string; value: string | number | boolean | null | undefined }) {
  const display = value === true ? 'Yes' : value === false ? 'No' : (value ?? '—')
  return (
    <div>
      <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">{label}</dt>
      <dd className="text-sm text-[var(--gc-slate)]">{String(display)}</dd>
    </div>
  )
}

export default async function TeacherDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createAdminClient()

  const { data: teacher } = await supabase
    .from('teacher_registrations')
    .select('*')
    .eq('id', id)
    .single()

  if (!teacher) notFound()

  // Generate a short-lived signed URL for the CV
  let cvUrl: string | null = null
  if (teacher.cv_path) {
    const { data } = await supabase.storage
      .from('teacher-cvs')
      .createSignedUrl(teacher.cv_path, 3600)
    cvUrl = data?.signedUrl ?? null
  }

  let photoUrl: string | null = null
  if (teacher.photo_path) {
    const { data } = await supabase.storage
      .from('teacher-photos')
      .createSignedUrl(teacher.photo_path, 3600)
    photoUrl = data?.signedUrl ?? null
  }

  // Generate signed URLs for additional documents
  const additionalDocUrls: { name: string; url: string }[] = []
  if (teacher.additional_doc_paths && teacher.additional_doc_paths.length > 0) {
    for (let i = 0; i < teacher.additional_doc_paths.length; i++) {
      const path = teacher.additional_doc_paths[i]
      const { data } = await supabase.storage
        .from('teacher-additional-docs')
        .createSignedUrl(path, 3600)
      if (data?.signedUrl) {
        const ext = path.split('.').pop() ?? 'file'
        additionalDocUrls.push({ name: `Additional document ${i + 1} (.${ext})`, url: data.signedUrl })
      }
    }
  }

  const submittedAt = new Date(teacher.submitted_at).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
  const startDate = teacher.earliest_start_date
    ? new Date(teacher.earliest_start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—'

  return (
    <div>
      {/* Back + actions */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/teachers"
          className="text-sm text-slate-500 hover:text-[var(--gc-slate)] transition flex items-center gap-1">
          ← Teachers
        </Link>
        <EmailModal
          recipientEmail={teacher.email}
          recipientName={teacher.full_name}
          relatedTeacherId={teacher.id}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start gap-4">
              {photoUrl ? (
                <img src={photoUrl} alt={teacher.full_name}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0 border border-slate-200" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl text-slate-300">👤</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-[var(--gc-slate)]"
                  style={{ fontFamily: 'Outfit, sans-serif' }}>{teacher.full_name}</h1>
                <p className="text-sm text-slate-500 mt-0.5">{teacher.email} · {teacher.phone}</p>
                <p className="text-xs text-slate-400 mt-1">Submitted {submittedAt}</p>
              </div>
            </div>
          </div>

          {/* Profile fields */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-[var(--gc-slate)] mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}>Profile</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Current location" value={teacher.current_location} />
              <Field label="Highest qualification" value={teacher.highest_qualification} />
              <Field label="Teaching certifications" value={teacher.teaching_certifications} />
              <Field label="QTS status" value={teacher.qts_status} />
              <Field label="Years of experience" value={teacher.years_experience} />
              <Field label="Subjects taught" value={teacher.subjects_taught} />
              <Field label="Preferred grade levels" value={teacher.preferred_grade_levels} />
              <Field label="Earliest start date" value={startDate} />
            </dl>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-[var(--gc-slate)] mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}>Documents</h2>
            <div className="flex flex-wrap gap-3">
              {cvUrl ? (
                <a href={cvUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--gc-green)] text-white
                    text-sm font-semibold rounded-lg hover:opacity-90 transition">
                  Download CV
                </a>
              ) : (
                <span className="text-sm text-slate-400">No CV uploaded</span>
              )}
              {additionalDocUrls.map((doc, i) => (
                <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700
                    text-sm font-medium rounded-lg hover:bg-slate-200 transition border border-slate-200">
                  {doc.name}
                </a>
              ))}
              {additionalDocUrls.length === 0 && !cvUrl && (
                <span className="text-sm text-slate-400">No documents uploaded</span>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar: status + notes */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-[var(--gc-slate)] mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}>Status</h2>
            <StatusSelector
              table="teacher_registrations"
              id={teacher.id}
              currentStatus={teacher.status}
              options={TEACHER_STATUSES}
            />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <NotesEditor
              table="teacher_registrations"
              id={teacher.id}
              initialNotes={teacher.notes}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
