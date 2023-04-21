import logoImg from '@assets/img/logo-v2.svg'
import Image from 'next/image'
import React from 'react'

interface Props {
  isFooter?: boolean
}

const LogoImg: React.FC<Props> = ({ isFooter }) => (
  <div className="flex w-full h-full flex-shrink-0 items-center">
    <Image
      className={`${isFooter ? 'h-20 md:h-28' : 'h-16 md:h-20'}  w-auto`}
      src={logoImg}
      alt="Matola Ingadi"
    />
  </div>
)

export default LogoImg
