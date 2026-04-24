import { createAdminClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getStats() {
  const supabase = await createAdminClient()
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  const [
    { count: totalTeachers },
    { count: teachersThisMonth },
    { count: totalSchools },
    { count: schoolsThisMonth },
    { count: placedTeachers },
    { count: recentTeachers },
    { count: recentSchools },
  ] = await Promise.all([
    supabase.from('teacher_registrations').select('*', { count: 'exact', head: true }),
    supabase.from('teacher_registrations').select('*', { count: 'exact', head: true }).gte('submitted_at', monthStart),
    supabase.from('school_vacancies').select('*', { count: 'exact', head: true }),
    supabase.from('school_vacancies').select('*', { count: 'exact', head: true }).gte('submitted_at', monthStart),
    supabase.from('teacher_registrations').select('*', { count: 'exact', head: true }).eq('status', 'Placed'),
    supabase.from('teacher_registrations').select('*', { count: 'exact', head: true }).gte('submitted_at', new Date(Date.now() - 7 * 86400000).toISOString()),
    supabase.from('school_vacancies').select('*', { count: 'exact', head: true }).gte('submitted_at', new Date(Date.now() - 7 * 86400000).toISOString()),
  ])

  return { totalTeachers, teachersThisMonth, totalSchools, schoolsThisMonth, placedTeachers, recentTeachers, recentSchools }
}

export default async function DashboardPage() {
  const stats = await getStats()

  const cards = [
    { label: 'Teacher registrations', total: stats.totalTeachers, month: stats.teachersThisMonth, href: '/teachers', colour: 'bg-emerald-50 text-emerald-700' },
    { label: 'School vacancies', total: stats.totalSchools, month: stats.schoolsThisMonth, href: '/schools', colour: 'bg-sky-50 text-sky-700' },
    { label: 'Placements made', total: stats.placedTeachers, month: null, href: '/teachers?status=Placed', colour: 'bg-violet-50 text-violet-700' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--gc-slate)]"
          style={{ fontFamily: 'Outfit, sans-serif' }}>Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          {stats.recentTeachers ?? 0} new teacher{stats.recentTeachers !== 1 ? 's' : ''} and{' '}
          {stats.recentSchools ?? 0} new school{stats.recentSchools !== 1 ? 's' : ''} in the last 7 days
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {cards.map(card => (
          <Link key={card.label} href={card.href}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-sm transition group">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              {card.label}
            </p>
            <p className="text-4xl font-bold text-[var(--gc-slate)] mb-1"
              style={{ fontFamily: 'Outfit, sans-serif' }}>
              {card.total ?? 0}
            </p>
            {card.month !== null && (
              <p className="text-xs text-slate-400">
                <span className={`inline-block px-1.5 py-0.5 rounded text-xs font-medium ${card.colour} mr-1`}>
                  +{card.month ?? 0}
                </span>
                this month
              </p>
            )}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/teachers"
          className="flex items-center justify-between bg-white rounded-xl border border-slate-200 px-6 py-4 hover:shadow-sm transition">
          <div>
            <p className="font-semibold text-[var(--gc-slate)] text-sm"
              style={{ fontFamily: 'Outfit, sans-serif' }}>View teacher registrations</p>
            <p className="text-xs text-slate-400 mt-0.5">Filter, search, update status</p>
          </div>
          <span className="text-slate-300 text-lg">→</span>
        </Link>
        <Link href="/schools"
          className="flex items-center justify-between bg-white rounded-xl border border-slate-200 px-6 py-4 hover:shadow-sm transition">
          <div>
            <p className="font-semibold text-[var(--gc-slate)] text-sm"
              style={{ fontFamily: 'Outfit, sans-serif' }}>View school vacancies</p>
            <p className="text-xs text-slate-400 mt-0.5">Filter, search, update status</p>
          </div>
          <span className="text-slate-300 text-lg">→</span>
        </Link>
      </div>
    </div>
  )
}
