import { NextRequest, NextResponse } from 'next/server'
import { schoolSchema } from '@/lib/validations/school'
import { createAdminClient } from '@/lib/supabase/server'
import { resend, FROM_ADDRESS, getAdminEmails } from '@/lib/resend/client'

export async function POST(req: NextRequest) {
  try {
    // Accept either JSON or URL-encoded body
    const contentType = req.headers.get('content-type') || ''
    let raw: Record<string, unknown>

    if (contentType.includes('application/json')) {
      raw = await req.json()
    } else {
      const text = await req.text()
      const params = new URLSearchParams(text)
      raw = Object.fromEntries(params.entries())
    }

    // Coerce types before validation
    const coerced = {
      ...raw,
      visa_sponsorship: raw.visa_sponsorship === 'true' || raw.visa_sponsorship === true,
      gdpr_consent:
        raw.gdpr_consent === 'true' || raw.gdpr_consent === true || raw.gdpr_consent === 'on',
    }

    const parsed = schoolSchema.safeParse(coerced)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.issues },
        { status: 400 }
      )
    }

    const data = parsed.data
    const supabase = await createAdminClient()

    // Insert DB record
    const { error: dbErr } = await supabase.from('school_vacancies').insert({
      school_name: data.school_name,
      contact_person: data.contact_person,
      email: data.email,
      phone: data.phone,
      school_location: data.school_location,
      curriculum: data.curriculum,
      job_title: data.job_title,
      subject_area: data.subject_area,
      grade_level: data.grade_level,
      contract_type: data.contract_type,
      salary_range: data.salary_range ?? null,
      start_date: data.start_date,
      visa_sponsorship: data.visa_sponsorship,
      additional_requirements: data.additional_requirements ?? null,
      gdpr_consent: data.gdpr_consent,
      status: 'New',
    })
    if (dbErr) throw dbErr

    // Confirmation to school
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: data.email,
      subject: 'Vacancy received — Global Chalkboard',
      html: `<p>Dear ${data.contact_person},</p>
<p>Thank you for submitting your vacancy to Global Chalkboard. We have received the details for the
<strong>${data.job_title}</strong> position at ${data.school_name}.</p>
<p>We will review your vacancy and begin identifying suitable candidates from our talent pool.
You can expect to hear from us within three to five working days.</p>
<p>If you have any questions in the meantime, please contact us at
<a href="mailto:info@gchalkboard.com">info@gchalkboard.com</a>.</p>
<p>Best regards,<br>The Global Chalkboard Team</p>`,
    })

    // Admin notification
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: getAdminEmails(),
      subject: `New school vacancy: ${data.school_name} — ${data.job_title}`,
      html: `<h2>New School Vacancy</h2>
<table>
<tr><td><strong>School:</strong></td><td>${data.school_name}</td></tr>
<tr><td><strong>Contact:</strong></td><td>${data.contact_person}</td></tr>
<tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
<tr><td><strong>Phone:</strong></td><td>${data.phone}</td></tr>
<tr><td><strong>Location:</strong></td><td>${data.school_location}</td></tr>
<tr><td><strong>Curriculum:</strong></td><td>${data.curriculum}</td></tr>
<tr><td><strong>Job Title:</strong></td><td>${data.job_title}</td></tr>
<tr><td><strong>Subject:</strong></td><td>${data.subject_area}</td></tr>
<tr><td><strong>Grade Level:</strong></td><td>${data.grade_level}</td></tr>
<tr><td><strong>Contract:</strong></td><td>${data.contract_type}</td></tr>
<tr><td><strong>Salary:</strong></td><td>${data.salary_range || 'Not specified'}</td></tr>
<tr><td><strong>Start Date:</strong></td><td>${data.start_date}</td></tr>
<tr><td><strong>Visa Sponsorship:</strong></td><td>${data.visa_sponsorship ? 'Yes' : 'No'}</td></tr>
<tr><td><strong>Additional Requirements:</strong></td><td>${data.additional_requirements || 'None'}</td></tr>
</table>`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[submit-school]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
