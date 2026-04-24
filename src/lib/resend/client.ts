import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_ADDRESS = 'Global Chalkboard <info@gchalkboard.com>'

// All admin notifications go to both accounts
export function getAdminEmails(): string[] {
  const emails: string[] = []
  if (process.env.ADMIN_EMAIL) emails.push(process.env.ADMIN_EMAIL)
  if (process.env.ADMIN_EMAIL_2) emails.push(process.env.ADMIN_EMAIL_2)
  return emails.length > 0 ? emails : ['info@gchalkboard.com']
}
