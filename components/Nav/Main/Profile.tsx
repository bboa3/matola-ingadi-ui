import { Menu, Transition } from '@headlessui/react'
import Person4Icon from '@mui/icons-material/Person4'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { Fragment } from 'react'

interface Props {
  signInTitle: string
  signOutTitle: string
}

export const ProfileButton: React.FC<Props> = ({ signInTitle, signOutTitle }) => {
  const { data: session } = useSession()

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-slate-200 lg:bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 lg:focus:ring-white focus:ring-offset-2 focus:ring-offset-white lg:focus:ring-offset-slate-800">
          <span className="sr-only">Abrir o menu do usuário</span>
          <Person4Icon
            className="h-8 w-8 lg:h-7 lg:w-7 p-0.5 rounded-full text-slate-500 lg:text-slate-300"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-lg bg-white px-2 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <>
                {
                  !session
                    ? (
                      <button
                        onClick={() => signIn()}
                        className='w-full text-start hover:bg-gray-100 block px-3 py-1 text-sm text-gray-700 rounded-full'
                      >
                        {signInTitle}
                      </button>
                      )
                    : (
                      <button
                        onClick={() => signOut()}
                        className='w-full text-start hover:bg-gray-100 block px-3 py-1 text-sm text-gray-700 rounded-full focus:outline-none ring-0'
                      >
                        {signOutTitle}
                      </button>
                      )
                }
              </>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ProfileButton
