'use client'

import { useState } from 'react'
import StatusBadge from './StatusBadge'

interface Props {
  table: 'teacher_registrations' | 'school_vacancies'
  id: string
  currentStatus: string
  options: string[]
}

export default function StatusSelector({ table, id, currentStatus, options }: Props) {
  const [status, setStatus] = useState(currentStatus)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  async function handleChange(value: string) {
    setStatus(value)
    setSaveState('saving')
    const res = await fetch('/api/admin/update-record', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table, id, fields: { status: value } }),
    })
    setSaveState(res.ok ? 'saved' : 'error')
    if (res.ok) setTimeout(() => setSaveState('idle'), 2000)
  }

  return (
    <div className="flex items-center gap-3">
      <select
        value={status}
        onChange={e => handleChange(e.target.value)}
        className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white
          focus:outline-none focus:ring-2 focus:ring-[var(--gc-green)]"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <StatusBadge status={status} />
      {saveState === 'saving' && <span className="text-xs text-slate-400">Saving...</span>}
      {saveState === 'saved' && <span className="text-xs text-emerald-600">Saved</span>}
      {saveState === 'error' && <span className="text-xs text-red-500">Failed</span>}
    </div>
  )
}
