import getLanguage from '@common/Prices/lang/invoices/page'
import CardUserInvoices from '@components/Cards/CardUserInvoices'
import SimpleLayout from '@components/Layout/MatolaIngadi/SimpleLayout'
import { billingHttpFetch } from '@lib/fetch'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { cookiesName, nextAuthUrl } from '@utils/env'
import { Bill } from 'bill'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  token: string
  bills: Bill[]
}

const InvoicesPage: React.FC<Props> = ({ bills }) => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)
  console.log(lang)

  return (
    <SimpleLayout
      robots='noindex nofollow'
      title='Preços | Matola Ingadi'
      description='Preço dos serviços da Matola Ingadi. Organizamos eventos que caminham de mãos dadas com o amor, felicidade, amizade, carinho e companheirismo.'
      keywords='Matola Ingadi, Salão de Eventos, Casamentos, Aniversários'
    >
      <div className='w-full flex flex-col justify-center items-center pb-8 pt-14 px-9 sm:px-6 lg:px-8'>
        <div className='w-full max-w-5xl'>
          <div className=''>
            <div className='my-6'>
              <h1 className='text-2xl font-semibold'></h1>
              <p className='text-sm my-1 max-w-4xl text-gray-600'>
                {lang.splitInvoiceDescription.text1}
                <span className='font-bold'> 25% </span>
                {lang.splitInvoiceDescription.text2}
                <span className='font-bold'> 75% </span>
                {lang.splitInvoiceDescription.text3}
              </p>
            </div>
            <CardUserInvoices
              locale={locale!}
              bills={bills}
            />
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, locale, query } = context
  const { resolvedUrl } = query

  const token = req.cookies[cookiesName]
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session || !token) {
    return {
      redirect: {
        destination: `login?callbackUrl=${nextAuthUrl}/${locale}${resolvedUrl}`,
        permanent: false
      }
    }
  }

  const { data: bills } = await billingHttpFetch.get('/billing/', {
    headers: { Authorization: `beaer ${token}` }
  })

  return {
    props: {
      token,
      bills
    }
  }
}

export default InvoicesPage
