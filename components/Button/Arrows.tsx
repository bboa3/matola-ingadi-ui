import { BackwardIcon, ForwardIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const LeftControl: React.FC = () => (
  <div className='-ml-7 opacity-70 p-1.5 md:p-3 flex justify-center items-center bg-indigo-100 rounded-full' >
    <BackwardIcon className='w-7 h-7 text-indigo-600' />
  </div>
)

export const RightControl: React.FC = () => (
  <div className='-mr-7 opacity-70 p-1.5 md:p-3 flex justify-center items-center bg-indigo-100 rounded-full' >
    <ForwardIcon className='w-7 h-7 text-indigo-600' />
  </div>
)
