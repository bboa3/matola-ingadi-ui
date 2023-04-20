import { findActivePath } from '@components/Nav/utils/find-active-path'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  menu: {
    pathname: string
    title: string
  }[]
}

export const MainMenu: React.FC<Props> = ({ menu }) => {
  const { pathname } = useRouter()
  const activePath = findActivePath(pathname)

  return (
    <>
      {
        menu.map(({ pathname, title }) => (
          <li
            key={pathname}
            className='relative px-3 py-2 text-base outline-none ring-0'
            >
            <Link
              className={`
                ${pathname === activePath ? 'text-green-500' : ''}
                hover:text-green-500 text-slate-300  lg:text-gray-300 
              `}
              href={pathname}
            >
              {title}
            </Link>
          </li>
        ))
      }
    </>
  )
}

export default MainMenu
