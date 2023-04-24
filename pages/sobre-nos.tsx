import marriageCoupleImg from '@assets/img/about/couple-in-marriage.webp'
import ingadiImg from '@assets/img/about/matola-ingadi.webp'
import { getLanguage } from '@common/aboutUs/lang/page'
import { Button } from '@components/Button'
import SimpleLayout from '@components/Layout/MatolaIngadi/SimpleLayout'
import { createDate } from '@utils/date'
import { GetStaticProps } from 'next'
import Image from 'next/image'
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
    description='Organizamos eventos que caminham de mãos dadas com o amor, felicidade, amizade, carinho e companheirismo.'
    keywords='Matola Ingadi, Salão de Eventos, Casamentos, Aniversários'
  >
    <div className='w-full flex flex-col items-center min-h-screen mx-auto py-14 overflow-hidden'>
      <section className='w-full max-w-5xl px-6 lg:px-12 mb-24 space-y-6 lg:space-y-8'>
        <h1 className='text-4xl font-bold text-center'>{lang.h1}</h1>

        <div className='flex w-full'>
          <div className='hidden md:block w-80 mr-12 italic text-lg'>
            <h2>{lang.h2}</h2>
          </div>
          <div className='w-auto space-y-4'>
            <p>
              {lang.description.location}
            </p>
            <p>
              {lang.description.why}
            </p>
          </div>
        </div>
      </section>

      <section className='w-full px-6 lg:px-14 mb-14 space-y-6 lg:space-y-8'>
        <div
          className="w-full h-[60vh] md:h-[80vh] overflow-hidden text-center"
        >
          <Image
            src={ingadiImg}
            alt='Salão de eventos Matola Ingadi'
            className="h-full w-full object-cover object-center"
          />
        </div>
      </section>

      <section className='w-full md:grid grid-cols-2 gap-x-5 px-6 lg:px-14 mb-24 space-y-6 lg:space-y-0'>
        <div className='flex justify-center items-center text-center'>
            <p className='p-3 text-2xl font-medium italic'>
              {lang.description.team}
            </p>
        </div>
        <div
          className="w-full h-[60vh] md:h-[80vh] overflow-hidden text-center"
        >
          <Image
            src={marriageCoupleImg}
            alt='Equipe Matola Ingadi'
            className="h-full w-full object-cover object-center"
          />
        </div>
      </section>

      <section className='w-full flex  bg-white flex-col items-center justify-center text-center py-10'>
        <div className='w-full max-w-3xl'>
          <h1 className='text-4xl sm:text-5xl font-bold py-6'>{lang.chatTitle}</h1>
          <p>Matola J, Matola Cidade, Maputo, Moçambique.</p>
          <div className='w-full flex flex-col items-center justify-center text-tenter mt-6'>
            <span className='block mt-1'>+258 87 397 0401</span>
            <span className='block mb-3'>contacto@matolaingadi.co.mz</span>
            <Button solid asChild>
              <Link href='/contacto'>
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
