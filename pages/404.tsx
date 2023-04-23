import { getLanguage } from '@common/404/lang/page'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const NotFound: React.FC = () => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)

  return (
  <>
    <Head>
      <meta name="robots" content="noindex nofollow" />
      <title>Esta página não existe</title>
    </Head>
    <main className='max-w-2xl min-h-screen mx-auto px-4 sm:px-6 pt-24 lg:pt-24 overflow-hidden'>
      <div className='w-full flex flex-col items-center'>
          <div className='w-24 mt-6 mb-3'>
            <h2 className='text-5xl font-bold'>404</h2>
          </div>
          <div className='m-4 text-center'>
            <h1 className='text-5xl font-bold'>{lang.h1}</h1>
            <div className='m-3'>{lang.description}</div>
          </div>
          <div className='m-4 text-left'>
            <h2 className='font-bold text-gray-500 text-center'>{lang.menu.name}</h2>
            <div>
              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                {
                  lang.menu.pages.map(({ title, description, Icon, href }) => (
                    <Link key={title} href={href} className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                      <Icon className="flex-shrink-0 h-6 w-6 text-green-500" aria-hidden="true" />
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">{title}</p>
                        <p className="mt-1 text-sm text-gray-500">{description}</p>
                      </div>
                    </Link>
                  ))
                }
              </div>
              <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                <div className="text-sm">
                  <Link href={lang.homePage.href} className="font-medium text-green-500 hover:text-green-600">
                    {' '}
                    {lang.homePage.title}<span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    </main>
  </>
  )
}

export default NotFound
