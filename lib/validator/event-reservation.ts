import { ItemSelect } from '@components/Form/Select'
import * as Yup from 'yup'

export const eventTypes: ItemSelect[] = [
  { id: 'Casamento', name: 'Casamento' },
  { id: 'Boda', name: 'Boda' },
  { id: 'Aniversário', name: 'Aniversário' },
  { id: 'Graduação', name: 'Graduação' },
  { id: 'Evento Empresarial', name: 'Evento Empresarial' },
  { id: 'Evento Corporativo', name: 'Evento Corporativo' },
  { id: 'Evento Cultural', name: 'Evento Cultural' },
  { id: 'Festá Religiosa', name: 'Festá Religiosa' },
  { id: 'Outros', name: 'Outros' }
]

export const paymentMethods: ItemSelect[] = [
  { id: 'mpesa', name: 'M-Pesa' },
  { id: '24', name: 'Conta Móvel' }
]

const eventTypesIds = eventTypes.map(({ id }) => id) as string[]
const paymentMethodIds = paymentMethods.map(({ id }) => id) as string[]

const validator = Yup.object({
  numberOfGuests: Yup.string()
    .required('Qual é o número de convidados?')
    .min(1, 'Desculpas, pelo menos 1 convidado por favor')
    .max(350, 'Desculpas, o espaço é limitado a 350 convidados'),
  eventType: Yup.string()
    .required('Selecione o typo de evento')
    .oneOf(eventTypesIds),
  paymentMethodId: Yup.string()
    .required('Forma de Pagamento para sua reserva')
    .oneOf(paymentMethodIds)
})

export default validator
