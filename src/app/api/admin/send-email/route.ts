import { createClient, createAdminClient } from '@/lib/supabase/server'
import { resend, FROM_ADDRESS } from '@/lib/resend/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
  related_teacher_id: z.string().uuid().optional(),
  related_school_id: z.string().uuid().optional(),
})

export async function POST(request: Request) {
  // Verify authenticated session
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

  const { to, subject, body: emailBody, related_teacher_id, related_school_id } = parsed.data

  const { error: sendError } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject,
    text: emailBody,
  })

  if (sendError) {
    return NextResponse.json({ error: 'Email send failed', detail: sendError }, { status: 500 })
  }

  // Log to email_log table
  const adminSupabase = await createAdminClient()
  await adminSupabase.from('email_log').insert({
    sent_to: to,
    subject,
    sent_by: user.email ?? 'admin',
    related_teacher_id: related_teacher_id ?? null,
    related_school_id: related_school_id ?? null,
  })

  return NextResponse.json({ ok: true })
}
