import * as Yup from 'yup'

const langOptions = [
  {
    locale: 'en',
    email: {
      invalid: 'Invalid Email',
      required: 'Fill in your email address'
    }
  },
  {
    locale: 'pt',
    email: {
      invalid: 'Email inválido',
      required: 'Preencha com seu endereço de Email'
    }
  }
]

const getValidator = (locale: string) => {
  const lang = langOptions.find((page) => page.locale === locale)!

  const validator = Yup.object({
    email: Yup.string()
      .email(lang.email.invalid)
      .required(lang.email.required)
  })

  return validator
}

export default getValidator
