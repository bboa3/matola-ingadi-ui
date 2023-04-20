import Hit from '@components/Search/Hit'
import getLanguage from '@components/Search/lang/search'
import { searchClient } from '@utils/search-client'
import { useRouter } from 'next/router'
import React from 'react'
import { Configure, Hits, InstantSearch, SearchBox } from 'react-instantsearch-hooks-web'

export interface SearchProviderProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
  indexName: string
}

const SearchProvider: React.FC<SearchProviderProps> = ({ isOpen, setIsOpen, indexName }) => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)

  return (
    <div
      className={`${isOpen ? 'block' : 'hidden'} w-screen h-screen absolute top-0 left-0 flex justify-center items-center`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className='w-full h-full cursor-default backdrop-blur-sm bg-slate-900/30 z-0'
      ></button>

      <div className='w-[90%] md:w-[50%] lg:w-[60%] min-h-[40%] max-h-[84%] md:max-h-[80%] p-5 md:p-6 absolute rounded-lg left-1/2 top-6 md:top-24 z-20 -translate-x-1/2 bg-white drop-shadow-2xl overflow-hidden'>
        <InstantSearch
          indexName={indexName}
          searchClient={searchClient}
        >
          <Configure hitsPerPage={6} />
          <SearchBox
            classNames={{
              root: 'w-full h-full',
              form: 'w-full h-full relative',
              input: 'w-full h-7 pl-8 placeholder:pl-1 placeholder:text-slate-500 border-0 border-b border-slate-400 bg-transparent text-slate-600 text-sm focus:ring-0 focus:border-slate-500 focus:outline-none',
              submitIcon: 'absolute left-0 top-1 w-5 h-5 ml-1 text-slate-300 fill-slate-300 hover:fill-slate-400 rounded-lg cursor-pointer hover:bg-sky-0',
              resetIcon: 'absolute right-2 top-2 w-3 h-3 text-slate-400 fill-slate-400 hover:fill-slate-500 cursor-pointer hover:bg-sky-0'
            }}
            placeholder={lang.placeholder}
          />
          <Hits
            hitComponent={Hit}
            classNames={{
              root: 'w-full h-full py-4'
            }}
          />

        </InstantSearch>
        <div className='h-4 w-full bg-white absolute left-0 bottom-0 z-10'></div>
      </div>
    </div>
  )
}

export default SearchProvider
