import * as Yup from 'yup'

const validator = Yup.object({
  name: Yup.string()
    .min(2, 'Nome invalido')
    .max(40, 'Nome invalido')
    .required('Digite o seu nome'),
  phoneNumber: Yup.string()
    .required('Precisamos do seu contacto')
    .min(7, 'Contacto invalido')
    .max(15, 'Contacto invalido'),
  streetAddress: Yup.string()
    .min(2, 'Endereço da Rua invalido')
    .max(40, 'Endereço da Rua invalido')
    .required('Precisamos do seu nome'),
  address1: Yup.string()
    .min(0, 'Endereço invalido')
    .max(100, 'Endereço invalido')
    .required('Digite o número casa/Apartamento/Suite'),
  cityOrDistrict: Yup.string()
    .min(2, 'Endereço invalido')
    .max(40, 'Endereço invalido')
    .required('Digite o nome da Cidade ou Distrito'),
  postalCode: Yup.string()
    .min(2, 'Endereço invalido')
    .max(40, 'Endereço invalido')
    .required('Digite o código postal ou zip'),
  provinceOrState: Yup.string()
    .min(2, 'Deve ter 2 caracteres ou mais')
    .max(40, 'Deve ter 40 caracteres ou menos')
    .required('Digite o nome da província/estado')
})

export default validator
