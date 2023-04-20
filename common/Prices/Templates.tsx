import getLanguage from '@common/Prices/lang/page'
import PricingComponent from '@common/Prices/Pricing'
import { activityFilter } from '@common/Prices/utils/activity-filter'
import { Pricing } from 'bill'
import React from 'react'

interface Props {
  pricing: Pricing[]
  locale: string
}

const Templates: React.FC<Props> = ({ pricing, locale }) => {
  const consultancyTemplates = activityFilter({ pricing, activityId: 'excel-and-docs-templates' })
  const lang = getLanguage(locale!)

  return (
    <section className='w-full text-white'>
      <div className='w-full h-full flex flex-col items-center justify-center md:px-5 pb-6 pt-5 lg:pb-12'>
        <div className='w-full relative flex justify-center bg-gradient-to-tr from-slate-900 to-emerald-900 px-4 lg:px-6 rounded-md text-white'>
          <div className='w-full max-w-5xl h-4/5'>
            <div className='w-full'>
              <div className='md:text-center pt-9 md:pt-12 flex flex-col justify-center items-center'>
                <h1 className='font-bold text-4xl md:text-5xl text-white'>{lang.consultancyTemplates.title.h1}</h1>
                <p className='text-gray-300 pt-3'>{lang.consultancyTemplates.title.p2}</p>
              </div>
            </div>
            <div className='w-full md:h-96 relative -bottom-9 md:-bottom-12 md:grid md:grid-cols-3 space-y-5 md:space-y-0 gap-4'>
            {
              consultancyTemplates.map(price => (
                <div key={price.id} className='w-full'>
                  <PricingComponent pricing={price} />
                </div>
              ))
            }
            </div>
          </div>
        </div>
        <div className='w-full h-1/5 mb-36 bg-gray-50'></div>
      </div>
    </section>
  )
}

export default Templates
