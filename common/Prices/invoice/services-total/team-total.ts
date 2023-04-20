interface Props {
  price: number
  maxTeamMembers: number
  baseMaxTeamMembers: number
}

export const totalByTeamCalculator = ({ baseMaxTeamMembers, maxTeamMembers, price }: Props) => {
  const teamMembers = maxTeamMembers - baseMaxTeamMembers

  if (teamMembers <= 0) {
    return price
  }

  return price * (teamMembers + 1)
}
