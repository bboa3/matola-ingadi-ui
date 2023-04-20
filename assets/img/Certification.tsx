import RectangleIcon from '@assets/icons/Rectangle'
import certificationImg from '@assets/img/MozEconomia_Certificado_Pelo_Banco_de_Moçambique.jpg'
import Image from 'next/image'
import React from 'react'

const MozEconomiaCertificationImg: React.FC = () => (
  <div className='w-[12rem] lg:w-[26rem] h-[12rem] lg:h-[26rem] relative'>
    <RectangleIcon className='w-[110%] h-[110%] fill-emerald-500 filter blur-3xl opacity-20 absolute -right-[16%] top-[9%]' />
    <RectangleIcon className='w-[110%] h-[110%] fill-emerald-500 filter blur-3xl opacity-20 absolute -left-[25%] -top-[9%]' />
    <Image
      src={certificationImg}
      className='w-11/12 h-auto absolute left-[50%] -ml-[50%] top-[63%] lg:top-[70%] -mt-[50%]'
      alt='MozEconomia Certificado Pelo Banco de Moçambique'
      priority
    />
  </div>
)

export default MozEconomiaCertificationImg
