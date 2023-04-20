export const textHighlighter = (n: number) => {
  const isPositive = Math.sign(n)

  if (isPositive >= 0) {
    return 'text-emerald-500'
  }
  return 'text-red-600'
}
