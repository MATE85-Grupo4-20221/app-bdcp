import * as Yup from 'yup'

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
  kind: Yup.string().required('Campo obrigatório.'),
  studentWorkload: workloadSchema,
  teacherWorkload: workloadSchema,
  moduleWorkload: workloadSchema,
  program: Yup.string().required('Campo obrigatório.'),
  objective: Yup.string().required('Campo obrigatório.'),
  syllabus: Yup.string().required('Campo obrigatório.'),
  methodology: Yup.string().required('Campo obrigatório.'),
  learningAssessment: Yup.string().required('Campo obrigatório.'),
  bibliography: Yup.string().required('Campo obrigatório.'),
})
