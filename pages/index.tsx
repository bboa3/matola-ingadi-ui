import { getLanguage } from '@common/Home/lang/page'
import SimpleLayout from '@components/Layout/MatolaIngadi/SimpleLayout'
import type { GetStaticProps } from 'next'

import { useRouter } from 'next/router'
import React from 'react'

interface Props {
}

const Home: React.FC<Props> = () => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)
  console.log(lang)

  return (
    <SimpleLayout
      title='Informação Económica, Financeira e Negócios em Moçambique - MozEconomia'
      description='Fornecendo informação económica e financeira para negócios e investimentos em Moçambique. Dados da economia Moçambicana para negócios, investimentos em Moçambique. Moz Economia'
      keywords='moçambique, mozeconomia, moz economia, economia moçambicana, negócios em moçambique, empreendedorismo, empreendedor, negócios, economia, informação financeira, investimento, investidor, notícias do mercado'
    >
      <div className='w-full lg:flex px-6 lg:px-20 mb-16 space-y-6 lg:space-y-0'>

      </div>
    </SimpleLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
    },
    revalidate: 600
  }
}

export default Home
