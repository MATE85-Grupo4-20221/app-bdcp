import { ComponentWorkload } from './ComponentWorkload'

export interface ComponentDraft {
  id: string
  code: string
  name: string
  department?: string
  semester?: string
  modality?: string
  program?: string
  objective?: string
  syllabus?: string
  methodology?: string
  learningAssessment?: string
  bibliography?: string
  prerequeriments?: string
  workload?: ComponentWorkload
  userId: string
}
