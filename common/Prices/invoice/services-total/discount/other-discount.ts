import { Discount } from 'bill'

interface Props {
  totalByPeriod: number
  discount: Discount
}

export const otherDiscountCalculator = ({ totalByPeriod, discount }: Props) => {
  const { other } = discount

  if (!other) {
    return 0
  }

  const { percentage } = other

  return totalByPeriod * percentage / 100
}
