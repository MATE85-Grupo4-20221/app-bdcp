import * as Yup from 'yup'

export const approveSchema = Yup.object().shape({
  agreementDate: Yup.date().required('Campo obrigatório.'),
  agreementNumber: Yup.string().required('Campo obrigatório.'),
})
