import NewsletterIcon from '@assets/icons/Newsletter'
import { getLanguage } from '@common/Login/lang/page'
import Input from '@components/Form/Input'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import getValidator from '@lib/validator/login'
import { useFormik } from 'formik'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

interface UseFormikData {
  email: string
}

const NewsletterForm: React.FC = () => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)

  const { errors, values, handleChange, handleSubmit } = useFormik<UseFormikData>({
    initialValues: {
      email: ''
    },
    validationSchema: getValidator(locale!),
    onSubmit: (values) => {
      signIn('email', { email: values.email })
    }
  })

  return (
    <form onSubmit={handleSubmit} className="w-full h-full">
      <fieldset className='w-full mt-4 border-slate-500 space-y-5'>
        <legend className="flex px-3 text-2xl font-bold text-white relative">
          Newsletter
          <span className='block absolute -right-9 top-0 w-9 h-auto'>
            <NewsletterIcon />
          </span>
        </legend>
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

        <div>
          <button
            type='submit'
            className="group relative flex w-full justify-center rounded-lg border border-transparent bg-emerald-500 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon className="h-5 w-5 text-emerald-400 group-hover:text-emerald-300" aria-hidden="true" />
            </span>
            {lang.signUpButton}
          </button>
        </div>
      </fieldset>
      <span className='block mt-8 text-sm text-slate-500'>
        {lang.terms}
      </span>
    </form>
  )
}

export default NewsletterForm
