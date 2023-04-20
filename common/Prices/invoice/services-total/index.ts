import { discountCalculator } from '@common/Prices/invoice/services-total/discount'
import { totalByPeriodCalculator } from '@common/Prices/invoice/services-total/period-total'
import { totalByTeamCalculator } from '@common/Prices/invoice/services-total/team-total'
import { Discount, Period } from 'bill'

interface Props {
  price: number
  maxTeamMembers: number
  baseMaxTeamMembers: number
  period: Period
  discount: Discount
}

export const servicesTotalCalculator = ({ price, maxTeamMembers, baseMaxTeamMembers, period, discount }: Props) => {
  const totalByTeamMembers = totalByTeamCalculator({ price, maxTeamMembers, baseMaxTeamMembers })
  const totalByPeriod = totalByPeriodCalculator({ totalByTeamMembers, period })

  const totalAfterDiscount = discountCalculator({ totalByPeriod, period, discount })

  return totalAfterDiscount
}
