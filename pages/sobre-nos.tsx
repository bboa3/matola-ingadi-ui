import { getLanguage } from '@common/aboutUs/lang/page'
import { Button } from '@components/Button'
import SimpleLayout from '@components/Layout/MatolaIngadi/SimpleLayout'
import { createDate } from '@utils/date'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  age: number
}

const AboutUs: React.FC<Props> = () => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)

  return (
  <SimpleLayout
    title='Quem Somos'
    description='Fornecendo informação económica e financeira para negócios e investimentos em Moçambique. Dados da economia Moçambicana para negócios, investimentos em Moçambique.'
    keywords='moçambique, economia, dados, finança, comércio, mercado, capital, despesas, Hipoteca, dinheiro'
  >
    <div className='w-full flex flex-col items-center min-h-screen mx-auto py-14 overflow-hidden'>
      <section className='w-full max-w-5xl px-6 lg:px-12 mb-24 space-y-6 lg:space-y-8'>
        <h1 className='text-4xl font-bold text-center'>Bem vindo a Matola Ingadi</h1>

        <div className='flex w-full'>
          <div className='hidden md:block w-80 mr-12 italic text-lg'>
            <h2>Sobre nós. Nossa casa.</h2>
          </div>
          <div className='w-auto space-y-4'>
            <p>
              Salão de eventos Matola Ingadi, nascido em 2015, localiza-se na Matola depois do Externato Cantinho do Céu e Condomínio Niketche vindo pelo lado da Shopripe da Matola para Malhapsene. Estamos cercado pelo verde do rio Matola, de onde é possível ver a paisagem verde junto com o cair do sol estando no nosso salão.
            </p>
            <p>
              A palavra Ingadi provem do Zulu que significa jardim, Matola Ingadi é mais do que um salão de eventos é um jardim onde sonhos são realizados, onde os nossos clientes na companhia daqueles que mais amam realizam os seus eventos e ficam com a memória do verde do nosso jardim para sempre marcada nas suas mentes.
              Matola Ingadi inspira tranquilidade, traz uma fusão entre a natureza e o modernismo.
            </p>
          </div>
        </div>
      </section>

      <section className='w-full px-6 lg:px-14 mb-14 space-y-6 lg:space-y-8'>
        <div
          className="relative w-full min-h-[60vh] md:min-h-[80vh] overflow-hidden mb-16 bg-cover bg-center bg-no-repeat p-12 text-center"
          style={{ backgroundImage: 'url(./img/matola-ingadi.webp)' }}
        >
        </div>
      </section>

      <section className='w-full md:grid grid-cols-2 gap-x-5 px-6 lg:px-14 mb-24 space-y-6 lg:space-y-0'>
        <div className='flex justify-center items-center text-center'>
            <p className='p-3 text-2xl font-medium italic'>
              Todo o nosso esforço é para garantir que o cliente saia feliz do nosso estabelecimento e que venha mais vezes.
            </p>
        </div>
        <div
          className=" min-h-[60vh] md:min-h-[80vh] overflow-hidden bg-cover bg-center bg-no-repeat p-12 text-center"
          style={{ backgroundImage: 'url(./img/couple-in-marriage.webp)' }}
        >
        </div>
      </section>

      <section className='w-full flex  bg-white flex-col items-center justify-center text-center py-10'>
        <div className='w-full max-w-3xl'>
          <h1 className='text-4xl sm:text-5xl font-bold py-6'>{lang.chatTitle}</h1>
          <p>Avenida 25 de Setembro, nº 1695, 1º andar, Maputo Cidade, Maputo 1102, Moçambique.</p>
          <div className='w-full flex flex-col items-center justify-center text-tenter mt-6'>
            <span className='block mt-1'>+258 87 44 44 689</span>
            <span className='block mb-3'>contacto@mozeconomia.co.mz</span>
            <Button solid asChild>
              <Link href='https://calendly.com/mozeconomia/30min?month=2022-07' target="_blank" rel="noreferrer">
                {lang.chatButton}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  </SimpleLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const mozEconomiaBirthDay = createDate(new Date(2015, 0, 1))
  const now = createDate(new Date())

  const age = now.diff(mozEconomiaBirthDay, 'month') + 1

  return {
    props: {
      age
    },
    revalidate: 24 * 60 * 60
  }
}

export default AboutUs
