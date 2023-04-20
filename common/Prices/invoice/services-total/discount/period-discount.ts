import { Discount, Period } from 'bill'

interface Props {
  totalByPeriod: number
  discount: Discount
  period: Period
}

export const periodDiscountCalculator = ({ totalByPeriod, discount, period }: Props) => {
  const periodDiscount = discount.period.find(({ id }) => id === period)

  if (!periodDiscount) {
    return 0
  }

  const { percentage } = periodDiscount

  return totalByPeriod * percentage / 100
}
