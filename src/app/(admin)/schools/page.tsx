import { createAdminClient } from '@/lib/supabase/server'
import StatusBadge from '@/components/admin/StatusBadge'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const SCHOOL_STATUSES = ['New', 'Contacted', 'Shortlisting', 'Filled', 'Closed', 'On Hold']

interface Props {
  searchParams: Promise<{ status?: string; q?: string }>
}

export default async function SchoolsPage({ searchParams }: Props) {
  const { status, q } = await searchParams
  const supabase = await createAdminClient()

  let query = supabase
    .from('school_vacancies')
    .select('id, school_name, contact_person, email, school_location, curriculum, job_title, start_date, status, submitted_at')
    .order('submitted_at', { ascending: false })

  if (status && status !== 'all') query = query.eq('status', status)
  if (q) query = query.or(`school_name.ilike.%${q}%,email.ilike.%${q}%,job_title.ilike.%${q}%`)

  const { data: schools } = await query

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--gc-slate)]"
          style={{ fontFamily: 'Outfit, sans-serif' }}>Schools</h1>
        <span className="text-sm text-slate-500">{schools?.length ?? 0} records</span>
      </div>

      {/* Filters */}
      <form className="flex flex-wrap gap-3 mb-6" method="GET">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search school, email, job title..."
          className="flex-1 min-w-48 px-3 py-2 border border-slate-200 rounded-lg text-sm
            focus:outline-none focus:ring-2 focus:ring-[var(--gc-green)] bg-white"
        />
        <select name="status" defaultValue={status ?? 'all'}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white
            focus:outline-none focus:ring-2 focus:ring-[var(--gc-green)]">
          <option value="all">All statuses</option>
          {SCHOOL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button type="submit"
          className="px-4 py-2 bg-[var(--gc-green)] text-white text-sm font-semibold rounded-lg
            hover:opacity-90 transition" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Filter
        </button>
        {(status || q) && (
          <Link href="/schools"
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
              {['School', 'Contact', 'Email', 'Location', 'Curriculum', 'Role', 'Start date', 'Status', 'Submitted'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schools?.length === 0 && (
              <tr><td colSpan={9} className="text-center text-slate-400 py-12 text-sm">No records found</td></tr>
            )}
            {schools?.map(s => (
              <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                <td className="px-4 py-3 font-medium text-[var(--gc-slate)] whitespace-nowrap">
                  <Link href={`/schools/${s.id}`} className="hover:text-[var(--gc-green)] transition">{s.school_name}</Link>
                </td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{s.contact_person}</td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{s.email}</td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{s.school_location}</td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{s.curriculum}</td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{s.job_title}</td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                  {s.start_date ? new Date(s.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={s.status} /></td>
                <td className="px-4 py-3 text-slate-400 whitespace-nowrap text-xs">
                  {new Date(s.submitted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
