import { LeftControl, RightControl } from '@components/Button/Arrows'
import { Carousel } from 'flowbite-react'
import { Photo } from 'ingadi'
import Image from 'next/image'
import React from 'react'

interface Props {
  images: Photo[]
}

const CarouselGallery: React.FC<Props> = ({ images }) => {
  return (
    <Carousel
      leftControl={<LeftControl />}
      rightControl={<RightControl />}
      slideInterval={12000}
    >
      {
        images.map(({ url, alt }) => (
          <Image
            className="h-full w-full object-cover object-center"
            src={url}
            alt={alt}
            width={500}
            height={500}
          />
        ))
      }
    </Carousel>
  )
}

export default CarouselGallery
