import { otherDiscountCalculator } from '@common/Prices/invoice/services-total/discount/other-discount'
import { Discount } from 'bill'

interface Props {
  totalByGuestsNumber: number
  discount: Discount
}

export const discountCalculator = ({ totalByGuestsNumber, discount }: Props) => {
  const otherDiscount = otherDiscountCalculator({ totalByGuestsNumber, discount })

  const totalDiscounted = otherDiscount
  const total = totalByGuestsNumber - totalDiscounted

  return {
    totalDiscounted,
    total
  }
}
