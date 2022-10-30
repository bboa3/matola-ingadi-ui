import Layout from '@components/Layout'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'

interface Props {
  URL: string
}

const VerifyRequest: React.FC<Props> = ({ URL }) => {
  return (
    <Layout
      title=''
      keywords=''
      description=''
    >
      <div className='w-full h-full flex justify-center items-center'>
        <div className='max-w-3xl border border-slate-600 rounded-md text-center p-9'>
          <h1 className='text-3xl'>Verifique seu e-mail</h1>
          <p className=' py-7'>A sign in link has been sent to your email address.</p>
          <p className=''><Link href={URL}>matolaingadi.com</Link></p>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const URL = process.env.NEXTAUTH_URL

  return {
    props: {
      URL
    }
  }
}

export default VerifyRequest
