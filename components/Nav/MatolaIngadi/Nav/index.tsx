import LogoImg from '@assets/img/logo'
import MainNavigation from '@components/Nav/Main'
import GetStartedButton from '@components/Nav/Main/GetStarted'
import { getMenu } from '@components/Nav/MatolaIngadi/folders'
import SmallScreenFolder from '@components/Nav/MatolaIngadi/Nav/SmallScreenFolder'
import { Popover } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Nav: React.FC = () => {
  const { locale, pathname } = useRouter()
  const menu = getMenu(locale!)

  return (
    <MainNavigation
      searchIndexName='matola_ingadi'
      Navigation={
        <div className="w-full bg-white lg:shadow-lg">
          <div className="hidden lg:block mx-auto w-full max-w-7xl px-3 lg:px-10">
            <div className="w-full flex h-14 md:h-24 items-center justify-between">
              <div className="flex flex-1 items-stretch justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/" className='block h-6 lg:h-9 w-auto'>
                    <LogoImg />
                  </Link>
                </div>
                <ul className="hidden lg:ml-4 lg:flex space-x-0">
                  {
                    menu.pages.map(({ name, id }) => {
                      const path = `${menu.id}/${id}`

                      return (
                        <li key={id}>
                          <Link
                            href={path}
                            className={`
                              ${pathname === path ? 'text-green-600' : 'text-gray-800 font-medium'}
                              group uppercase rounded-md inline-flex items-center text-base px-2.5 mx-1 py-1.5 hover:text-green-500 transition-all delay-150 hover:delay-[0s] outline-none ring-0
                            `}
                          >
                            {name}
                          </Link>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
              <GetStartedButton locale={locale!} />
            </div>
          </div>

          <Popover.Group className="lg:hidden w-full flex flex-col">
            <SmallScreenFolder menu={menu} />

            <div className='mt-8'>
              <GetStartedButton locale={locale!} />
            </div>
          </Popover.Group>
        </div>
    } />
  )
}

export default Nav
