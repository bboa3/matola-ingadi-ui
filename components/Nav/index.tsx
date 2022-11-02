import logoImg from '@assets/img/logo.png'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment } from 'react'

const navigation = [
  { name: 'Preços', href: '#' },
  { name: 'Localização', href: '#' },
  { name: 'Sobre nós', href: '#' }
]

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

const Nav: React.FC = () => {
  const { data: session } = useSession()
  return (
    <Disclosure as="nav" className="bg-white shadow ">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open
                    ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      )
                    : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    className="h-8 w-auto"
                    src={logoImg}
                    alt="Matola Ingadi"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    {navigation.map((item, index) => {
                      const lastMenuIndex = navigation.length - 1

                      if (index !== lastMenuIndex) {
                        return (
                          <li key={item.name}>
                            <div className="flex items-center">
                              <a href={item.href} className="mr-2 text-sm font-medium text-gray-600 hover:text-gray-800">
                                {item.name}
                              </a>
                              <svg
                                width={16}
                                height={20}
                                viewBox="0 0 16 20"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="h-5 w-4 text-gray-300"
                              >
                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                              </svg>
                            </div>
                          </li>
                        )
                      }

                      return (
                        <li key={item.name}>
                          <div className="flex items-center">
                            <a href={item.href} className="mr-2 text-sm font-medium text-gray-600 hover:text-gray-800">
                              {item.name}
                            </a>
                          </div>
                        </li>
                      )
                    }
                    )}
                  </ol>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {
                  session
                    ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <UserIcon className="h-8 w-8 rounded-full" aria-hidden='true' />
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Perfil
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Seus eventos
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => signOut()}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                      )
                    : (
                    <Link
                        href='/login'
                        className='w-full min-w-[4rem] rounded-lg py-1.5 px-3 mx-2 block font-medium text-sm lg:text-base text-center text-white bg-sky-600 hover:bg-sky-700 transition-all duration-100'
                      >
                        Log In
                    </Link>
                      )
                }
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    'block px-3 py-2 rounded-md text-base text-gray-600 font-medium'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Nav
