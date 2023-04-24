import EventHall from '@common/Prices/EventHall'
import getLanguage from '@common/Prices/lang/page'
import { Button } from '@components/Button'
import SimpleLayout from '@components/Layout/MatolaIngadi/SimpleLayout'
import { billingHttpFetch } from '@lib/fetch'
import { Pricing } from 'bill'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  pricing: Pricing[]
}

const PricingPage: React.FC<Props> = ({ pricing }) => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)

  return (
    <SimpleLayout
      title='Preços | Matola Ingadi'
      description='Preço dos serviços da Matola Ingadi. Organizamos eventos que caminham de mãos dadas com o amor, felicidade, amizade, carinho e companheirismo.'
      keywords='Matola Ingadi, Salão de Eventos, Casamentos, Aniversários'
    >
      <div className='flex flex-col min-h-full items-center justify-center pb-12 pt-4 md:pt-6 px-4 sm:px-6 lg:px-8'>
          <EventHall pricing={pricing} locale={locale!} />

          <section className='w-full flex bg-white flex-col items-center justify-center text-center md:pt-52 lg:pt-48'>
            <div className='w-full max-w-3xl'>
              <h1 className='text-3xl lg:text-4xl font-bold py-6'>{lang.contact.title}</h1>
              <p>Q.07, Matola J, Cidade De Matola, Moçambique</p>
              <div className='w-full flex flex-col items-center justify-center text-tenter mt-6'>
                <span className='block mt-1'>+258 87 397 0401</span>
                <span className='block mb-3'>matola.ingadi@gmail.com</span>
                <Button solid asChild>
                  <Link href='/visite-nos'>
                    {lang.visitButton}
                  </Link>
                </Button>
              </div>
            </div>
          </section>
      </div>
    </SimpleLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { data } = await billingHttpFetch.get(`/billing/pricing/${locale}`)

  return {
    props: {
      pricing: data
    }
  }
}

export default PricingPage
