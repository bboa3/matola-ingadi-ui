import CarouselGallery from '@components/Carousel/CarouselGallery'
import { Photo } from 'ingadi'
import Image from 'next/image'
import React from 'react'

interface Props {
  images: Photo[]
}

const Gallery: React.FC<Props> = ({ images }) => (
  <>
    <div className='w-full h-[calc(100vh-10rem)] lg:hidden px-4 pt-3'>
      <CarouselGallery images={images} />
    </div>
    <div className="hidden md:block mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
        <Image
          src={images[0].url}
          alt={images[0].alt}
          width={300}
          height={300}
          className="h-full w-full object-cover object-center"
        />
      </div>
    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
      <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
        <Image
          src={images[1].url}
          alt={images[1].alt}
          width={300}
          height={300}
          className="h-full w-full object-cover object-center"
        />
      </div>
    <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <Image
                src={images[2].url}
                alt={images[2].alt}
                width={300}
                height={300}
                  className="h-full w-full object-cover object-center"
                />
        </div>
            </div>
            <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
          <Image
          src={images[3].url}
          alt={images[3].alt}
          width={300}
          height={300}
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  </>
)

export default Gallery
