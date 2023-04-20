import { otherDiscountCalculator } from '@common/Prices/invoice/services-total/discount/other-discount'
import { periodDiscountCalculator } from '@common/Prices/invoice/services-total/discount/period-discount'
import { Discount, Period } from 'bill'

interface Props {
  totalByPeriod: number
  discount: Discount
  period: Period
}

export const discountCalculator = ({ totalByPeriod, discount, period }: Props) => {
  const periodDiscount = periodDiscountCalculator({ totalByPeriod, discount, period })
  const otherDiscount = otherDiscountCalculator({ totalByPeriod, discount })

  const totalDiscounted = periodDiscount + otherDiscount
  const total = totalByPeriod - totalDiscounted

  return {
    totalDiscounted,
    total
  }
}
