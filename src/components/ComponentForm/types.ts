export interface WorkloadValues {
  theory: number
  practice: number
  theoryPractice: number
  internship: number
  practiceInternship: number
}

export interface PrerequirementValues {
  courseNum: string
  courseCode: string
}

export interface ComponentFormValues {
  code: string
  name: string
  department: string
  semester: string
  kind: string
  studentWorkload: WorkloadValues
  teacherWorkload: WorkloadValues
  moduleWorkload: WorkloadValues
  prerequeriments: PrerequirementValues[]
  program: string
  objective: string
  syllabus: string
  methodology: string
  learningAssessment: string
  bibliography: string
}
