import React, { Dispatch, InputHTMLAttributes, SetStateAction } from 'react'

export interface RadioItem {
  id: string | number
  name: string | number
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  items: RadioItem[]
  name: string
  setValue: Dispatch<SetStateAction<string>>
}

const Radio: React.FC<Props> = ({ label, name, items, setValue, ...i }) => (
  <fieldset className='space-y-2'>
              <legend className="block text-sm font-medium text-gray-700">{label}</legend>
              <div className='flex space-x-7'>
                {
                  items.map((item) => (
                    <div key={item.id} className="flex items-center mb-4">
                      <input
                        id={`${item.id}`}
                        type="radio"
                        value={item.id}
                        onChange={e => setValue(e.target.value)}
                        name={name}
                        {...i}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor={`${item.id}`} className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300"
                      >
                        {item.name}
                      </label>
                  </div>
                  ))
     }
    </div>
  </fieldset>
)

export default Radio
