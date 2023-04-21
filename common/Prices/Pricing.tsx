import { Button } from '@components/Button'
import { CheckIcon } from '@heroicons/react/24/outline'
import { moneyFormatter } from '@utils/number-formatter'
import { Pricing } from 'bill'
import getLanguage from 'common/Prices/lang/page'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  pricing: Pricing
}

const PricingComponent: React.FC<Props> = ({ pricing }) => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)
  const { id, name, services, price } = pricing

  return (
    <div className='h-fit shadow-lg rounded-lg relative overflow-hidden'>
      <h2 className="sr-only">Descrição dos preços</h2>
      <div className='py-6 md:py-8 px-6 lg:px-9 space-y-3 rounded-t-lg bg-white'>
        <h3 className='w-fit py-1 px-2 text-2xl font-bold text-center rounded-full'>
          {name}
        </h3>
        <p className='text-gray-500 mt-3'>
          {id === lang.pricing.standard.id ? lang.pricing.standard.description : ''}
          {id === lang.pricing.premium.id ? lang.pricing.premium.description : ''}
        </p>
        <p className='w-full flex items-end justify-start'>
          <span className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
            {moneyFormatter(price)}
          </span>
          <span className="text-base font-bold text-slate-500"> {lang.per}</span>
        </p>
        <div className='pt-5 flex justify-center items-center'>
          <Button solid asChild>
            <Link href={`/precos/${id}`}>
              <span className='w-44 text-center'>{lang.startButton} {name}</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className='space-y-2 bg-slate-50 py-6 md:py-8 px-6 lg:px-9 rounded-b-lg'>
        {services.map(({ description }, index) => (
          <p key={`${index}-service`} className='text-slate-700 flex'>
            <CheckIcon className='text-emerald-500 w-5 h-6 mr-1' aria-hidden="true" />
            {description}
          </p>
        ))}
      </div>
    </div>
  )
}

export default PricingComponent
