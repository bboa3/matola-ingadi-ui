import React, { InputHTMLAttributes } from 'react'

export interface RadioItem {
  id: string
  name: string
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  items: RadioItem[]
  selected: RadioItem
  setSelected: React.Dispatch<React.SetStateAction<RadioItem>>
  name: string
  isFlex?: boolean
  error?: string
}

const Radio: React.FC<Props> = ({ label, name, isFlex, error, items, selected, setSelected, ...i }) => (
  <fieldset className='space-y-2'>
      <legend className="block text-sm font-medium text-slate-700">{label}</legend>
          <div className={`
          ${isFlex ? 'flex space-x-7 flex-wrap' : 'space-y-6'}`}>
            {
              items.map((item) => (
                <div key={item.id} className="min-w-[4rem] flex items-center mb-4">
                  <input
                    id={item.id}
                    type="radio"
                    value={item.id}
                    name={name}
                    checked={selected.id === item.id}
                    onChange={(e: any) => {
                      const value = e.target.value
                      for (const item of items) {
                        if (item.id === value) {
                          setSelected(item)
                          return
                        }
                      }
                    }}
                    className="w-4 h-4 cursor-pointer text-emerald-500 bg-slate-100 border-slate-300 focus:ring-emerald-500 focus:ring-2"
                    {...i}
                  />
                  <label
                    htmlFor={item.id} className="ml-2 text-base font-medium text-slate-900 cursor-pointer"
                  >
                    {item.name}
                  </label>
                </div>
              ))
     }
     <span className='h-5 block text-sm text-red-500'>{error || ''}</span>
    </div>
  </fieldset>
)

export default Radio
