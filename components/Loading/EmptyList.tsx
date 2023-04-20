import searchEmptyImg from '@assets/img/search-empty.gif'
import Image from 'next/image'
import React from 'react'

const EmptyList: React.FC = () => (
  <div className='flex justify-center'>
    <Image
      width={900}
      height={900}
      className='h-full max-w-xs'
      src={searchEmptyImg}
      alt='Blog de Negócios e investimentos em Moçambique'
    />
  </div>
)

export default EmptyList
