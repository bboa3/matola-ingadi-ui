import { Listbox, Transition } from '@headlessui/react'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { Language } from 'ui'

export const languages: Language[] = [
  {
    locale: 'pt',
    id: 'PT',
    name: 'Português'
  },
  {
    locale: 'en',
    id: 'ENG',
    name: 'English'
  }
]
const LanguageSelect: React.FC = () => {
  const router = useRouter()
  const { pathname, asPath, query, locale } = router

  const selected = languages.find((lang) => lang.locale === locale)

  const changeLanguage = ({ locale }: Language) => {
    router.push({ pathname, query }, asPath, { locale })
  }

  if (!selected) return <></>

  return (
    <Listbox value={selected} onChange={changeLanguage}>
      {({ open }) => (
        <div>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full flex items-center text-sm text-slate-500 hover:text-slate-400 lg:text-slate-400 lg:hover:text-slate-300 cursor-pointer pl-1 focus:outline-none ring-0">
              <GlobeAltIcon
                className='h-5 w-5'
                aria-hidden="true"
              />
              <span>
                {selected.id}
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-lg bg-white px-2 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {languages && languages.map((language) => (
                  <Listbox.Option
                    key={language.id}
                    className={'cursor-pointer text-sm select-none'}
                    value={language}
                  >
                    {({ selected }) => (
                      <span
                        className={`
                          w-full text-start hover:bg-green-100 block px-3 py-1 text-sm text-gray-800 rounded-full
                          ${selected ? 'bg-green-100' : ''}
                        `}
                      >
                        {language.name}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}

export default LanguageSelect
