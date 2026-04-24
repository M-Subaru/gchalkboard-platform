// Auth protection is handled by src/middleware.ts
// This layout provides the admin UI shell for all (admin) routes except /login
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[var(--gc-green)] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold"
                style={{ fontFamily: 'Outfit, sans-serif' }}>GC</span>
            </div>
            <span className="font-semibold text-[var(--gc-slate)] text-sm"
              style={{ fontFamily: 'Outfit, sans-serif' }}>Admin</span>
          </div>
          <nav className="flex items-center gap-5">
            <Link href="/dashboard"
              className="text-sm text-slate-500 hover:text-[var(--gc-slate)] transition-colors">
              Dashboard
            </Link>
            <Link href="/teachers"
              className="text-sm text-slate-500 hover:text-[var(--gc-slate)] transition-colors">
              Teachers
            </Link>
            <Link href="/schools"
              className="text-sm text-slate-500 hover:text-[var(--gc-slate)] transition-colors">
              Schools
            </Link>
            <span className="text-xs text-slate-400 hidden sm:block">{user?.email}</span>
            <form action="/api/admin/sign-out" method="POST">
              <button type="submit"
                className="text-sm text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
