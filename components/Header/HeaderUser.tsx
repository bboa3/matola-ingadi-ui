import coupleImg from '@assets/img/couple-in-marriage.jpg'
import Image from 'next/image'

export default function HeaderStats () {
  return (
    <>
      {/* Header */}
      <div className="w-full bg-gray-900 md:pt-12">
        <div className="flex bg-gradient-to-tr from-indigo-600 relative justify-between items-center h-52 overflow-hidden mx-auto w-full">
          <Image
            width={500}
            height={500}
            className='w-full mix-blend-overlay h-auto absolute'
            src={coupleImg}
            alt='Casamento'
          />
        </div>
      </div>
    </>
  )
}
