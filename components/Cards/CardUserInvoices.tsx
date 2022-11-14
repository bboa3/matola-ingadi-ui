import { moneyFormatter } from '@utils/money-formatter'
import { Invoice } from 'bill'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React from 'react'

export interface CustomInvoice extends Invoice {
  billId: string
}

interface Props {
  invoices: CustomInvoice[]
}

const CardUserInvoices: React.FC<Props> = ({ invoices }) => {
  const router = useRouter()

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-1 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-gray-700 hidden">
                Faturas
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Ver todas
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-5 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Fatura Código
                </th>
                <th className="px-5 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Data de Emissão
                </th>
                <th className="px-5 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Vencimento
                </th>
                <th className="px-5 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Total
                </th>
                <th className="px-5 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {
                invoices.map(({ invoiceId, billId, createdAt, dueAt, total, status }) => {
                  const dueDate = dueAt.split('+')[0]
                  const createdDate = createdAt.split('+')[0]

                  const createAtFormatted = dayjs(createdDate).format('DD/MM/YYYY')
                  const dueAtFormatted = dayjs(dueDate).format('DD/MM/YYYY')

                  return (
                    <tr
                      onClick={() => router.push(`/user/bills/${billId}/${invoiceId.code}?status=${status}`)}
                      key={invoiceId.code}
                      className='cursor-pointer'
                    >
                      <th className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {invoiceId.code}
                      </th>
                      <td className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {createAtFormatted}
                      </td>
                      <td className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        { dueAtFormatted }
                      </td>
                      <td className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        { moneyFormatter(total) }
                      </td>
                      <td className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {
                              status === 'COMPLETED'
                                ? (
                                <span className='py-1 px-1.5 text-white font-medium bg-green-600 rounded-lg'>
                                  Pago
                                </span>
                                  )
                                : null
                            }
                            {
                              status === 'PENDING'
                                ? (
                                <span className='py-1 px-1.5 text-gray-900 font-medium bg-yellow-500 rounded-lg'>
                                  Pendente
                                </span>
                                  )
                                : null
                            }
                            {
                              status === 'FAILED'
                                ? (
                                <span className='py-1 px-1.5 text-white font-medium bg-red-600 rounded-lg'>
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
    </>
  )
}

export default CardUserInvoices
