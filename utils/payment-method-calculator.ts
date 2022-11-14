import { PaymentMethod } from 'bill'

interface Props {
  subTotal: number
  paymentMethod: PaymentMethod
}

interface Total {
  commissionAmount: number
  total: number
}

export const paymentMethodCalculator = ({ paymentMethod, subTotal }: Props): Total => {
  const { commission: { model, value } } = paymentMethod

  if (model === 'PERCENTAGE') {
    const commissionAmount = subTotal * value / 100

    return {
      commissionAmount,
      total: subTotal + commissionAmount
    }
  }

  return {
    commissionAmount: value,
    total: subTotal + value
  }
}
