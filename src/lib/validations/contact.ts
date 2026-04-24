import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['teacher', 'school', 'other'], {
    error: 'Please select your role',
  }),
  message: z.string().min(10, 'Please write at least a few words'),
})

export type ContactFormValues = z.infer<typeof contactSchema>
