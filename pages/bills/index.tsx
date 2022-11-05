import Layout from '@components/Layout'
import { httpFetch } from '@lib/fetch'
import { moneyFormatter } from '@utils/money-formatter'
import { Bill, Invoice } from 'bill'
import dayjs from 'dayjs'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import React, { useCallback } from 'react'

interface Props {
  bills: Bill[]
  token: string
}

const PerfilUpdate: React.FC<Props> = ({ bills, token }) => {
  const findInvoices = useCallback(() => {
    const allInvoices: Invoice[] = []

    for (const bill of bills) {
      const { invoices } = bill

      for (const invoice of invoices) {
        allInvoices.push(invoice)
      }
    }

    return allInvoices
  }, [bills])

  const invoices = findInvoices()

  return (
    <Layout
      title=''
      keywords=''
      description=''
    >
      <div className="flex w-full min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className='w-full max-w-5xl bg-white'>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="border-b-2 border-gray-300 text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                            Fatura Código
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Data de Emissão
                        </th>
                        <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                            Vencimento
                        </th>
                        <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                            Total
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Estado
                        </th>
                    </tr>
                </thead>
                <tbody>
                  {
                    invoices.map(({ invoiceId, createdAt, dueAt, total, status }) => {
                      const dueDate = dueAt.split('+')[0]
                      const createdDate = createdAt.split('+')[0]

                      const createAtFormatted = dayjs(createdDate).format('DD/MM/YYYY')
                      const dueAtFormatted = dayjs(dueDate).format('DD/MM/YYYY')

                      return (
                        <tr key={invoiceId.code} className="border-b border-gray-200 dark:border-gray-700">
                          <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                            {invoiceId.code}
                          </th>
                          <td className="py-4 px-6">
                            {createAtFormatted}
                          </td>
                          <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                            { dueAtFormatted }
                          </td>
                          <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                            { moneyFormatter(total) }
                          </td>
                          <td className="py-4 px-6">
                            {
                              status === 'COMPLETED'
                                ? (
                                <span className='py-0.5 px-1 text-white font-medium bg-green-600 rounded-lg'>
                                  Pago
                                </span>
                                  )
                                : null
                            }
                            {
                              status === 'PENDING'
                                ? (
                                <span className='py-0.5 px-1 text-gray-900 font-medium bg-yellow-500 rounded-lg'>
                                  Pendente
                                </span>
                                  )
                                : null
                            }
                            {
                              status === 'FAILED'
                                ? (
                                <span className='py-0.5 px-1 text-white font-medium bg-red-600 rounded-lg'>
                                  Fracassada
                                </span>
                                  )
                                : null
                            }
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
            </table>
          </div>
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

  const { data } = await httpFetch.get('/bills', {
    headers: { Authorization: `beaer ${token}` }
  })

  return {
    props: {
      bills: data,
      token
    }
  }
}

export default PerfilUpdate
