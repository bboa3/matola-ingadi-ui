import { percentageCalculator } from '@utils/percentage'
import { Commission } from 'bill'

interface Props {
  amount: number
  commission: Commission
}

export const commissionCalculator = ({ amount, commission }: Props) => {
  const { model, value } = commission
  const paymentGatewayFee = model === 'VALUE' ? value : percentageCalculator(amount, value)

  const total = paymentGatewayFee + amount

  return {
    paymentGatewayFee,
    subTotal: amount,
    total
  }
}
