import { BellIcon } from '@heroicons/react/24/outline'
import UserDropdown from 'components/Dropdowns/UserDropdown'
import Link from 'next/link'
import React from 'react'

interface Props {
  avatar?: string
}

const Navbar: React.FC<Props> = ({ avatar }) => {
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <Link
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Eventos e Faturas
          </Link>

          <div className='md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3'>
            <button
              type="button"
              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {/* User */}
          <div className='hidden md:block'>
            <UserDropdown avatar={avatar} />
          </div>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  )
}

export default Navbar
