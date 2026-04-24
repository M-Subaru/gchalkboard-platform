import { z } from 'zod'

export const teacherSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Phone number is required'),
  current_location: z.enum(['UK', 'Gulf', 'Other'], {
    error: 'Please select your current location',
  }),
  highest_qualification: z.enum(['Bachelor', 'Master', 'PhD'], {
    error: 'Please select your highest qualification',
  }),
  teaching_certifications: z.string().min(2, 'Please list your teaching certifications'),
  qts_status: z.boolean({
    error: 'Please indicate your QTS status',
  }),
  years_experience: z
    .number({ error: 'Years of experience is required' })
    .int()
    .min(0)
    .max(60),
  subjects_taught: z.string().min(2, 'Please list the subjects you teach'),
  preferred_grade_levels: z.string().min(2, 'Please list your preferred grade levels'),
  earliest_start_date: z.string().min(1, 'Please select a start date'),
  gdpr_consent: z.literal(true, { error: 'You must consent to proceed' }),
})

export type TeacherFormValues = z.infer<typeof teacherSchema>
