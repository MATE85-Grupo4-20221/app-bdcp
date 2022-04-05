import { ComponentLog } from './ComponentLog'
import { ComponentWorkload } from './ComponentWorkload'

export interface Component {
  id: string
  code: string
  name: string
  department: string
  semester: string
  program: string
  syllabus: string
  workload: ComponentWorkload
  logs: ComponentLog[]
  createdBy: string
}
