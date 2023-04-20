import mozBlogImg from '@assets/img/mocambique-blog-de-economia-e-negocios.png'
import Image from 'next/image'
import React from 'react'

interface Props {
}

const Highlight: React.FC<Props> = () => {
  return (
    <section className='hidden lg:block w-1/4 h-full relative top-0 left-0 text-white'>
      <div className='w-full h-[95vh] rounded-xl'>
        <Image
          width={500}
          height={900}
          className='h-full rounded-xl'
          src={mozBlogImg}
          alt='Moçambique blog de economia e negócios'
          priority
        />
      </div>
    </section>
  )
}

export default Highlight
