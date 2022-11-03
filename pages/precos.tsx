import Layout from '@components/Layout'
import { CheckIcon } from '@heroicons/react/24/outline'
import { httpFetch } from '@lib/fetch'
import { moneyFormatter } from '@utils/money-formatter'
import { Pricing } from 'ingadi'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'

interface Props {
  pricing: Pricing[]
}

const PricingPage: React.FC<Props> = ({ pricing }) => {
  return (
    <Layout
      title=''
      keywords=''
      description=''
    >
      <div className="w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className='w-full bg-gray-50 '>
          <div className='w-full flex justify-center bg-gray-900 px-3 py-6 sm:px-4 lg:px-6 rounded-t-md text-white'>
            <div className='w-full max-w-5xl h-4/5 relative'>
              <div className='absolute w-full'>
                <div className='text-center py-12 flex flex-col justify-center items-center'>
                  <p className='text-gray-300'>Preços</p>
                  <h1 className='font-bold text-5xl'>O Melhor Proco para o seu evento,</h1>
                  <p className='text-gray-300 pt-3'>para começar apenas selecione e faremos reserva da data do seu evento.</p>
                </div>
              </div>
              <div className='w-full mt-40 md:mt-16 relative -bottom-36 md:grid md:grid-cols-2 space-y-5 md:space-y-0 gap-4'>
                {
                  pricing.map(({ id, price, name, services }, index) => (
                    <div key={id} className='shadow-lg'>
                      <h2 className="sr-only">Descrição dos preços</h2>
                      <div className='py-6 md:py-8 px-6 lg:px-9 space-y-3 rounded-t-lg bg-white'>
                        <h3
                          className={`
                            w-20 p-1 font-medium text-center rounded-full
                            ${index === 0 ? 'bg-indigo-600' : 'bg-indigo-100 text-indigo-600'}
                          `}
                        >
                          {name}
                        </h3>
                        <div className='w-full flex items-end justify-start'>
                          <p className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
                            {moneyFormatter(price)}
                          </p>
                          <p className="text-base font-bold text-gray-500"> /Convidado</p>
                        </div>
                        <p className='text-gray-700 mt-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                      </div>

                      <div className='space-y-2 bg-slate-50 py-6 md:py-8 px-6 lg:px-9 rounded-b-lg'>
                        {services.map(({ name, description }) => (
                          <p key={name} className='text-gray-700 flex'>
                            <CheckIcon className='text-green-600 w-5 h-6 mr-1' aria-hidden="true" />
                            {description}
                          </p>
                        ))}

                        <div className='pt-5'>
                          <Link
                            href={`/reservar-evento/${id}`}
                            className='w-full h-12 flex justify-center items-center rounded-lg bg-gray-900 hover:bg-gray-800'
                          >
                            Fazer reserva
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className='w-full h-1/5 mb-36 bg-gray-50'>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await httpFetch.get('/services')

  return {
    props: {
      pricing: data
    },
    revalidate: 25 * 60 * 60
  }
}

export default PricingPage
