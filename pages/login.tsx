import GoogleLogo from '@assets/img/GoogleLogo'
import LinkedinLogo from '@assets/img/LinkedinLogo'
import LogoImg from '@assets/img/logo'
import { getLanguage } from '@common/Login/lang/page'
import Input from '@components/Form/Input'
import Layout from '@components/Layout/MatolaIngadi/SimpleLayout'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import getValidator from '@lib/validator/login'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { useFormik } from 'formik'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

interface UseFormikData {
  email: string
}

interface Props {
  callbackUrl: string
}

const LogIn: React.FC<Props> = ({ callbackUrl }) => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)

  const { errors, values, handleChange, handleSubmit } = useFormik<UseFormikData>({
    initialValues: {
      email: ''
    },
    validationSchema: getValidator(locale!),
    onSubmit: (values) => {
      signIn('email', { email: values.email, callbackUrl })
    }
  })

  return (
    <Layout
      title='Dados Financeiros Moçambique - Usa Conta'
      keywords='moçambique, login, economia, dados, finança, comércio, mercado, capital, despesas, Hipoteca, dinheiro'
      description='Pagina de login da MozEconomia. Fornecendo informação económica e financeira para negócios e investimentos em Moçambique.'
    >
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="mx-auto h-auto w-20">
            <LogoImg isFooter />
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <fieldset className="space-y-5">
              <button
                onClick={() => signIn('linkedin', { callbackUrl })}
                className="group flex w-full justify-center rounded-lg border-2 border-transparent hover:border-green-500 bg-green-100 py-2 px-4 text-base font-bold text-gray-800 focus:outline-none ring-0"
              >
                <span className="inset-y-0 left-0 flex items-center pl-3 pr-2">
                  <span className='h-6 w-6'><LinkedinLogo /></span>
                </span>
                {lang.linkedin}
              </button>
              <button
                onClick={() => signIn('google', { callbackUrl })}
                className="group flex w-full justify-center rounded-lg border-2 border-transparent hover:border-green-500 bg-green-100 py-2 px-4 text-base font-bold text-gray-800 focus:outline-none ring-0"
              >
                <span className="inset-y-0 left-0 flex items-center pl-3 pr-2">
                  <span className='h-6 w-6'><GoogleLogo /></span>
                </span>
                {lang.google}
              </button>
            </fieldset>

            <fieldset className='w-full border-t mt-4 border-gray-500 space-y-5'>
              <legend className="mx-auto px-3 text-gray-500">{lang.or}</legend>
              <input type="hidden" name="remember" defaultValue="true" />

              <Input
                label={lang.emailLabel}
                placeholder={lang.emailPlaceholder}
                id="email-address"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    {lang.rememberLabel}
                  </label>
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className="group relative flex w-full justify-center rounded-lg border border-transparent bg-green-500 py-2 px-4 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-green-400 group-hover:text-green-500" aria-hidden="true" />
                  </span>
                  {lang.signInButton}
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
  const { query } = context
  const { callbackUrl } = query

  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: { callbackUrl }
  }
}

export default LogIn
