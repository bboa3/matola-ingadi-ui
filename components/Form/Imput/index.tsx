import React, { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  type: string
  id: string
  prefix?: string
  error?: string
}

const Input: React.FC<Props> = ({ label, id, error, prefix, type, ...i }) => {
  return (
    <div className='my-4'>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">{prefix}</span>
        </div>
        <input
          name={id}
          type={type}
          id={id}
          className={`
            ${error ? 'border-red-300' : 'border-gray-300'}
            block w-full rounded-md pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
          `}
          {...i}
        />
      </div>
      <span className='h-5 block text-sm text-red-500'>{error || ''}</span>
    </div>
  )
}

export default Input
