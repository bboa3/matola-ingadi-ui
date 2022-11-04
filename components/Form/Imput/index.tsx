import React, { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  type: string
  id: string
  error?: string
}

const Input: React.FC<Props> = ({ label, id, error, type, ...i }) => {
  return (
    <div className='space-y-2'>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      { error ? <span className='h-2 text-sm text-red-500'>{error}</span> : null}
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          name={id}
          type={type}
          id={id}
          className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          {...i}
        />
      </div>
    </div>
  )
}

export default Input
