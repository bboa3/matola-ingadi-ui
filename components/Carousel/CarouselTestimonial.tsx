import TestimonialIcon from '@assets/icon/Testimonial'
import { LeftControl, RightControl } from '@components/Button/Arrows'
import { Testimonial } from 'design'
import { Carousel } from 'flowbite-react'
import Image from 'next/image'
import React from 'react'

interface Props {
  testimonials: Testimonial[]
}

const CarouselTestimonial: React.FC<Props> = ({ testimonials }) => {
  return (
    <Carousel
      leftControl={<LeftControl />}
      rightControl={<RightControl />}
      slideInterval={12000}
    >
      {
        testimonials.map(({ name, description, eventType, image }) => (
          <div key={name} className='relative md:flex md:justify-center w-full border border-gray-100 overflow-hidden rounded-lg'>
            <div className='absolute top-0 -left-3 w-64 h-56'>
                <TestimonialIcon className="w-32 opacity-25 text-indigo-300" />
            </div>

            <div className='absolute bottom-0 md:right-0 hero-pattern w-24 h-24 md:w-32 md:h-32'></div>

            <div className='min-h-[24rem] pt-32 pb-12 px-6 md:px-12 md:max-w-6xl'>
              <p className='md:text-lg'>
                {description}
              </p>

              <div className='pt-7 flex justify-end md:justify-start items-center space-x-3'>
                <div className='text-end md:hidden'>
                  <p>{name}</p>
                  <p className='text-indigo-600'>Evento, {eventType}</p>
                </div>
                <div>
                  <div className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Abrir Perfil</span>
                    <Image
                      className="h-12 w-12 rounded-full"
                      src={ image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                      alt=""
                      width={500}
                      height={500}
                    />
                  </div>
                </div>
                <div className='hidden md:block text-start'>
                  <p>{name}</p>
                  <p className='text-indigo-600'>Evento, {eventType}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </Carousel>
  )
}

export default CarouselTestimonial
