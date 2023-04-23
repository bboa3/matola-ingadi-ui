import LogoImg from '@assets/img/logo'
import getLanguage from '@components/Nav/lang/manu'
import LanguageSelect from '@components/Nav/Main/languageSelect'
import ProfileButton from '@components/Nav/Main/Profile'
import SearchProvider from '@components/Search'
import SearchButton from '@components/Search/SearchButton'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode, useState } from 'react'

interface Props {
  Navigation: ReactNode
  searchIndexName: string
}

const Nav: React.FC<Props> = ({ Navigation, searchIndexName }) => {
  const { locale } = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const lang = getLanguage(locale!)

  return (
    <nav className="w-full shadow-sm fixed z-50">
      <div className='h-20 lg:h-12 w-full bg-white lg:bg-green-950 shadow-lg lg:shadow-none px-6 lg:px-8'>
        {/* < medium Screen */}
        <Disclosure as="ul" className='inline-flex lg:hidden items-center justify-between w-full h-full'>
          {({ open }) => (
            <>
              <div className="w-full max-w-[14rem]">
                <Link href="/" className='block w-full h-auto'>
                  <LogoImg />
                </Link>
              </div>

              <div className='inline-flex items-center justify-end'>
                <div className='px-3'>
                  <LanguageSelect />
                </div>
                <Disclosure.Button className="inline-flex items-center justify-center rounded-full p-2 text-white bg-green-500 focus:outline-none focus:ring-0">
                  <span className="sr-only">Open main menu</span>
                  {open
                    ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      )
                    : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )
                  }
                </Disclosure.Button>
              </div>

              <Disclosure.Panel className='w-screen overflow-y-auto fixed top-[4.99rem] left-0 right-0 bottom-0 border-t border-slate-100 bg-white'>
                <div className='px-3 py-3 w-full flex items-center'>
                  <div className='flex flex-1'>
                    <SearchButton isOpen={isOpen} setIsOpen={setIsOpen} />
                    <SearchProvider isOpen={isOpen} setIsOpen={setIsOpen} indexName={searchIndexName} />
                  </div>
                  <div className='h-4/5 flex items-center px-3'>
                  <ProfileButton signInTitle={lang.signIn} signOutTitle={lang.signOut} billTitle={lang.billTitle} />
                </div>
                </div>
                <div className="px-2 pt-3 pb-3 border-t-2 border-slate-200">
                  {Navigation}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* medium Screen  =< */}
        <ul className='hidden lg:inline-flex items-center justify-end w-full h-full max-w-7xl'>
          <li className='h-4/5 flex items-center px-3'>
            <SearchButton isOpen={isOpen} setIsOpen={setIsOpen} />
            <SearchProvider isOpen={isOpen} setIsOpen={setIsOpen} indexName={searchIndexName} />
          </li>
          <li className='px-3'>
            <LanguageSelect />
          </li>
          <li className='h-4/5 flex items-center px-3 border-l border-dotted border-slate-600'>
            <ProfileButton signInTitle={lang.signIn} signOutTitle={lang.signOut} billTitle={lang.billTitle} />
          </li>
        </ul>
      </div>
      <div className='w-full hidden lg:block'>
        {Navigation}
      </div>
    </nav>
  )
}

export default Nav
