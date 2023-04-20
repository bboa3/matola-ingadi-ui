import getLanguage from '@components/Search/lang/search'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
}

export const SearchButton: React.FC<Props> = ({ setIsOpen, isOpen }) => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      type="button"
      className="w-full lg:w-44 h-9 lg:h-8 text-green-500 bg-transparent rounded-full flex justify-start items-center cursor-pointer focus:outline-none ring-0"
    >
      <SearchIcon className='w-6 h-6 pl-1.5 fill-green-400 hover:fill-green-300' />
      <span className='pl-2'>
        {lang.placeholder}
      </span>
    </button>
  )
}

export default SearchButton
