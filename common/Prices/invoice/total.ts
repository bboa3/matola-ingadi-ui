import { commissionCalculator } from '@common/Prices/invoice/commission-calculator'
import { servicesTotalCalculator } from '@common/Prices/invoice/services-total'
import { Commission, Pricing } from 'bill'

interface Props {
  pricing: Pricing
  guestsNumber: number
  commission: Commission
}

export const totalCalculator = ({ pricing, guestsNumber, commission }: Props) => {
  const { price, baseGuestsNumber, discount } = pricing

  const { total: servicesTotal, totalDiscounted } = servicesTotalCalculator({ price, baseGuestsNumber, guestsNumber, discount })
  const { subTotal, total, paymentGatewayFee } = commissionCalculator({ amount: servicesTotal, commission })

  return {
    subTotal,
    total,
    paymentGatewayFee,
    totalDiscounted
  }
}
