import { NextRequest, NextResponse } from 'next/server'
import { teacherSchema } from '@/lib/validations/teacher'
import { createAdminClient } from '@/lib/supabase/server'
import { resend, FROM_ADDRESS, ADMIN_EMAIL } from '@/lib/resend/client'

const MAX_CV_SIZE = 5 * 1024 * 1024        // 5 MB
const MAX_PHOTO_SIZE = 2 * 1024 * 1024     // 2 MB
const MAX_ADDITIONAL_SIZE = 5 * 1024 * 1024

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    // --- Validate text fields ---
    const raw = {
      full_name: formData.get('full_name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      current_location: formData.get('current_location'),
      highest_qualification: formData.get('highest_qualification'),
      teaching_certifications: formData.get('teaching_certifications'),
      qts_status: formData.get('qts_status') === 'true',
      years_experience: Number(formData.get('years_experience')),
      subjects_taught: formData.get('subjects_taught'),
      preferred_grade_levels: formData.get('preferred_grade_levels'),
      earliest_start_date: formData.get('earliest_start_date'),
      gdpr_consent: formData.get('gdpr_consent') === 'true',
    }

    const parsed = teacherSchema.safeParse(raw)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 })
    }

    const data = parsed.data

    // --- Files ---
    const cvFile = formData.get('cv') as File | null
    const photoFile = formData.get('photo') as File | null
    const additionalFileEntries = formData.getAll('additional') as File[]

    if (!cvFile || cvFile.size === 0) return NextResponse.json({ error: 'CV is required' }, { status: 400 })
    if (!photoFile || photoFile.size === 0) return NextResponse.json({ error: 'Photo is required' }, { status: 400 })
    if (cvFile.size > MAX_CV_SIZE) return NextResponse.json({ error: 'CV must be under 5 MB' }, { status: 400 })
    if (photoFile.size > MAX_PHOTO_SIZE) return NextResponse.json({ error: 'Photo must be under 2 MB' }, { status: 400 })

    const supabase = await createAdminClient()
    const timestamp = Date.now()
    const emailSlug = data.email.replace(/[^a-z0-9]/gi, '_')

    // Upload CV
    const cvExt = cvFile.name.split('.').pop()
    const cvPath = `${emailSlug}/${timestamp}/cv.${cvExt}`
    const { error: cvErr } = await supabase.storage.from('teacher-cvs')
      .upload(cvPath, await cvFile.arrayBuffer(), { contentType: cvFile.type, upsert: false })
    if (cvErr) throw cvErr

    // Upload photo
    const photoExt = photoFile.name.split('.').pop()
    const photoPath = `${emailSlug}/${timestamp}/photo.${photoExt}`
    const { error: photoErr } = await supabase.storage.from('teacher-photos')
      .upload(photoPath, await photoFile.arrayBuffer(), { contentType: photoFile.type, upsert: false })
    if (photoErr) throw photoErr

    // Upload additional docs
    const additionalPaths: string[] = []
    for (let i = 0; i < Math.min(additionalFileEntries.length, 5); i++) {
      const f = additionalFileEntries[i]
      if (f.size > MAX_ADDITIONAL_SIZE) continue
      const ext = f.name.split('.').pop()
      const path = `${emailSlug}/${timestamp}/additional_${i}.${ext}`
      const { error: addErr } = await supabase.storage.from('teacher-additional-docs')
        .upload(path, await f.arrayBuffer(), { contentType: f.type, upsert: false })
      if (!addErr) additionalPaths.push(path)
    }

    // Insert DB record
    const { error: dbErr } = await supabase.from('teacher_registrations').insert({
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      current_location: data.current_location,
      highest_qualification: data.highest_qualification,
      teaching_certifications: data.teaching_certifications,
      qts_status: data.qts_status,
      years_experience: data.years_experience,
      subjects_taught: data.subjects_taught,
      preferred_grade_levels: data.preferred_grade_levels,
      earliest_start_date: data.earliest_start_date,
      gdpr_consent: data.gdpr_consent,
      cv_path: cvPath,
      photo_path: photoPath,
      additional_doc_paths: additionalPaths,
      status: 'New',
    })
    if (dbErr) throw dbErr

    // Send confirmation to teacher
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: data.email,
      subject: "We've received your application — Global Chalkboard",
      html: `<p>Hi ${data.full_name},</p>
<p>Thank you for registering with Global Chalkboard. We have received your profile and will review it carefully.</p>
<p>If your experience matches a current or upcoming vacancy, we will be in touch directly — usually within five working days.</p>
<p>In the meantime, if you have any questions, you can reach us at <a href="mailto:info@gchalkboard.com">info@gchalkboard.com</a>.</p>
<p>Best regards,<br>The Global Chalkboard Team</p>`,
    })

    // Notify admin
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: ADMIN_EMAIL,
      subject: `New teacher registration: ${data.full_name}`,
      html: `<h2>New Teacher Registration</h2>
<table>
<tr><td><strong>Name:</strong></td><td>${data.full_name}</td></tr>
<tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
<tr><td><strong>Phone:</strong></td><td>${data.phone}</td></tr>
<tr><td><strong>Location:</strong></td><td>${data.current_location}</td></tr>
<tr><td><strong>Qualification:</strong></td><td>${data.highest_qualification}</td></tr>
<tr><td><strong>QTS:</strong></td><td>${data.qts_status ? 'Yes' : 'No'}</td></tr>
<tr><td><strong>Experience:</strong></td><td>${data.years_experience} years</td></tr>
<tr><td><strong>Subjects:</strong></td><td>${data.subjects_taught}</td></tr>
<tr><td><strong>Grade Levels:</strong></td><td>${data.preferred_grade_levels}</td></tr>
<tr><td><strong>Start Date:</strong></td><td>${data.earliest_start_date}</td></tr>
</table>`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[submit-teacher]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
