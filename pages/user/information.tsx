import Input from '@components/Form/Imput'
import SelectMenu from '@components/Form/Select'
import Layout from '@components/Layout/User'
import Loading from '@components/Loading'
import { DataContext } from '@context/data'
import { httpFetch } from '@lib/fetch'
import validator from '@lib/validator/user'
import { countryList } from '@utils/address/countryList'
import { useFormik } from 'formik'
import { User } from 'ingadi'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'

interface Props {
  user: User
  token: string
}

const countries = countryList.map(c => ({ id: c, name: c }))

const UserBills: React.FC<Props> = ({ user, token }) => {
  const { data } = useContext(DataContext)
  const router = useRouter()
  const eventReservation = data?.eventReservation
  const [loading, setLoading] = useState(false)

  const [country, setCountry] = useState(countries[150])

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: user.name,
      phoneNumber: user.phoneNumber,
      streetAddress: user.address?.streetAddress,
      address1: user.address?.address1,
      cityOrDistrict: user.address?.cityOrDistrict,
      postalCode: user.address?.postalCode,
      provinceOrState: user.address?.provinceOrState
    },
    validationSchema: validator,
    onSubmit: (values) => {
      httpFetch.put('/user', {
        name: values.name,
        phoneNumber: values.phoneNumber,
        address: {
          streetAddress: values.streetAddress,
          address1: values.address1,
          cityOrDistrict: values.cityOrDistrict,
          postalCode: values.postalCode,
          provinceOrState: values.provinceOrState,
          country: country.name
        }
      }, {
        headers: {
          Authorization: `beaer ${token}`
        }
      }).then(async (_response) => {
        if (eventReservation) {
          setLoading(true)
          await httpFetch.post('/bill', {
            guestsNumber: eventReservation?.guestsNumber,
            discount: 0,
            eventPricingId: eventReservation?.eventPricingId,
            eventType: eventReservation?.eventType,
            eventDate: eventReservation?.eventDate
          },
          {
            headers: {
              Authorization: `beaer ${token}`
            }
          })

          router.push('/user/bills?event=true')
          return
        }

        router.push('/user/bills?event=false')
      })
        .catch(err => console.log(err))
    }
  })

  return (
    <Layout
      title=''
      keywords=''
      description=''
      avatar={user.image ? user.image : undefined}
    >
      <div className="flex flex-wrap justify-center mt-4">
        <div className='w-full h-full max-w-2xl relative bg-white px-5 rounded-lg'>
          {loading
            ? <Loading />
            : (
            <form onSubmit={handleSubmit} className="w-full h-full space-y-5">
              <Input
                label='Seu Nome'
                id='name'
                type='text'
                value={values.name}
                onChange={handleChange}
                error={errors.name}
              />

              <Input
                label='Seu Contacto'
                id='phoneNumber'
                type='tel'
                value={values.phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
              />

              <fieldset>
                <legend>Seu endereço</legend>

                <Input
                  label='Endereço da Rua'
                  id='streetAddress'
                  type='text'
                  value={values.streetAddress}
                  onChange={handleChange}
                  error={errors.streetAddress}
                />

                <Input
                  label='Endereço 1'
                  id='address1'
                  type='text'
                  value={values.address1}
                  onChange={handleChange}
                  error={errors.address1}
                />

                <Input
                  label='Cidade/Distrito'
                  id='cityOrDistrict'
                  type='text'
                  value={values.cityOrDistrict}
                  onChange={handleChange}
                  error={errors.cityOrDistrict}
                />

                <div className=' md:grid grid-cols-3 gap-2 justify-between items-center'>
                  <Input
                    label='Província/Estado'
                    id='provinceOrState'
                    type='text'
                    value={values.provinceOrState}
                    onChange={handleChange}
                    error={errors.provinceOrState}
                  />

                  <Input
                    label='Zip/Código Postal'
                    id='postalCode'
                    type='text'
                    value={values.postalCode}
                    onChange={handleChange}
                    error={errors.postalCode}
                  />

                  <SelectMenu
                    label='País'
                    selected={country}
                    setSelected={setCountry}
                    items={countries}
                  />
                </div>
              </fieldset>

              <div className='pt-5'>
                <button
                  type='submit'
                  className='w-full h-12 flex justify-center items-center font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800'
                  >
                  Confirmar
                </button>
              </div>
            </form>
              )}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const COOKIES_NAME = process.env.COOKIES_NAME
  if (!COOKIES_NAME) {
    throw new Error('COOKIES_NAME is not set')
  }
  const token = context.req.cookies[COOKIES_NAME]
  const session = await getSession(context)

  if (!session || !token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { data } = await httpFetch.get('/user', {
    headers: { Authorization: `beaer ${token}` }
  })

  return {
    props: {
      user: data,
      token
    }
  }
}

export default UserBills
