import React, { TextareaHTMLAttributes } from 'react'

export interface RadioItem {
  id: string | number
  name: string | number
}

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  id: string
  error?: string
}

const Textarea: React.FC<Props> = ({ label, id, error, ...i }) => {
  return (
    <div className='my-4'>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <textarea
          name={id}
          id={id}
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...i}
        />
      </div>
      <span className='h-5 block text-sm text-red-500'>{error || ''}</span>
    </div>
  )
}

export default Textarea
