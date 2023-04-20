import { commissionCalculator } from '@common/Prices/invoice/commission-calculator'
import { servicesTotalCalculator } from '@common/Prices/invoice/services-total'
import { Commission, Period, Pricing } from 'bill'

interface Props {
  pricing: Pricing
  maxTeamMembers: number
  period: Period
  commission: Commission
}

export const totalCalculator = ({ pricing, maxTeamMembers, period, commission }: Props) => {
  const { price, baseMaxTeamMembers, discount } = pricing

  const { total: servicesTotal, totalDiscounted } = servicesTotalCalculator({ price, baseMaxTeamMembers, maxTeamMembers, period, discount })
  const { subTotal, total, paymentGatewayFee } = commissionCalculator({ amount: servicesTotal, commission })

  return {
    subTotal,
    total,
    paymentGatewayFee,
    totalDiscounted
  }
}
