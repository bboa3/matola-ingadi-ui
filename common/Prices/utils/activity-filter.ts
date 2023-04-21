import { ActivityId, Pricing } from 'bill'

interface ActivityFilterProps {
  activityId: ActivityId
  pricing: Pricing[]
}

export const activityFilter = ({ activityId, pricing }: ActivityFilterProps): Pricing[] => {
  const Professional = pricing.find(({ name, activity: { id } }) => {
    return (name === 'Premium' || name === 'Premium') && (id === activityId)
  })

  const Standard = pricing.find(({ name, activity: { id } }) => {
    return (name === 'Standard' || name === 'Padrão') && (id === activityId)
  })

  return [Standard, Professional].filter((pricing) => !!pricing) as Pricing[]
}
