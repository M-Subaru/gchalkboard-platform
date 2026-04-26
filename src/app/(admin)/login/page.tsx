'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Logo from '@/components/shared/Logo'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Incorrect email or password.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[var(--gc-slate)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-xl font-bold text-[var(--gc-slate)] mb-1"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            Admin login
          </h1>
          <p className="text-sm text-slate-500 mb-6">Global Chalkboard — restricted access</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email"
                className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm
                  text-[var(--gc-slate)] focus:outline-none focus:ring-2 focus:ring-[var(--gc-green)]
                  focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="password"
                className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm
                  text-[var(--gc-slate)] focus:outline-none focus:ring-2 focus:ring-[var(--gc-green)]
                  focus:border-transparent transition"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--gc-green)] text-white font-semibold text-sm py-2.5
                rounded-lg hover:bg-[var(--gc-green-dark,#0b9063)] transition disabled:opacity-50
                disabled:cursor-not-allowed mt-2"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
