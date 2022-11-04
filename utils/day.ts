export const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

export const weekDays = [
  'Domingo',
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado'
]

export const dateFormatter = (d: Date) => {
  const weekDay = weekDays[d.getDay()]
  const day = d.getDate()
  const month = months[d.getMonth()]
  const year = d.getFullYear()

  return `${weekDay}, ${day} de ${month} ${year}`
}
