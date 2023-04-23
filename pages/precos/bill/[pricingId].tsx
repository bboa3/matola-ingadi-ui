import { totalCalculator } from '@common/Prices/invoice/total'
import getLanguage from '@common/Prices/lang/bills/page'
import { Button } from '@components/Button'
import Input from '@components/Form/Input'
import SelectMenu from '@components/Form/Select'
import SimpleLayout from '@components/Layout/MatolaIngadi/SimpleLayout'
import { billingHttpFetch } from '@lib/fetch'
import getValidator from '@lib/validator/bill'
import { paymentMethods } from '@lib/validator/payment'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { countryList } from '@utils/address/countryList'
import { cookiesName, nextAuthUrl } from '@utils/env'
import getEventTypes from '@utils/event-types'
import { moneyFormatter } from '@utils/number-formatter'
import { Bill, Pricing } from 'bill'
import { useFormik } from 'formik'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

interface Props {
  pricing: Pricing
  token: string
  eventDate: string
}

interface UseFormikData {
  eventDate: string
  guestsNumber: number
  name: string
  email: string
  phoneNumber: string
  cityOrDistrict: string
  provinceOrState: string
}

const paymentMethod = paymentMethods[0]
const countries = countryList.map(c => ({ id: c, name: c }))

const CreateBillPage: React.FC<Props> = ({ pricing, token, eventDate }) => {
  const { locale, push } = useRouter()
  const lang = getLanguage(locale!)
  const eventTypes = getEventTypes('pt')
  const [country, setCountry] = useState(countries[150])
  const [eventType, setEventType] = useState(eventTypes[0])

  const { baseGuestsNumber } = pricing

  const { errors, values, handleChange, handleSubmit } = useFormik<UseFormikData>({
    initialValues: {
      guestsNumber: baseGuestsNumber,
      eventDate,
      name: '',
      email: '',
      phoneNumber: '',
      cityOrDistrict: '',
      provinceOrState: ''
    },
    validationSchema: getValidator(locale!),
    onSubmit: (values) => {
      const data = {
        eventType: eventType.name,
        paymentMethod: paymentMethod.name,
        eventDate: values.eventDate,
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

          push(`/precos/invoice/${id}?invoiceCode=${invoices[0].invoiceCode}`)
        })
        .catch(err => console.log(err))
    }
  })

  const { subTotal } = totalCalculator({
    pricing,
    guestsNumber: values.guestsNumber,
    commission: paymentMethod.commission
  })

  return (
    <SimpleLayout
      robots='noindex nofollow'
      title='Preços | Matola Ingadi'
      description='Preço dos serviços da Matola Ingadi. Organizamos eventos que caminham de mãos dadas com o amor, felicidade, amizade, carinho e companheirismo.'
      keywords='Matola Ingadi, Salão de Eventos, Casamentos, Aniversários'
    >
      <div className='flex flex-col items-center min-h-full py-12 md:py-0 px-4 sm:px-6 md:px-0'>
        <section className='w-full max-w-5xl'>
          <form onSubmit={handleSubmit} className="w-full lg:grid grid-cols-2 gap-6 mt-3 space-y-5 rounded-md p-3 md:p-12">
            <fieldset>
              <legend className='hidden'>Informação do evento</legend>
              <div className='mb-6'>
                <span>{lang.total}</span>
                <span className='font-bold text-4xl ml-1'>{moneyFormatter(subTotal)}</span>
              </div>

              <Input
                label={lang.form.guestsNumber}
                id='guestsNumber'
                type='number'
                min={baseGuestsNumber}
                max="100"
                value={values.guestsNumber}
                onChange={handleChange}
                error={errors.guestsNumber}
              />
              <SelectMenu
                label={lang.form.eventType}
                selected={eventType}
                setSelected={setEventType}
                items={eventTypes}
              />
            </fieldset>

            <fieldset>
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

              <div className='py-5 w-full'>
                <Button solid type='submit'>
                  <span className='w-40'>
                    {lang.form.submitButton}{' '}
                    <span className='text-2xl' aria-hidden="true">&rarr;</span>
                  </span>
                </Button>
              </div>
            </fieldset>
          </form>
        </section>
      </div>
    </SimpleLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, locale, query, resolvedUrl } = context
  const { pricingId, eventDate } = query

  const token = req.cookies[cookiesName]
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session || !token) {
    return {
      redirect: {
        destination: `/login?callbackUrl=${nextAuthUrl}/${locale}${resolvedUrl}`,
        permanent: false
      }
    }
  }

  const { data: pricing } = await billingHttpFetch.get(`/billing/pricing/${pricingId}/${locale}`)

  return {
    props: {
      eventDate,
      pricing,
      token
    }
  }
}

export default CreateBillPage
