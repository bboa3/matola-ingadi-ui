import * as Yup from 'yup'

const validator = Yup.object({
  name: Yup.string()
    .min(2, 'Nome invalido')
    .max(40, 'Nome invalido')
    .required('Digite o nome do cliente'),
  description: Yup.string()
    .min(0, 'Mensagem curta demais')
    .max(300, 'Mensagem longa demais')
    .required('Mensagem do cliente')
})

export default validator
