import getLanguage from '@common/Prices/lang/bills/page'
import { Period, Pricing } from 'bill'
import clsx from 'clsx'
import React from 'react'

interface Props {
  locale: string
  pricing: Pricing
  period: Period
  setPeriod: React.Dispatch<React.SetStateAction<Period>>
}

const PeriodSelect: React.FC<Props> = ({ locale, pricing, setPeriod, period }) => {
  const lang = getLanguage(locale)
  const yearDiscount = pricing.discount.period.find(({ id }) => id === 'year')!

  return (
    <div className="w-64 flex mx-2 mt-2 rounded-full bg-slate-100">
      <div
        className={clsx('flex-1 py-1 my-2 ml-2 text-center rounded-full', {
          'bg-white': period === 'month'
        })}
      >
        <button
          className={'w-full text-sm cursor-pointer select-none focus:outline-none text-black font-medium'}
          onClick={() => {
            setPeriod('month')
          }}
        >
          {lang.form.billPeriods.month}
        </button>
      </div>

      <div
        className={clsx('flex-1 py-1 my-2 mr-2 text-center rounded-full', {
          'bg-white': period === 'year'
        })}
      >
        <button
          className={'w-full text-sm cursor-pointer select-none focus:outline-none text-black font-medium'}
          onClick={() => {
            setPeriod('year')
          }}
        >
          {lang.form.billPeriods.year}
          <span className="ml-1 bg-gradient-to-tr from-emerald-500 to-emerald-900 bg-clip-text text-transparent">
            {lang.form.save} {yearDiscount.percentage}%
          </span>
        </button>
      </div>
    </div>
  )
}

export default PeriodSelect
