import * as Yup from 'yup'

const validator = Yup.object({
  description: Yup.string()
    .min(0, 'Informação curta demais')
    .max(300, 'Informação longa demais')
    .required('Informação do pagamento')
})

export default validator
