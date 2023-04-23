import getLanguage from '@common/Prices/lang/invoices/page'
import { getMonths } from '@utils/date/months'
import { moneyFormatter } from '@utils/number-formatter'
import { Bill } from 'bill'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'

interface Props {
  bills: Bill[]
  locale: string
}

const CardUserInvoices: React.FC<Props> = ({ bills, locale }) => {
  const lang = getLanguage(locale)
  const { push } = useRouter()
  const { header } = lang.invoice
  const { months, dateLocalizer } = getMonths(locale!)

  const getInvoices = useCallback(() => {
    const newInvoices = []
    for (const bill of bills) {
      const { id, invoices } = bill
      for (const invoice of invoices) {
        if (invoice.invoiceStatus === 'PENDING') {
          newInvoices.unshift({
            ...invoice,
            billId: id
          })
        } else {
          newInvoices.push({
            ...invoice,
            billId: id
          })
        }
      }
    }
    return newInvoices
  }, [bills])

  const newInvoices = getInvoices()

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-4 bg-green-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {header.col1}
                </th>
                <th className="px-4 bg-green-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {header.col2}
                </th>
                <th className="px-3 bg-green-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {header.col3}
                </th>
                <th className="px-3 bg-green-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {header.col4}
                </th>
                <th className="px-3 bg-green-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {header.col5}
                </th>
              </tr>
            </thead>
            <tbody>
              {
                newInvoices.map(({ billId, invoiceCode, eventType, eventDate, createdAt, invoiceStatus, total }) => {
                  const createdAtFormatted = dateLocalizer(createdAt, months)
                  const eventDateFormatted = dateLocalizer(eventDate, months)

                  return (
                    <tr
                      onClick={() => push(`/precos/invoice/${billId}?invoiceCode=${invoiceCode}`)}
                      key={invoiceCode}
                      className='cursor-pointer hover:bg-green-200'
                    >
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        {
                              invoiceStatus === 'PAID'
                                ? (
                                <span className='py-1 px-1.5 text-white font-medium bg-green-600 rounded-lg'>
                                  {lang.invoice.status.paid}
                                </span>
                                  )
                                : null
                            }
                            {
                              invoiceStatus === 'PENDING'
                                ? (
                                <span className='py-1 px-1.5 text-white font-medium bg-red-600 rounded-lg'>
                                  {lang.invoice.status.padding}
                                </span>
                                  )
                                : null
                            }
                            {
                              invoiceStatus === 'FAILED'
                                ? (
                                <span className='py-1 px-1.5 text-white font-medium bg-red-600 rounded-lg'>
                                  {lang.invoice.status.failed}
                                </span>
                                  )
                                : null
                            }
                      </td>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap font-semibold p-4 text-left">
                        {eventType}
                      </td>
                      <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        { eventDateFormatted }
                      </td>
                      <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        { createdAtFormatted }
                      </td>
                      <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        { moneyFormatter(total) }
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
