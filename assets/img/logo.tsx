import logoImg from '@assets/img/logo-v2.svg'
import Image from 'next/image'

const LogoImg = () => (
  <div className="flex w-full h-full flex-shrink-0 items-center">
    <Image
      className="h-16 md:h-20 w-auto"
      src={logoImg}
      alt="Matola Ingadi"
    />
  </div>
)

export default LogoImg
