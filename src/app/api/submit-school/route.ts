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
    // visa_sponsorship stays as string ('true'/'false') — schema expects z.enum(['true','false'])
    const coerced = {
      ...raw,
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
      visa_sponsorship: data.visa_sponsorship === 'true',
      additional_requirements: data.additional_requirements ?? null,
      gdpr_consent: data.gdpr_consent,
      status: 'New',
    })
    if (dbErr) throw dbErr

    // Confirmation to school
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: data.email,
      subject: 'Vacancy received: Global Chalkboard',
      html: `<div style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #1e293b; max-width: 600px;">
<p style="margin: 0 0 16px;">Dear ${data.contact_person},</p>
<p style="margin: 0 0 16px;">Thank you for submitting your vacancy to Global Chalkboard. We have received the details for the <strong>${data.job_title}</strong> position at ${data.school_name}.</p>
<p style="margin: 0 0 16px;">We will review your vacancy and begin identifying the best-matched candidates from our talent pool. We will be in touch directly with an update.</p>
<p style="margin: 0 0 32px;">If you have any questions in the meantime, you are always welcome to reach us at <a href="mailto:info@gchalkboard.com" style="color: #0ea472;">info@gchalkboard.com</a>.</p>
<p style="margin: 0 0 4px; font-weight: bold;">The Global Chalkboard Team</p>
<div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
  <p style="margin: 0; font-size: 13px; color: #64748b;">
    Global Chalkboard | UK-Based International Teacher Placement<br>
    <a href="https://gchalkboard.com" style="color: #0ea472; text-decoration: none;">gchalkboard.com</a>
    &nbsp;|&nbsp;
    <a href="mailto:info@gchalkboard.com" style="color: #0ea472; text-decoration: none;">info@gchalkboard.com</a>
  </p>
</div>
</div>`,
    })

    // Admin notification
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: getAdminEmails(),
      subject: `New school vacancy: ${data.school_name}, ${data.job_title}`,
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
