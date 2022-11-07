import { CustomInvoice } from 'components/Cards/CardUserInvoices'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useCallback } from 'react'

interface Props {
  invoices: CustomInvoice[]
}

const today = dayjs(new Date())

const CardNextEvents: React.FC<Props> = ({ invoices }) => {
  const getNextEvents = useCallback(() => {
    const newInvoices: CustomInvoice[] = []

    for (const invoice of invoices) {
      const { service: { eventDate }, status } = invoice

      if (today.isBefore(eventDate) && status === 'COMPLETED') {
        newInvoices.push(invoice)
      }
    }

    return newInvoices
  }, [invoices])

  const nextEvents = getNextEvents()

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-0 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-gray-700">
                Próximos Eventos
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <Link
                href='/prices'
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Criar
              </Link>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-auto md:overflow-hidden">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-4 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Evento
                </th>
                <th className="px-4 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Data
                </th>
                <th className="px-4 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                  Nº Convidados
                </th>
              </tr>
            </thead>
            {
              nextEvents[0]
                ? (
                  <tbody>
                    {
                      invoices.map(({ invoiceId, service }) => {
                        const { eventType, eventDate, guestsNumber } = service
                        const eventDateFormatted = dayjs(eventDate).format('DD/MM/YYYY')

                        return (
                          <tr key={invoiceId.code}>
                            <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              {eventType}
                            </th>
                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {eventDateFormatted}
                            </td>
                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {guestsNumber}
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                  )
                : (
                  <tbody>
                    <tr>
                      <th></th>
                      <td className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-xs text-gray-600 whitespace-nowrap p-4">
                        Sem evento
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                  )
            }
          </table>
        </div>
      </div>
    </>
  )
}

export default CardNextEvents
