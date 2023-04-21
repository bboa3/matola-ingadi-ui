import { discountCalculator } from '@common/Prices/invoice/services-total/discount'
import { totalByGuestsCalculator } from '@common/Prices/invoice/services-total/guests-total'
import { Discount } from 'bill'

interface Props {
  price: number
  guestsNumber: number
  baseGuestsNumber: number
  discount: Discount
}

export const servicesTotalCalculator = ({ price, guestsNumber, baseGuestsNumber, discount }: Props) => {
  const totalByGuestsNumber = totalByGuestsCalculator({ price, guestsNumber, baseGuestsNumber })

  const totalAfterDiscount = discountCalculator({ totalByGuestsNumber, discount })

  return totalAfterDiscount
}
