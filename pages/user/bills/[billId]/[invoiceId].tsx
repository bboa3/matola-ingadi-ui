import SelectMenu from '@components/Form/Select'
import Layout from '@components/Layout/User'
import { httpFetch } from '@lib/fetch'
import { paymentMethods as selectMethods } from '@lib/validator/event-reservation'
import { dateFormatter } from '@utils/day'
import { moneyFormatter } from '@utils/money-formatter'
import { paymentMethodCalculator } from '@utils/payment-method-calculator'
import { Bill, Invoice, PaymentMethod } from 'bill'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'

interface Props {
  token: string
  invoiceUrl: string
  billId: string
  invoice: Invoice
  paymentMethods: PaymentMethod[]
}

const UserInvoice: React.FC<Props> = ({ invoiceUrl, token, billId, invoice, paymentMethods }) => {
  const router = useRouter()
  const [selectMethod, setSelectMethod] = useState(selectMethods[0])

  const { invoiceId, service: { eventType, eventDate, guestsNumber }, total: subTotal, dueAt } = invoice

  const paymentMethodDeduction = useCallback(() => {
    const method = paymentMethods.find(({ id }) => selectMethod.id === id)

    const deduction = paymentMethodCalculator({ paymentMethod: method!, subTotal })

    return deduction
  }, [selectMethod])

  const { total, commissionAmount } = paymentMethodDeduction()

  const dueDate = dateFormatter(new Date(dueAt.split('+')[0]))
  const partyAt = dateFormatter(new Date(eventDate))

  const onSubmit = () => {
    httpFetch.put('/confirm-payment', {
      billId,
      invoiceId: invoiceId.code,
      paymentMethodId: selectMethod.id
    }, {
      headers: {
        Authorization: `beaer ${token}`
      }
    }).then(_response => {
      router.push(`/user/bills/${billId}/${invoiceId.code}?status=COMPLETED`)
    })
      .catch(err => console.log(err))
  }

  return (
    <Layout
      title=''
      keywords=''
      description=''
    >
      <div className="flex flex-wrap justify-center mt-4">
        <div className='w-full h-full max-w-5xl relative bg-white px-5 py-6 rounded-lg divide-y'>
          <div className='space-y-7 lg:space-y-0 lg:grid grid-cols-2 gap-4'>
            <div className=''>
              <h1 className='text-xl md:text-2xl text-red-700 font-medium'>Você tem um pagamento pendente</h1>
              <p className='text-sm mt-1 lg:mt-0 text-gray-500'>Por favar, selecione a forma de pagamento para pagar</p>
            </div>
            <div className='w-full lg:flex justify-end'>
              <div className='max-w-[22rem] w-full'>
                <SelectMenu
                  label='Forma de pagamento'
                  selected={selectMethod}
                  setSelected={setSelectMethod}
                  items={selectMethods}
                />
              </div>
            </div>
          </div>
          <div className='lg:divide-x lg:grid grid-cols-2 gap-4 py-3'>
            <div className='lg:grid grid-cols-2 gap-4 py-3 lg:pr-3'>
              <div className='space-y-4'>
                <div className=''>
                  <span className='block text-sm text-gray-500'>Evento esperado</span>
                  <p className='text-xl font-medium'>{eventType}</p>
                </div>
                <div>
                  <span className='block text-sm text-gray-500'>Data do evento</span>
                  <p className='text-sm font-medium text-gray-500'>{partyAt}</p>
                </div>
              </div>

              <div className='space-y-4'>
                <div>
                  <span className='block text-sm text-gray-500'>Número de convidados</span>
                  <p className='text-sm font-medium text-gray-500'>{guestsNumber}</p>
                </div>
              </div>
            </div>

            <div className='lg:grid grid-cols-2 gap-4 py-3 lg:pl-3'>
              <div className='space-y-4'>
                <div className='py-3'>
                  <span className='block text-sm text-gray-500'>Data de Vencimento</span>
                  <p className='text-sm font-medium text-gray-500'>{dueDate}</p>
                </div>
                <div>
                  <span className='block text-sm text-gray-500'>Valor total da fatura</span>
                  <p className='text-sm font-medium'>{moneyFormatter(subTotal)}</p>
                </div>
              </div>
              <div className='space-y-4'>
                <div>
                  <span className='block text-sm text-gray-500'>Taxa gateway de pagamento</span>
                  <p className='text-sm font-medium'>{moneyFormatter(commissionAmount)}</p>
                </div>
                <div>
                  <span className='block text-sm text-gray-500'>Total a pagar</span>
                  <p className='text-xl font-medium'>{moneyFormatter(total)}</p>
                </div>
              </div>
            </div>

            <div className='lg:grid grid-cols-2 gap-4 py-3 lg:pl-3 space-y-3 lg:space-y-0 mt-3 lg:mt-0'>
              <button
                onClick={() => onSubmit()}
                className='w-full h-12 flex justify-center items-center font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-500'
              >
                Confirmar Pagamento
              </button>
              <Link
                href={invoiceUrl}
                download
                className='w-full h-12 flex justify-center items-center font-medium rounded-lg border-2 text-indigo-600 border-indigo-600 hover:bg-indigo-100'
              >
                Baixa fatura
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const COOKIES_NAME = process.env.COOKIES_NAME
  if (!COOKIES_NAME) {
    throw new Error('COOKIES_NAME is not set')
  }
  const token = context.req.cookies[COOKIES_NAME]
  const session = await getSession(context)

  if (!session || !token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { billId, invoiceId, status } = context.query

  const { data: invoiceUrl } = await httpFetch.get(`/invoice/document?billId=${billId}&invoiceId=${invoiceId}`, {
    headers: { Authorization: `beaer ${token}` }
  })

  if (invoiceUrl && status !== 'PENDING') {
    return {
      redirect: {
        destination: invoiceUrl,
        permanent: false
      }
    }
  }

  const { data: bill }: { data: Bill} = await httpFetch.get(`bill/${billId}`, {
    headers: { Authorization: `beaer ${token}` }
  })

  const { data: paymentMethods } = await httpFetch.get('/payment-method', {
    headers: { Authorization: `beaer ${token}` }
  })

  if (!bill && !paymentMethods) {
    return {
      redirect: {
        destination: '/user/bills',
        permanent: false
      }
    }
  }

  const invoice = bill.invoices.find(invoice => invoice.invoiceId.code === invoiceId)

  if (!invoice) {
    return {
      redirect: {
        destination: '/user/bills',
        permanent: false
      }
    }
  }

  return {
    props: {
      token,
      invoiceUrl,
      billId,
      invoice,
      paymentMethods
    }
  }
}

export default UserInvoice
