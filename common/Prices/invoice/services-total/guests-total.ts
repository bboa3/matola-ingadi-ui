interface Props {
  price: number
  guestsNumber: number
  baseGuestsNumber: number
}

export const totalByGuestsCalculator = ({ baseGuestsNumber, guestsNumber, price }: Props) => {
  const guests = guestsNumber - baseGuestsNumber

  if (guests <= 0) {
    return price
  }

  return price * (guests + 1)
}
