import PersonIcon from '@mui/icons-material/Person'
import Image from 'next/image'
import React from 'react'

interface Props {
  avatar?: string
}

const UserImg: React.FC<Props> = ({ avatar }) => {
  if (avatar) {
    return (
      <span className='h-6 w-6 border-2 border-green-500 flex justify-center items-center bg-green-300 rounded-[100%]'>
        <Image
          src={avatar}
          height={300}
          width={300}
          alt='User'
          className='w-full h-full rounded-[100%]'
        />
      </span>
    )
  }

  return (
    <span className='h-6 w-6 border border-slate-900 flex justify-center items-center p-0.5 bg-green-300 rounded-[100%]'>
      <PersonIcon
        className='w-full h-full text-slate-900'
        aria-hidden="true"
      />
    </span>
  )
}

export default UserImg
