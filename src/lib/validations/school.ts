import { z } from 'zod'

export const schoolSchema = z.object({
  school_name: z.string().min(2, 'School name is required'),
  contact_person: z.string().min(2, 'Contact person name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Phone number is required'),
  school_location: z.string().min(2, 'School location is required'),
  curriculum: z.enum(['British', 'IB', 'American', 'Other'], {
    error: 'Please select a curriculum type',
  }),
  job_title: z.string().min(2, 'Job title is required'),
  subject_area: z.string().min(2, 'Subject area is required'),
  grade_level: z.string().min(2, 'Grade level is required'),
  contract_type: z.enum(['Full-Time', 'Part-Time', 'Fixed Term'], {
    error: 'Please select a contract type',
  }),
  salary_range: z.string().optional(),
  start_date: z.string().min(1, 'Please select a start date'),
  visa_sponsorship: z.boolean({
    error: 'Please indicate visa sponsorship availability',
  }),
  additional_requirements: z.string().optional(),
  gdpr_consent: z.literal(true, { error: 'You must consent to proceed' }),
})

export type SchoolFormValues = z.infer<typeof schoolSchema>
