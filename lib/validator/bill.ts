import * as Yup from 'yup'

const langOptions = [
  {
    locale: 'en',
    maxTeamMembers: {
      invalid: 'Invalid Users Number',
      required: 'How many people from your team will you register?'
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
    maxTeamMembers: {
      invalid: 'Número de usuário inválido',
      required: 'Quantas pessoas da sua equipe você vai registrar?'
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
    maxTeamMembers: Yup.number()
      .min(1, lang.maxTeamMembers.invalid)
      .max(1000, lang.maxTeamMembers.invalid)
      .required(lang.maxTeamMembers.required),
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
