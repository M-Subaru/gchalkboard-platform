const COLOURS: Record<string, string> = {
  New:          'bg-slate-100 text-slate-600',
  Contacted:    'bg-blue-50 text-blue-700',
  Interview:    'bg-yellow-50 text-yellow-700',
  Offered:      'bg-purple-50 text-purple-700',
  Placed:       'bg-emerald-50 text-emerald-700',
  Filled:       'bg-emerald-50 text-emerald-700',
  Declined:     'bg-red-50 text-red-600',
  Closed:       'bg-red-50 text-red-600',
  'On Hold':    'bg-orange-50 text-orange-600',
  Shortlisting: 'bg-sky-50 text-sky-700',
}

export default function StatusBadge({ status }: { status: string }) {
  const cls = COLOURS[status] ?? 'bg-slate-100 text-slate-500'
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${cls}`}>
      {status}
    </span>
  )
}
