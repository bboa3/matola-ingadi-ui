import * as Yup from 'yup'

const langOptions = [
  {
    locale: 'en',
    name: {
      invalid: 'Invalid name',
      required: 'Fill in your name'
    },
    email: {
      invalid: 'Invalid Email',
      required: 'Fill in your email address'
    },
    phoneNumber: {
      invalid: 'Invalid phone number',
      required: 'Your phone number'
    },
    message: {
      invalid: 'Invalid message',
      required: 'Tell us how we can help you'
    }
  },
  {
    locale: 'pt',
    name: {
      invalid: 'Nome invalido',
      required: 'Preencha com o seu nome'
    },
    email: {
      invalid: 'Email inválido',
      required: 'Preencha com seu endereço de Email'
    },
    phoneNumber: {
      invalid: 'Número de telefone invalido',
      required: 'Seu número de telefone'
    },
    message: {
      invalid: 'Mensagem invalido',
      required: 'Diga-nos como podemos ajudá-lo'
    }
  }
]

const getValidator = (locale: string) => {
  const lang = langOptions.find((page) => page.locale === locale)!

  const validator = Yup.object({
    name: Yup.string()
      .min(2, lang.name.invalid)
      .max(40, lang.name.invalid)
      .required(lang.name.required),
    email: Yup.string()
      .email(lang.email.invalid)
      .required(lang.email.required),
    phoneNumber: Yup.string()
      .min(7, lang.phoneNumber.invalid)
      .max(15, lang.phoneNumber.invalid)
      .required(lang.phoneNumber.required),
    message: Yup.string()
      .min(5, lang.message.invalid)
      .max(350, lang.message.invalid)
      .required(lang.message.required)
  })

  return validator
}

export default getValidator
