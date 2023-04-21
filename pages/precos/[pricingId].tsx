import { totalCalculator } from '@common/Prices/invoice/total'
import getLanguage from '@common/Prices/lang/bills/page'
import { Button } from '@components/Button'
import Input from '@components/Form/Input'
import SelectMenu from '@components/Form/Select'
import SimpleLayout from '@components/Layout/MatolaIngadi/SimpleLayout'
import { CheckIcon } from '@heroicons/react/24/outline'
import { billingHttpFetch } from '@lib/fetch'
import getValidator from '@lib/validator/bill'
import { paymentMethods } from '@lib/validator/payment'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { countryList } from '@utils/address/countryList'
import { cookiesName, nextAuthUrl } from '@utils/env'
import { moneyFormatter } from '@utils/number-formatter'
import { Bill, Pricing } from 'bill'
import { useFormik } from 'formik'
import { GetServerSideProps } from 'next'
import { User } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

interface Props {
  pricing: Pricing
  token: string
  user: User
}

interface UseFormikData {
  guestsNumber: number
  name: string
  email: string
  phoneNumber: string
  cityOrDistrict: string
  provinceOrState: string
}

const paymentMethod = paymentMethods[0]
const countries = countryList.map(c => ({ id: c, name: c }))

const CreateBillPage: React.FC<Props> = ({ pricing, token, user }) => {
  const { locale, push } = useRouter()
  const lang = getLanguage(locale!)
  const [country, setCountry] = useState(countries[150])

  const { baseGuestsNumber } = pricing

  const { errors, values, handleChange, handleSubmit } = useFormik<UseFormikData>({
    initialValues: {
      guestsNumber: baseGuestsNumber,
      name: '',
      email: '',
      phoneNumber: '',
      cityOrDistrict: '',
      provinceOrState: ''
    },
    validationSchema: getValidator(locale!),
    onSubmit: (values) => {
      const data = {
        paymentMethod: paymentMethod.name,
        paymentGatewayFee,
        guestsNumber: values.guestsNumber,
        pricingId: pricing.id,
        email: values.email,
        phoneNumber: values.phoneNumber,
        name: values.name,
        address: {
          country: country.name,
          provinceOrState: values.provinceOrState,
          cityOrDistrict: values.cityOrDistrict
        }
      }

      billingHttpFetch.post('/billing', data, {
        headers: { Authorization: `beaer ${token}` }
      })
        .then(({ data }) => {
          const { id, invoices }: Bill = data

          push(`/precos/payment/${id}?invoiceCode=${invoices[0].invoiceCode}`)
        })
        .catch(err => console.log(err))
    }
  })

  const { subTotal, paymentGatewayFee } = totalCalculator({
    pricing,
    guestsNumber: values.guestsNumber,
    commission: paymentMethod.commission
  })

  return (
    <SimpleLayout
      robots='noindex nofollow'
      title='Preços | MozEconomia'
      description='Preço dos serviços da MozEconomia'
      keywords='moçambique, economia, dados, finança, comércio, mercado, capital, despesas, Hipoteca, dinheiro'
    >
      <div className='flex flex-col md:flex-row min-h-full py-12 md:py-0 px-4 sm:px-6 md:px-0'>
        <section className='w-full md:w-1/2 md:h-screen md:text-white hidden md:block'>
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <div className='w-full h-full relative flex justify-center md:bg-gradient-to-tr from-slate-900 to-emerald-900 px-3 sm:px-4 lg:px-6'>
              <div className='w-full h-full md:py-12 md:px-8'>
                <h1 className='text-2xl md:text-3xl mb-3 font-bold text-white'>
                  {lang.h1.text1} <span className='hidden md:inline'>{lang.h1.text2}</span>
                </h1>
                <div className='space-y-3 px-2'>
                  {
                    pricing.services.map(({ id, description }) => (
                      <p key={id} className='flex items-center space-x-3'>
                        <span className='w-6 h-6 bg-emerald-500 flex justify-center items-center rounded-[50%]'>
                          <CheckIcon className='text-white w-5 h-5 mr-1' aria-hidden="true" />
                        </span>
                        <span>
                          {description}
                        </span>
                      </p>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='w-full md:w-1/2'>
          <form onSubmit={handleSubmit} className="w-full mt-3 max-w-2xl space-y-5 rounded-md p-3 md:p-12">
            <div>
              <div className='mt-6'>
                <span>{lang.total}</span>
                <span className='font-bold text-4xl ml-1'>{moneyFormatter(subTotal)}</span>
              </div>

              <div className='mt-8 hidden'>
                <Input
                  label={lang.form.maxTeamMembers}
                  id='maxTeamMembers'
                  type='number'
                  min={baseGuestsNumber}
                  max="100"
                  value={values.guestsNumber}
                  onChange={handleChange}
                  error={errors.guestsNumber}
                />
              </div>
            </div>

            <fieldset className='pt-6'>
              <div className='font-semibold text-lg my-2'>{lang.form.title}</div>
              <Input
                label={lang.form.name}
                id='name'
                type='text'
                value={values.name}
                onChange={handleChange}
                error={errors.name}
              />

              <Input
                label={lang.form.email}
                id='email'
                type='email'
                value={values.email}
                onChange={handleChange}
                error={errors.email}
              />

              <Input
                label={lang.form.phoneNumber}
                id='phoneNumber'
                type='tel'
                value={values.phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
              />
              <Input
                label={lang.form.cityOrDistrict}
                id='cityOrDistrict'
                type='text'
                value={values.cityOrDistrict}
                onChange={handleChange}
                error={errors.cityOrDistrict}
              />

              <div className='md:grid grid-cols-2 gap-2 justify-between items-center'>
                <Input
                  label={lang.form.provinceOrState}
                  id='provinceOrState'
                  type='text'
                  value={values.provinceOrState}
                  onChange={handleChange}
                  error={errors.provinceOrState}
                />

                <SelectMenu
                  label={lang.form.country}
                  selected={country}
                  setSelected={setCountry}
                  items={countries}
                />
              </div>
            </fieldset>

            <div className='py-5 w-full'>
              <Button solid type='submit'>
                <span className='w-40'>
                  {lang.form.submitButton}{' '}
                  <span className='text-2xl' aria-hidden="true">&rarr;</span>
                </span>
              </Button>
            </div>
          </form>
        </section>
      </div>
    </SimpleLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, locale, query, resolvedUrl } = context
  const { pricingId } = query

  const token = req.cookies[cookiesName]
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session || !token) {
    return {
      redirect: {
        destination: `login?callbackUrl=${nextAuthUrl}/${locale}${resolvedUrl}`,
        permanent: false
      }
    }
  }

  const { data: pricing } = await billingHttpFetch.get(`/billing/pricing/${pricingId}/${locale}`)

  return {
    props: {
      pricing,
      token
    }
  }
}

export default CreateBillPage
