import Layout from '@components/Layout/Admin'
import { httpFetch } from '@lib/fetch'
import { dateFormatter } from '@utils/day'
import { moneyFormatter } from '@utils/money-formatter'
import { Bill } from 'bill'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

interface Props {
  token: string
  bills: Bill[]
}

const UserInvoice: React.FC<Props> = ({ bills }) => {
  return (
    <Layout
      title=''
      keywords=''
      description=''
    >
      <div className="flex flex-wrap justify-center mt-4">
        <div className='w-full h-full max-w-5xl relative bg-white px-5 py-6 rounded-lg divide-y'>
          <div className='pb-7'>
            <h1 className='text-xl md:text-2xl text-gray-700 font-medium'>Eventos e Faturas</h1>
            <p className='text-sm mt-1 lg:mt-0 text-gray-500'>Click nome do cliente para informação do cliente e estado da fatura para a fatura</p>
          </div>
        {
          bills.map(({ id, userId, userName, invoices, services: { eventDate, eventType, guestsNumber }, total, subTotal }) => {
            const invoice1 = invoices[0]
            const invoice2 = invoices[1]

            const partyAt = dateFormatter(new Date(eventDate))

            return (
              <div className='lg:divide-x lg:grid grid-cols-2 gap-4 py-3'>
              <div className='lg:grid grid-cols-2 gap-4 py-3 lg:pr-3'>
                <div className='space-y-4'>
                  <div>
                    <span className='block text-sm text-gray-500'>Nome do cliente</span>
                    <Link
                      href={`/admin/user/${userId}`}
                      className='text-xl font-medium text-gray-900 hover:text-gray-700'
                    >
                      {userName}
                    </Link>
                  </div>
                  <div>
                    <span className='block text-sm text-gray-500'>Evento do cliente</span>
                    <p className='text-sm font-medium text-gray-500'>{eventType}</p>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div>
                    <span className='block text-sm text-gray-500'>Data do evento</span>
                    <p className='text-sm font-medium text-gray-500'>{partyAt}</p>
                  </div>
                  <div>
                    <span className='block text-sm text-gray-500'>Número de convidados</span>
                    <p className='text-sm font-medium text-gray-500'>{guestsNumber}</p>
                  </div>
                </div>
              </div>

              <div className='lg:grid grid-cols-2 gap-4 py-3 lg:pl-3'>
                <div className='space-y-4'>
                  <div className='py-3'>
                    <span className='block text-sm text-gray-500'>Estado da fatura 1</span>
                    <Link
                      href={`/admin/bills/${id}/${invoice1.invoiceId.code}?status=${invoice2.status}`}
                      className='text-sm'
                    >
                      {
                              invoice1.status === 'COMPLETED'
                                ? (
                                <span className='py-1 px-1.5 text-white font-medium bg-green-600 rounded-lg'>
                                  Pago
                                </span>
                                  )
                                : null
                            }
                            {
                              invoice1.status === 'PENDING'
                                ? (
                                <span className='py-1 px-1.5 text-gray-900 font-medium bg-yellow-500 rounded-lg'>
                                  Pendente
                                </span>
                                  )
                                : null
                            }
                            {
                              invoice1.status === 'FAILED'
                                ? (
                                <span className='py-1 px-1.5 text-white font-medium bg-red-600 rounded-lg'>
                                  Fracassada
                                </span>
                                  )
                                : null
                            }
                    </Link>
                  </div>
                  <div>
                    <span className='block text-sm text-gray-500'>Estado da fatura 2</span>
                    <Link
                      href={`/admin/bills/${id}/${invoice2.invoiceId.code}?status=${invoice2.status}`}
                      className='text-sm'
                    >
                      {
                              invoice2.status === 'COMPLETED'
                                ? (
                                <span className='py-1 px-1.5 text-white font-medium bg-green-600 rounded-lg'>
                                  Pago
                                </span>
                                  )
                                : null
                            }
                            {
                              invoice2.status === 'PENDING'
                                ? (
                                <span className='py-1 px-1.5 text-gray-900 font-medium bg-yellow-500 rounded-lg'>
                                  Pendente
                                </span>
                                  )
                                : null
                            }
                            {
                              invoice2.status === 'FAILED'
                                ? (
                                <span className='py-1 px-1.5 text-white font-medium bg-red-600 rounded-lg'>
                                  Fracassada
                                </span>
                                  )
                                : null
                            }
                    </Link>
                  </div>
                </div>
                <div className='space-y-4'>
                  <div>
                    <span className='block text-sm text-gray-500'>Total a pagar fatura 1</span>
                    <p className='text-xl font-medium'>{moneyFormatter(invoice1.total)}</p>
                  </div>
                  <div>
                    <span className='block text-sm text-gray-500'>Total a pagar fatura 2</span>
                    <p className='text-xl font-medium'>{moneyFormatter(invoice2.total)}</p>
                  </div>
                </div>
              </div>
            </div>
            )
          })
        }
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['next-auth.session-token']
  const session = await getSession(context)

  if (!session || !token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { data: admin } = await httpFetch.get('/user', {
    headers: { Authorization: `beaer ${token}` }
  })

  if (!admin.admin) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { data: bills }: { data: Bill[]} = await httpFetch.get('/bills', {
    headers: { Authorization: `beaer ${token}` }
  })

  if (!bills) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      token,
      bills
    }
  }
}

export default UserInvoice
