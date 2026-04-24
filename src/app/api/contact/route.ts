import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations/contact'
import { resend, FROM_ADDRESS, ADMIN_EMAIL } from '@/lib/resend/client'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.issues },
        { status: 400 }
      )
    }

    const { name, email, role, message } = parsed.data

    const roleLabel = role === 'teacher' ? 'Teacher' : role === 'school' ? 'School representative' : 'Other'

    // Notify admin
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: ADMIN_EMAIL,
      subject: `Contact form message from ${name}`,
      html: `<h2>New Contact Message</h2>
<table>
<tr><td><strong>Name:</strong></td><td>${name}</td></tr>
<tr><td><strong>Email:</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
<tr><td><strong>Role:</strong></td><td>${roleLabel}</td></tr>
</table>
<h3>Message</h3>
<p style="white-space: pre-wrap;">${message}</p>`,
    })

    // Auto-reply to sender
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: 'Message received — Global Chalkboard',
      html: `<p>Hi ${name},</p>
<p>Thank you for getting in touch. We have received your message and will reply within one to two working days.</p>
<p>If your query is urgent, you can also reach us directly at
<a href="mailto:info@gchalkboard.com">info@gchalkboard.com</a>.</p>
<p>Best regards,<br>The Global Chalkboard Team</p>`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
