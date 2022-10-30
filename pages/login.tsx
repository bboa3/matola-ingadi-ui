import FacebookLogo from '@assets/img/FacebookLogo'
import GoogleLogo from '@assets/img/GoogleLogo'
import logoImg from '@assets/img/logo.png'
import Layout from '@components/Layout'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import { GetServerSideProps } from 'next'
import { getSession, signIn } from 'next-auth/react'
import Image from 'next/image'
import React, { FormEvent, useState } from 'react'

const LogIn: React.FC = () => {
  const [email, setEmail] = useState('')

  const emailLoginHandler = (e: FormEvent) => {
    e.preventDefault()
    signIn('email', { email })
  }

  return (
    <Layout
      title=''
      keywords=''
      description=''
    >
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Image
              className="mx-auto h-14 w-auto"
              src={logoImg}
              alt="Matola Ingadi"
            />
          </div>
          <form className="w-full">
            <fieldset className="space-y-5">
              <button
                onClick={() => signIn('google')}
                className="group flex w-full justify-center rounded-lg border-2 border-transparent hover:border-indigo-600 bg-indigo-100 py-2 px-4 text-base font-bold text-slate-800 focus:outline-none ring-0"
              >
                <span className="inset-y-0 left-0 flex items-center pl-3 pr-2">
                  <span className='h-6 w-6'><GoogleLogo /></span>
                </span>
                Login com Google
              </button>
              <button
                onClick={() => signIn('facebook')}
                className="group flex w-full justify-center rounded-lg border-2 border-transparent hover:border-indigo-600 bg-indigo-100 py-2 px-4 text-base font-bold text-slate-800 focus:outline-none ring-0"
              >
                <span className="inset-y-0 left-0 flex items-center pl-3 pr-2">
                  <span className='h-6 w-6'><FacebookLogo /></span>
                </span>
                Login com Facebook
              </button>
            </fieldset>

            <fieldset className='w-full border-t mt-4 border-slate-500 space-y-5'>
              <legend className="mx-auto px-3 text-slate-500">Ou</legend>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-lg shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Seu email
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={e => setEmail(e.target.value)}
                    className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Seu email"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Lembrar de me
                  </label>
                </div>
              </div>

              <div>
                <button
                  onClick={emailLoginHandler}
                  className="group relative flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                  Sign in
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default LogIn
