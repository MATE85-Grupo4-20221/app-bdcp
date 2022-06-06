import * as Yup from 'yup'

export const importComponentsSchema = Yup.object().shape({
  courseCode: Yup.string().required('Campo obrigatório.'),
  semester: Yup.string().required('Campo obrigatório.'),
})
