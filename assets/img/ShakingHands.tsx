import RectangleIcon from '@assets/icons/Rectangle'
import businessImg from '@assets/img/empresário-moçambicano.webp'
import Image from 'next/image'
import React from 'react'

const ShakingHandsImg: React.FC = () => (
  <div className='w-[12rem] lg:w-[26rem] h-[12rem] lg:h-[26rem] relative'>
    <RectangleIcon className='w-[110%] h-[110%] fill-emerald-500 filter blur-3xl opacity-20 absolute -right-[16%] top-[9%]' />
    <RectangleIcon className='w-[130%] h-[130%] fill-emerald-300 filter blur-0 opacity-5 absolute -right-[3%] -top-[13%]' />
    <RectangleIcon className='w-[120%] h-[120%] fill-emerald-500 rotate-0 absolute -right-[23%] -top-[13%]' />
    <Image
      src={businessImg}
      className='w-9/12 h-auto absolute bottom-[10%] right-[10%]'
      alt='Aperto De Mão Entre Pessoas De Negócios em Moçambique'
      priority
    />
    <div className='bg-emerald-500 w-full h-[16%] -rotate-[6deg] absolute -right-[10%] bottom-[7%]'></div>
  </div>
)

export default ShakingHandsImg
