import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import logoImg from '@assets/img/logo.png'
import { Bars3Icon, CreditCardIcon, MapIcon, PhoneIcon, XMarkIcon } from '@heroicons/react/24/solid'
import NotificationDropdown from 'components/Dropdowns/NotificationDropdown'
import UserDropdown from 'components/Dropdowns/UserDropdown'
import { signOut } from 'next-auth/react'

export default function Sidebar () {
  const [collapseShow, setCollapseShow] = React.useState('hidden')
  const router = useRouter()
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
          </button>

          {/* Brand */}
          <Link href="/"
              className="md:block text-left md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold px-0"
            >
              <span className="flex flex-shrink-0 items-center">
                <Image
                  className="h-8 w-auto"
                    src={logoImg}
                  alt="Matola Ingadi"
                />
              </span>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/"
                      className="md:block text-left md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    >
                      <span className="flex flex-shrink-0 items-center">
                        <Image
                          className="h-8 w-auto"
                            src={logoImg}
                          alt="Matola Ingadi"
                        />
                      </span>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Heading */}
            <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Serviços
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col w-full md:min-w-full flex flex-col list-none">
              <li className="w-full items-center">
                <Link href="/user/bills">
                    <span
                      className={`
                        ${router.pathname === '/user/bills' ? 'text-indigo-900' : 'text-gray-700 hover:text-gray-500'}
                        flex items-center text-xs uppercase py-3 font-bold
                      `}
                    >
                      Eventos e Faturas
                    </span>
                </Link>
              </li>
              <li className="w-full items-center">
                <Link href="/prices">
                    <span
                      className= 'text-gray-700 hover:text-gray-500 flex items-center text-xs uppercase py-3 font-bold'
                    >
                      Criar evento
                    </span>
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Cliente
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <button
                  onClick={() => signOut()}
                >
                    <span
                      className='text-gray-700 hover:text-gray-500
                        flex items-center text-xs uppercase py-3 font-bold
                      '
                    >
                      Sair da Conta
                    </span>
                </button>
              </li>

              <li className="items-center">
                <Link href="/user/information">
                  <span
                      className={`
                      ${router.pathname === '/user/information' ? 'text-indigo-900' : 'text-gray-700 hover:text-gray-500'}
                      flex items-center text-xs uppercase py-3 font-bold
                      `}
                  >
                    Conta
                  </span>
                </Link>
              </li>
            </ul>

            <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Matola Ingadi
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="inline-flex">
                <Link href="/contact">
                  <span
                      className='text-gray-700 hover:text-gray-500
                      flex items-center text-xs uppercase py-3 font-bold
                      '
                  >
                      <PhoneIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                      Contactos
                  </span>
                </Link>
              </li>

              <li className="inline-flex">
                <Link href="/location">
                  <span
                      className='text-gray-700 hover:text-gray-500
                      flex items-center text-xs uppercase py-3 font-bold
                      '
                  >
                      <MapIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                      Localização
                  </span>
                </Link>
              </li>

              <li className="inline-flex">
                <Link href="/prices">
                  <span
                      className='text-gray-700 hover:text-gray-500
                      flex items-center text-xs uppercase py-3 font-bold
                      '
                  >
                    <CreditCardIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                    Preços
                  </span>
                </Link>
              </li>

              <li className="inline-flex">
                <Link href="/about-us">
                  <span
                      className='text-gray-700 hover:text-gray-500
                      flex items-center text-xs uppercase py-3 font-bold
                    '
                  >
                    Sobre nós
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
