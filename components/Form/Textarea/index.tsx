import React, { TextareaHTMLAttributes } from 'react'

export interface RadioItem {
  id: string | number
  name: string | number
}

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  rows?: number
  id: string
  error?: string
}

const Textarea: React.FC<Props> = ({ label, rows, id, error, ...i }) => {
  return (
    <div className='my-1'>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <textarea
          name={id}
          id={id}
          rows={rows || 4}
          className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500"
          {...i}
        />
      </div>
      <span className='h-5 block text-sm text-red-500'>{error || ''}</span>
    </div>
  )
}

export default Textarea
