import getLanguage from '@common/Prices/lang/payment/page'
import { getMonths } from '@utils/date/months'
import { moneyFormatter } from '@utils/number-formatter'
import { Transaction } from 'bill'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  transactions: Transaction[]
  locale: string
  invoiceCode: string
  billId: string
}

const CardUserInvoices: React.FC<Props> = ({ transactions, invoiceCode, billId, locale }) => {
  const lang = getLanguage(locale)
  const { push } = useRouter()
  const { header, type } = lang.transaction
  const { months, dateLocalizer } = getMonths(locale!)

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-4 bg-green-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {header.col5}
                </th>
                <th className="px-4 bg-green-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {header.col1}
                </th>
                <th className="px-3 bg-green-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {header.col2}
                </th>
                <th className="px-3 bg-green-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {header.col3}
                </th>
                <th className="px-3 bg-green-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {header.col4}
                </th>
              </tr>
            </thead>
            <tbody>
              {
                transactions.map(transaction => {
                  const { id, transactionType, dueAt, total, invoicePercentage, status } = transaction
                  const dueAtFormatted = dateLocalizer(dueAt, months)

                  return (
                    <tr
                      onClick={() => push(`/precos/invoice/payment/${billId}?invoiceCode=${invoiceCode}&transactionId=${id}`)}
                      key={id}
                      className='cursor-pointer hover:bg-green-200'
                    >
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
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
                                <span className='py-1 px-1.5 text-white font-medium bg-red-600 rounded-lg'>
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
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap font-semibold p-4 text-left">
                        {transactionType === 'date-reservation' ? type.dateReservation : ''}
                        {transactionType === 'remaining-payment' ? type.remainingPayment : ''}
                      </td>
                      <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        { dueAtFormatted }
                      </td>
                      <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        { moneyFormatter(total) }
                      </td>
                      <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        { invoicePercentage }%
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
