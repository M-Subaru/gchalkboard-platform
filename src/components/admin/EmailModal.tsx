'use client'

import { useState } from 'react'

interface Props {
  recipientEmail: string
  recipientName: string
  relatedTeacherId?: string
  relatedSchoolId?: string
}

export default function EmailModal({ recipientEmail, recipientName, relatedTeacherId, relatedSchoolId }: Props) {
  const [open, setOpen] = useState(false)
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSend() {
    if (!subject.trim() || !body.trim()) return
    setStatus('sending')

    const res = await fetch('/api/admin/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: recipientEmail,
        subject,
        body,
        related_teacher_id: relatedTeacherId,
        related_school_id: relatedSchoolId,
      }),
    })

    if (res.ok) {
      setStatus('sent')
      setTimeout(() => { setOpen(false); setStatus('idle'); setSubject(''); setBody('') }, 1800)
    } else {
      setStatus('error')
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 border border-[var(--gc-green)] text-[var(--gc-green)] text-sm font-semibold
          rounded-lg hover:bg-[var(--gc-green)] hover:text-white transition"
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        Email {recipientName.split(' ')[0]}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h2 className="font-semibold text-[var(--gc-slate)]"
                  style={{ fontFamily: 'Outfit, sans-serif' }}>Send email</h2>
                <p className="text-xs text-slate-400 mt-0.5">To: {recipientName} ({recipientEmail})</p>
              </div>
              <button onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl leading-none">×</button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  Subject
                </label>
                <input
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm
                    focus:outline-none focus:ring-2 focus:ring-[var(--gc-green)]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  Message
                </label>
                <textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  rows={7}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm
                    focus:outline-none focus:ring-2 focus:ring-[var(--gc-green)] resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  Failed to send. Please try again.
                </p>
              )}
              {status === 'sent' && (
                <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                  Email sent.
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100">
              <button onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition">
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={status === 'sending' || status === 'sent' || !subject.trim() || !body.trim()}
                className="px-5 py-2 bg-[var(--gc-green)] text-white text-sm font-semibold rounded-lg
                  hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {status === 'sending' ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
