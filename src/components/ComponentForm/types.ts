export interface WorkloadValues {
  theory: number
  practice: number
  theoryPractice: number
  internship: number
  practiceInternship: number
}

export interface PrerequerimentValues {
  courseNum: string
  courseCode: string
}

export interface ComponentFormValues {
  code: string
  name: string
  department: string
  semester: string
  modality: string
  program: string
  objective: string
  syllabus: string
  methodology: string
  learningAssessment: string
  bibliography: string
  prerequeriments: PrerequerimentValues[]
  studentWorkload: WorkloadValues
  teacherWorkload: WorkloadValues
  moduleWorkload: WorkloadValues
}
