import callCenterImg from '@assets/img/call-center.png'
import { Button } from '@components/Button'
import SimpleLayout from '@components/Layout/MatolaIngadi/SimpleLayout'
import getLanguage from 'common/Contact/SentMessage/lang/page'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const CreateBillPage: React.FC = () => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)

  return (
    <SimpleLayout
      robots='noindex nofollow'
      title='Preços | Matola Ingadi'
      description='Preço dos serviços da Matola Ingadi'
      keywords='moçambique, economia, dados, finança, comércio, mercado, capital, despesas, Hipoteca, dinheiro'
    >
      <div className='flex flex-col md:flex-row min-h-full'>
        <section className='w-full md:w-1/2 h-[60vh] md:h-screen text-white'>
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <div className='w-full h-full relative flex justify-center bg-gradient-to-tr from-slate-900 to-green-900 px-3 sm:px-4 lg:px-6'>
              <div className='w-2/3 h-full relative flex justify-center items-center'>
                <Image
                  width={500}
                  height={500}
                  className='rounded-[100%] mix-blend-overlay h-auto absolute'
                  src={callCenterImg}
                  alt='Linha do cliente da Matola Ingadi'
                  priority
                />
                <h1 className='w-48 h-fit mt-6 absolute bottom-8 md:bottom-36 -right-9 md:-right-20 px-3 py-2 bg-green-500 rounded-md'>
                  {lang.h1.text1}
                  <span className='text-2xl font-bold'> {lang.h1.text2} </span>
                  {lang.h1.text3}
                  <span className='text-2xl font-bold'> {lang.h1.text4}</span>
                </h1>
              </div>
            </div>
          </div>
        </section>

        <section className='w-full md:w-1/2 md:h-screen text-slate-900 mb-8'>
          <div className="w-full mt-3 max-w-2xl p-3 md:p-12">
            <p className='text-3xl font-bold'>
              {lang.h2.text1}
              <span className='text-green-500'> {lang.h2.text2}</span>
            </p>
            <p className='text-base text-slate-800 mt-3 mb-2'>{lang.description}</p>
            <Button asChild>
              <Link href='/'>
                {lang.homepage} <span className='text-xl' aria-hidden="true">&rarr;</span>
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </SimpleLayout>
  )
}

export default CreateBillPage
