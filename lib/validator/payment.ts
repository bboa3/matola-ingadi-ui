import mMolaImg from '@assets/img/paymentMethods/m-mola.png'
import mPesaImg from '@assets/img/paymentMethods/m-pesa.jpg'
import mobile24Img from '@assets/img/paymentMethods/ponto-24.png'
import { PaymentMethod } from 'bill'

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'SIMO/BCI/Mobile24',
    name: 'Conta Móvel',
    image: mobile24Img,
    commission: {
      model: 'VALUE',
      value: 8
    }
  },
  {
    id: 'MPESA',
    name: 'M-Pesa',
    image: mPesaImg,
    commission: {
      model: 'PERCENTAGE',
      value: 3
    }
  },
  {
    id: 'E-MOLA',
    name: 'M-Mola',
    image: mMolaImg,
    commission: {
      model: 'PERCENTAGE',
      value: 3
    }
  }
]
