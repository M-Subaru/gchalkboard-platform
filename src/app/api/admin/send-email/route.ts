import { createAdminClient } from '@/lib/supabase/server'
import { resend, FROM_ADDRESS } from '@/lib/resend/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
  sentBy: z.string().optional(),
  related_teacher_id: z.string().uuid().optional(),
  related_school_id: z.string().uuid().optional(),
})

// Auth enforced by middleware on /admin/* pages.
export async function POST(request: Request) {
  let body: unknown
  try { body = await request.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 })
  }

  const { to, subject, body: emailBody, sentBy, related_teacher_id, related_school_id } = parsed.data

  const emailHtml = `<div style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #1e293b; max-width: 600px;">
${emailBody.split('\n').map(line => line.trim() ? `<p style="margin: 0 0 12px;">${line}</p>` : '').join('')}
<div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
  <p style="margin: 0; font-size: 13px; color: #64748b;">
    Global Chalkboard<br>
    UK-Based International Teacher Placement<br>
    <a href="https://gchalkboard.com" style="color: #0ea472; text-decoration: none;">gchalkboard.com</a>
    &nbsp;|&nbsp;
    <a href="mailto:info@gchalkboard.com" style="color: #0ea472; text-decoration: none;">info@gchalkboard.com</a>
  </p>
</div>
</div>`

  const { error: sendError } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject,
    html: emailHtml,
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
    sent_by: sentBy ?? 'admin',
    related_teacher_id: related_teacher_id ?? null,
    related_school_id: related_school_id ?? null,
  })

  return NextResponse.json({ ok: true })
}
