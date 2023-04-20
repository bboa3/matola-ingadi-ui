export const findBoxPlotValues = (ns: number[]) => {
  const ascendingOrder = ns.sort((a, b) => a - b)

  const lowest = ascendingOrder[0]

  const highestIndex = ascendingOrder.length - 1
  const highest = ascendingOrder[highestIndex]

  const Q2Index = Math.floor(highestIndex / 2)
  const Q2 = ascendingOrder[Q2Index]

  const Q1Index = Math.floor(Q2Index / 2)
  const Q1 = ascendingOrder[Q1Index]

  const Q3Index = Math.floor((Q2Index + highestIndex) / 2)
  const Q3 = ascendingOrder[Q3Index]

  return {
    lowest,
    highest,
    Q1,
    Q2,
    Q3
  }
}
