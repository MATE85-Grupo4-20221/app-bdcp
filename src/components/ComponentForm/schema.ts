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
  objective: Yup.string().required('Campo obrigatório.'),
  syllabus: Yup.string().required('Campo obrigatório.'),
  methodology: Yup.string().required('Campo obrigatório.'),
  learningAssessment: Yup.string().nullable().required('Campo obrigatório.'),
  bibliography: Yup.string().required('Campo obrigatório.'),
  prerequeriments: Yup.array(prerequerimentSchema),
  studentWorkload: workloadSchema,
  teacherWorkload: workloadSchema,
  moduleWorkload: workloadSchema,
})
