'use client'

import { useState, useRef } from 'react'

interface Props {
  table: 'teacher_registrations' | 'school_vacancies'
  id: string
  initialNotes: string | null
}

export default function NotesEditor({ table, id, initialNotes }: Props) {
  const [notes, setNotes] = useState(initialNotes ?? '')
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleChange(value: string) {
    setNotes(value)
    setSaveState('idle')
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => save(value), 1500)
  }

  async function save(value: string) {
    setSaveState('saving')
    const res = await fetch(`/api/admin/update-record`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table, id, fields: { notes: value } }),
    })
    setSaveState(res.ok ? 'saved' : 'error')
    if (res.ok) setTimeout(() => setSaveState('idle'), 2000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Notes</label>
        {saveState === 'saving' && <span className="text-xs text-slate-400">Saving...</span>}
        {saveState === 'saved' && <span className="text-xs text-emerald-600">Saved</span>}
        {saveState === 'error' && <span className="text-xs text-red-500">Save failed</span>}
      </div>
      <textarea
        value={notes}
        onChange={e => handleChange(e.target.value)}
        rows={5}
        placeholder="Add notes about this record..."
        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-[var(--gc-slate)]
          focus:outline-none focus:ring-2 focus:ring-[var(--gc-green)] resize-y"
      />
    </div>
  )
}
