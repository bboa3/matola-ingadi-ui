import { Period } from 'bill'

interface Props {
  totalByTeamMembers: number
  period: Period
}

export const totalByPeriodCalculator = ({ totalByTeamMembers, period }: Props) => {
  if (period === 'month') {
    return totalByTeamMembers * 1
  }

  return totalByTeamMembers * 12
}
