export type TeacherStatus =
  | 'New'
  | 'Contacted'
  | 'Interview'
  | 'Offered'
  | 'Placed'
  | 'Declined'
  | 'On Hold'

export type SchoolStatus =
  | 'New'
  | 'Contacted'
  | 'Shortlisting'
  | 'Filled'
  | 'Closed'
  | 'On Hold'

export interface TeacherRegistration {
  id: string
  full_name: string
  email: string
  phone: string
  current_location: string
  highest_qualification: string
  teaching_certifications: string
  qts_status: boolean
  years_experience: number
  subjects_taught: string
  preferred_grade_levels: string
  earliest_start_date: string
  cv_path: string | null
  photo_path: string | null
  additional_doc_paths: string[] | null
  gdpr_consent: boolean
  status: TeacherStatus
  notes: string | null
  submitted_at: string
  updated_at: string
}

export interface SchoolVacancy {
  id: string
  school_name: string
  contact_person: string
  email: string
  phone: string
  school_location: string
  curriculum: string
  job_title: string
  subject_area: string
  grade_level: string
  contract_type: string
  salary_range: string | null
  start_date: string
  visa_sponsorship: boolean
  additional_requirements: string | null
  gdpr_consent: boolean
  status: SchoolStatus
  notes: string | null
  submitted_at: string
  updated_at: string
}

export interface EmailLog {
  id: string
  sent_to: string
  subject: string
  sent_at: string
  sent_by: string | null
  related_teacher_id: string | null
  related_school_id: string | null
}
