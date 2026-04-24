import { createAdminClient } from '@/lib/supabase/server'
import StatusBadge from '@/components/admin/StatusBadge'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const TEACHER_STATUSES = ['New', 'Contacted', 'Interview', 'Offered', 'Placed', 'Declined', 'On Hold']

interface Props {
  searchParams: Promise<{ status?: string; q?: string }>
}

export default async function TeachersPage({ searchParams }: Props) {
  const { status, q } = await searchParams
  const supabase = await createAdminClient()

  let query = supabase
    .from('teacher_registrations')
    .select('id, full_name, email, phone, highest_qualification, qts_status, years_experience, subjects_taught, earliest_start_date, status, submitted_at')
    .order('submitted_at', { ascending: false })

  if (status && status !== 'all') query = query.eq('status', status)
  if (q) query = query.or(`full_name.ilike.%${q}%,email.ilike.%${q}%,subjects_taught.ilike.%${q}%`)

  const { data: teachers } = await query

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--gc-slate)]"
          style={{ fontFamily: 'Outfit, sans-serif' }}>Teachers</h1>
        <span className="text-sm text-slate-500">{teachers?.length ?? 0} records</span>
      </div>

      {/* Filters */}
      <form className="flex flex-wrap gap-3 mb-6" method="GET">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search name, email, subjects..."
          className="flex-1 min-w-48 px-3 py-2 border border-slate-200 rounded-lg text-sm
            focus:outline-none focus:ring-2 focus:ring-[var(--gc-green)] bg-white"
        />
        <select name="status" defaultValue={status ?? 'all'}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white
            focus:outline-none focus:ring-2 focus:ring-[var(--gc-green)]">
          <option value="all">All statuses</option>
          {TEACHER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button type="submit"
          className="px-4 py-2 bg-[var(--gc-green)] text-white text-sm font-semibold rounded-lg
            hover:opacity-90 transition" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Filter
        </button>
        {(status || q) && (
          <Link href="/teachers"
            className="px-4 py-2 border border-slate-200 text-slate-500 text-sm rounded-lg hover:bg-slate-50 transition">
            Clear
          </Link>
        )}
      </form>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              {['Name', 'Email', 'Qualification', 'QTS', 'Exp.', 'Subjects', 'Start date', 'Status', 'Submitted'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teachers?.length === 0 && (
              <tr><td colSpan={9} className="text-center text-slate-400 py-12 text-sm">No records found</td></tr>
            )}
            {teachers?.map(t => (
              <tr key={t.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                <td className="px-4 py-3 font-medium text-[var(--gc-slate)] whitespace-nowrap">
                  <Link href={`/teachers/${t.id}`} className="hover:text-[var(--gc-green)] transition">{t.full_name}</Link>
                </td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{t.email}</td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{t.highest_qualification}</td>
                <td className="px-4 py-3 text-center">{t.qts_status ? '✓' : '—'}</td>
                <td className="px-4 py-3 text-slate-500 text-center">{t.years_experience}y</td>
                <td className="px-4 py-3 text-slate-500 max-w-32 truncate">{t.subjects_taught}</td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                  {t.earliest_start_date ? new Date(t.earliest_start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={t.status} /></td>
                <td className="px-4 py-3 text-slate-400 whitespace-nowrap text-xs">
                  {new Date(t.submitted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
