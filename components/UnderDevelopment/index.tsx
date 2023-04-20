import TeamWorkImg from '@assets/img/TeamWork'
import { Button } from '@components/Button'
import getLanguage from '@components/UnderDevelopment/lang/page'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const UnderDevelopment: React.FC = () => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)

  return (
    <>
      <Head>
        <meta name="robots" content="noindex nofollow" />
        <title>Pagina em desenvolvimento</title>
      </Head>
      <div className='max-w-2xl min-h-screen mx-auto px-4 sm:px-6 pt-24 md:pt-32 overflow-hidden'>
        <div className='w-full flex flex-1 flex-col items-center md:items-start md:flex-row md:divide-x'>
          <div className='w-48 lg:w-96 mt-6 mb-3'>
            <TeamWorkImg />
          </div>
          <div className='m-4 flex flex-col justify-center items-center text-center md:pl-4'>
            <h1 className='text-4xl lg:text-5xl font-bold'>{lang.h1}</h1>
            <p className='m-3'>{lang.description}</p>
            <div className='flex w-full max-w-[20rem] justify-between space-x-3'>
              <Button solid asChild>
                <Link href='https://docs.google.com/forms/d/e/1FAIpQLSf0CFIIiDsQfopjEP7cQ4X0Y4eCFxTSQCCbla_1F2A8U35SgA/viewform' target="_blank" rel="noreferrer">
                  {lang.feedbackButton}
                </Link>
              </Button>
              <Button asChild>
                <Link href='/' target="_blank" rel="noreferrer">
                  {lang.initialPageButton}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UnderDevelopment
