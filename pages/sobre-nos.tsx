import LogoIcon from '@assets/icons/icon'
import RectangleIcon from '@assets/icons/Rectangle'
import MozEconomiaCertificationImg from '@assets/img/Certification'
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

const AboutUs: React.FC<Props> = ({ age }) => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)

  return (
  <SimpleLayout
    title='Quem Somos'
    description='Fornecendo informação económica e financeira para negócios e investimentos em Moçambique. Dados da economia Moçambicana para negócios, investimentos em Moçambique.'
    keywords='moçambique, economia, dados, finança, comércio, mercado, capital, despesas, Hipoteca, dinheiro'
  >
    <div className='w-full min-h-screen mx-auto overflow-hidden'>
        <section className='w-full bg-white flex items-center justify-center px-4 sm:px-6 py-16 lg:py-24'>
          <div className='w-full h-48 max-w-4xl flex justify-between items-center'>
            <div className='w-[32%] lg:w-[31%] h-full flex justify-center items-center rounded-xl shadow-xl border border-slate-50'>
              <p className='w-full flex justify-center flex-col items-center text-center'>
                <span className='text-green-500 text-5xl'>3</span>
                <span className='w-2 h-2 my-1.5 bg-green-500 rounded-[50%]'></span>
                <span className='w-full break-words'>{lang.partners}</span>
              </p>
            </div>
            <div className='w-[32%] lg:w-[31%] h-full flex justify-center items-center rounded-xl shadow-xl border border-slate-50'>
              <p className='w-full flex justify-center flex-col items-center text-center'>
                <span className='text-green-500 text-5xl'>+100</span>
                <span className='w-2 h-2 my-1.5 bg-green-500 rounded-[50%]'></span>
                <span className='w-full break-words'>{lang.indicators}</span>
              </p>
            </div>
            <div className='w-[32%] lg:w-[31%] h-full flex justify-center items-center rounded-xl shadow-xl border border-slate-50'>
              <p className='w-full flex justify-center flex-col items-center text-center'>
                <span className='text-green-500 text-5xl'>{age}</span>
                <span className='w-2 h-2 my-1.5 bg-green-500 rounded-[50%]'></span>
                <span className='w-full break-words'>{lang.age}</span>
              </p>
            </div>
          </div>
        </section>

        <section className='w-full flex px-4  bg-white sm:px-6 justify-center items-center py-9 lg:py-20'>
          <div className='w-full max-w-3xl flex flex-col lg:flex-row lg:divide-x'>
            <div className='h-full lg:w-1/5 text-center'>
              <span className='font-bold text-4xl lg:hidden'>{lang.whyTitle}</span>
              <div className='w-full flex justify-center my-3 lg:pr-6 '>
                <div className='w-24 lg:w-full opacity-25'>
                  <LogoIcon />
                </div>
              </div>
            </div>
            <div className='w-full lg:w-11/12 text-center lg:text-left lg:pl-6 space-y-3 leading-relaxed'>
              <h2 className='font-bold text-4xl hidden lg:block'>{lang.whyTitle}</h2>
              {
                lang.whyDescription.map((description) => (
                  <p>{description}</p>
                ))
              }
            </div>
          </div>
        </section>

        <section className='w-full lg:flex justify-between px-6 lg:px-20 mb-24 space-y-6 lg:space-y-0'>
          <div className='w-full lg:w-1/2 flex justify-center'>
            <MozEconomiaCertificationImg />
          </div>
          <div className='w-full flex flex-1 flex-col justify-center lg:w lg:pt-12'>
            <h2 className='text-2xl leading-10'>
              {lang.certified.h2}
            </h2>
            <p className='text-lg leading-9'>
              {lang.certified.description}
              .
            </p>
            <div className='mt-6'>
              <Button asChild >
                <a download href='https://mozeconomia.co.mz/pdf/MozEconomia_Certificado_Pelo_Banco_de_Mo%C3%A7ambique.pdf'>
                  {lang.certified.downloadButton}
                </a>
              </Button>
            </div>
          </div>
          <span className='hidden lg:block w-2/12 h-full relative'>
            <RectangleIcon className='w-[40vw] h-[40vw] stroke-green-900/50 stroke-[0.20] fill-none rotate-[189deg] absolute -left-[30%] top-0' />
          </span>
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
  const mozEconomiaBirthDay = createDate(new Date(2022, 8, 23))
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
