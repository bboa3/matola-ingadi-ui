import WhatsAppIcon from '@assets/icons/WhatsApp'
import Link from 'next/link'
import React from 'react'

interface Props {
  locale: string
}

const ChatBot: React.FC<Props> = ({ locale }) => {
  return (
    <Link
      href='https://wa.me/258873970401'
      target="_blank"
      rel="noreferrer"
      className='fixed right-3 bottom-3 md:right-10 md:bottom-6 z-20 rounded-full w-12 h-12 md:w-14 md:h-14 bg-green-600 hover:bg-green-500 p-2.5 focus:outline-none focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-opacity-75'
    >
      <WhatsAppIcon className='w-full h-full text-white fill-white' aria-hidden="true" />
    </Link>
  )
}

export default ChatBot
