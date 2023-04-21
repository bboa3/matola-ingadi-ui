import * as Yup from 'yup'

const langOptions = [
  {
    locale: 'en',
    guestsNumber: {
      invalid: 'Invalid Guests Number',
      required: 'How many guests will we have at the event?'
    },
    eventDate: {
      invalid: 'Data do evento inválido',
      required: 'When will we have your event?'
    },
    name: {
      invalid: 'Invalid name',
      required: 'Fill in your name'
    },
    email: {
      invalid: 'Invalid email',
      required: 'Fill in your email'
    },
    phoneNumber: {
      invalid: 'Invalid phone number',
      required: 'Your phone number'
    },
    cityOrDistrict: {
      invalid: 'Invalid address',
      required: 'Fill in the name of your City or District'
    },
    provinceOrState: {
      invalid: 'Invalid province/state name',
      required: 'Fill in the name of your province/state'
    }
  },
  {
    locale: 'pt',
    guestsNumber: {
      invalid: 'Número de convidados inválido',
      required: 'Quantos convidados teremos no evento?'
    },
    eventDate: {
      invalid: 'Data do evento inválido',
      required: 'Quando teremos o seu evento?'
    },
    name: {
      invalid: 'Nome invalido',
      required: 'Preencha com o seu nome'
    },
    email: {
      invalid: 'Email invalido',
      required: 'Preencha com o seu email'
    },
    phoneNumber: {
      invalid: 'Número de telefone invalido',
      required: 'Seu número de telefone'
    },
    cityOrDistrict: {
      invalid: 'Endereço invalido',
      required: 'Preencha com o nome da Cidade ou Distrito'
    },
    provinceOrState: {
      invalid: 'Nome da província ou estado invalido',
      required: 'Preencha com o nome da província/estado'
    }
  }
]

const getValidator = (locale: string) => {
  const lang = langOptions.find((page) => page.locale === locale)!

  const validator = Yup.object({
    guestsNumber: Yup.number()
      .min(1, lang.guestsNumber.invalid)
      .max(1000, lang.guestsNumber.invalid)
      .required(lang.guestsNumber.required),
    eventDate: Yup.string()
      .required(lang.eventDate.required)
      .matches(/\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])*/g, lang.eventDate.invalid),
    name: Yup.string()
      .min(2, lang.name.invalid)
      .max(40, lang.name.invalid)
      .required(lang.name.required),
    email: Yup.string()
      .min(2, lang.email.invalid)
      .max(40, lang.email.invalid)
      .required(lang.email.required),
    phoneNumber: Yup.string()
      .min(7, lang.phoneNumber.invalid)
      .max(15, lang.phoneNumber.invalid)
      .required(lang.phoneNumber.required),
    cityOrDistrict: Yup.string()
      .min(2, lang.cityOrDistrict.invalid)
      .max(40, lang.cityOrDistrict.invalid)
      .required(lang.cityOrDistrict.required),
    provinceOrState: Yup.string()
      .min(2, lang.provinceOrState.invalid)
      .max(40, lang.provinceOrState.invalid)
      .required(lang.provinceOrState.required)
  })

  return validator
}

export default getValidator
