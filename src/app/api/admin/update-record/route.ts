import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const ALLOWED_TABLES = ['teacher_registrations', 'school_vacancies'] as const
const ALLOWED_FIELDS = ['notes', 'status'] as const

const schema = z.object({
  table: z.enum(ALLOWED_TABLES),
  id: z.string().uuid(),
  field: z.enum(ALLOWED_FIELDS),
  value: z.string(),
})

export async function PATCH(request: Request) {
  let body: unknown
  try { body = await request.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 })
  }

  const { table, id, field, value } = parsed.data

  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  const { error } = await adminSupabase
    .from(table)
    .update({ [field]: value })
    .eq('id', id)

  if (error) {
    console.error('[update-record]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
