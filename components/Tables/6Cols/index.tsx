import { textHighlighter } from '@components/Tables/utils/textHighlighter'
import React, { ReactNode } from 'react'
import { Table6ColRow } from 'ui-moz'

interface Header {
  col1: string
  col2: string
  col3: string
  col4: string
  col5: string
  col6: string
}

interface Props {
  label?: string | ReactNode
  header: Header
  data: Table6ColRow[]
  textHighlight?: boolean,
  tableNavigation: ReactNode
}

const Table4Cols: React.FC<Props> = ({ header, label, data, textHighlight, tableNavigation }) => {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div >
            <div className="w-full">
              <span className="text-sm text-slate-700">
                {label}
              </span>
            </div>
            <div className='w-full'>
              {tableNavigation}
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-5 bg-emerald-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {header.col1}
                </th>
                <th className="px-5 bg-emerald-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {header.col2}
                </th>
                <th className="px-5 bg-emerald-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {header.col3}
                </th>
                <th className="px-5 bg-emerald-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {header.col4}
                </th>
                <th className="px-5 bg-emerald-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {header.col5}
                </th>
                <th className="px-5 bg-emerald-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {header.col6}
                </th>
              </tr>
            </thead>
            <tbody>
              { data.map(({ col1, col2, col3, col4, col5, col6 }) => (
                <tr key={col1.value}>
                  <th className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                    {col1.value}
                  </th>
                  <td className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                    {col2}
                  </td>
                  <td
                    className={`
                      ${textHighlight && textHighlighter(col3.value)}
                      ${col3.className}
                      border-t-0 px-5 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4
                    `}
                  >
                    {col3.value}
                  </td>
                  <td
                    className={`
                      ${textHighlight && textHighlighter(col4.value)}
                      ${col4.className}
                      border-t-0 px-5 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4
                    `}
                  >
                    {col4.value}
                  </td>
                  <td className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                    {col5}
                  </td>
                  <td className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                    {col6}
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Table4Cols
