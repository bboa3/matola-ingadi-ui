import { getLanguage } from '@common/verifyRequest/lang/page'
import Layout from '@components/Layout/MatolaIngadi/SimpleLayout'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  URL: string
}

const VerifyRequest: React.FC<Props> = ({ URL }) => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)

  return (
    <Layout
      robots='noindex nofollow'
      title='Salão de Eventos Matola Ingadi - Sua Conta'
      description='Organizamos eventos que caminham de mãos dadas com o amor, felicidade, amizade, carinho e companheirismo.'
      keywords='Matola Ingadi, Salão de Eventos, Casamentos, Aniversários'
    >
      <div className='flex min-h-full items-center justify-center py-24 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl border border-gray-600 rounded-md text-center p-9'>
          <h1 className='text-3xl'>{lang.h1}</h1>
          <p className='py-7'>{lang.p}</p>
          <p className=''><Link href={URL}>matolaingadi.co.mz</Link></p>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const URL = process.env.NEXTAUTH_URL

  return {
    props: {
      URL
    }
  }
}

export default VerifyRequest
