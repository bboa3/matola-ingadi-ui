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
    <div className='my-1 w-full min-w-[8rem] xl:min-w-[9rem]'>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          name={id}
          type={type}
          id={id}
          className={`
            ${error ? 'border-red-300' : 'border-slate-300'}
            block w-full border-2 rounded-md px-3 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm
          `}
          {...i}
        />
      </div>
      <span className='h-5 block text-sm text-red-500'>{error || ''}</span>
    </div>
  )
}

export default Input
