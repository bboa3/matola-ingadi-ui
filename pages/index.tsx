import GalleryComponent from '@common/Home/Gallery'
import { getLanguage } from '@common/Home/lang/page'
import { Button } from '@components/Button'
import CarouselTestimonial from '@components/Carousel/CarouselTestimonial'
import SimpleLayout from '@components/Layout/MatolaIngadi/SimpleLayout'
import { CheckIcon } from '@heroicons/react/24/outline'
import { Pricing } from 'bill'
import Link from 'next/link'

import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  pricing: Pricing
}

const Home: React.FC<Props> = () => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)

  return (
    <SimpleLayout
      title='Salão de Eventos Matola Ingadi'
      description='Organizamos eventos que caminham de mãos dadas com o amor, felicidade, amizade, carinho e companheirismo.'
      keywords='Matola Ingadi, Salão de Eventos, Casamentos, Aniversários'
    >
      <div className='w-full flex flex-col items-center pt-16 px-4 lg:px-20 mb-16'>
        <div className='w-full max-w-4xl flex flex-col items-center text-center space-y-6'>
          <h1 className='sr-only'>Salão de Eventos Matola Ingadi</h1>
          <h2 className='font-bold text-5xl'>{lang.h1}</h2>
          <p>{lang.description}</p>
          <Button solid>
            <Link href='/precos' >
              <span className=' min-w-[11rem] block'>{lang.bookingButton}</span>
            </Link>
          </Button>
        </div>
      </div>

      <div
        className="relative min-h-[calc(100vh-3rem)] overflow-hidden mb-16 rounded-lg bg-cover bg-center bg-no-repeat p-12 text-center"
        style={{ backgroundImage: 'url(./img/matola-ingadi.webp)' }}
      >
        <div className="absolute bottom-0 left-0 bg-green-950/70 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
          <div className="flex h-full items-center justify-center">
            <div className="text-white p-6">
              <h2 className="mb-6 text-5xl text-center font-bold text-white">{lang.highlightsTitle}</h2>
              <div className='md:grid grid-cols-2 gap-6 text-left space-y-1.5'>
                <ul className='space-y-1.5'>
                  {
                    lang.highlights.groupOne.map((highlight, i) => (
                      <li key={`highlight-one-${i}`} className="text-white flex items-center">
                        <span className='w-7 h-7 block bg-green-500 p-0.5 rounded-full mr-1.5'>
                          <CheckIcon className='w-full h-full font-bold text-white' aria-hidden="true" />
                        </span>
                        <span className='block'>{highlight}</span>
                      </li>
                    ))
                  }
                </ul>
                <ul className='space-y-1.5'>
                  {
                    lang.highlights.groupTwo.map((highlight, i) => (
                      <li key={`highlight-two-${i}`} className="text-white flex items-center">
                        <span className='w-7 h-7 block bg-green-500 p-0.5 rounded-full mr-1.5'>
                          <CheckIcon className='w-full h-full font-bold text-white' aria-hidden="true" />
                        </span>
                        <span className='block'>{highlight}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>

              <div className='flex flex-col items-center mt-20 space-y-3'>
                <Button solid>
                  <Link href='/precos' >
                    <span className=' min-w-[11rem] block'>{lang.bookingButton}</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full lg:flex px-0 lg:px-20 mb-16 space-y-6 lg:space-y-0'>
        <GalleryComponent images={lang.photos} />
      </div>
      <div className='w-full px-4 pt-16 pb-16 sm:px-6'>
        <h2 className='text-center font-bold text-4xl p-3'>{lang.testimonial.title}</h2>
        <CarouselTestimonial />
      </div>
    </SimpleLayout>
  )
}

export default Home
