import { createClient, createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const ALLOWED_TABLES = ['teacher_registrations', 'school_vacancies'] as const
const ALLOWED_FIELDS = ['notes', 'status'] as const

const schema = z.object({
  table: z.enum(ALLOWED_TABLES),
  id: z.string().uuid(),
  fields: z.record(z.enum(ALLOWED_FIELDS), z.string()),
})

export async function PATCH(request: Request) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  let body: unknown
  try { body = await request.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 })
  }

  const { table, id, fields } = parsed.data

  const adminSupabase = await createAdminClient()
  const { error } = await adminSupabase
    .from(table)
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
