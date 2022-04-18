import * as Yup from 'yup'

export const prerequerimentSchema = Yup.object({
  courseNum: Yup.string(),
  courseCode: Yup.string(),
})

export const workloadSchema = Yup.object().shape({
  theory: Yup.number(),
  practice: Yup.number(),
  theoryPractice: Yup.number(),
  internship: Yup.number(),
  practiceInternship: Yup.number(),
})

export const componentSchema = Yup.object().shape({
  code: Yup.string().required('Campo obrigatório.'),
  name: Yup.string().required('Campo obrigatório.'),
  department: Yup.string().required('Campo obrigatório.'),
  semester: Yup.string().required('Campo obrigatório.'),
  modality: Yup.string().required('Campo obrigatório.'),
  program: Yup.string().required('Campo obrigatório.'),
  objective: Yup.string(),
  syllabus: Yup.string(),
  methodology: Yup.string(),
  learningAssessment: Yup.string(),
  bibliography: Yup.string(),
  prerequeriments: Yup.array(prerequerimentSchema),
  studentWorkload: workloadSchema,
  teacherWorkload: workloadSchema,
  moduleWorkload: workloadSchema,
})
