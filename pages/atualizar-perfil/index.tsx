import Input from '@components/Form/Imput'
import SelectMenu from '@components/Form/Select'
import Layout from '@components/Layout'
import { DataContext } from '@context/data'
import { httpFetch } from '@lib/fetch'
import validator from '@lib/validator/user'
import { countryList } from '@utils/address/countryList'
import { useFormik } from 'formik'
import { User } from 'ingadi'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'

interface Props {
  user: User
  token: string
}

const countries = countryList.map(c => ({ id: c, name: c }))

const PerfilUpdate: React.FC<Props> = ({ user, token }) => {
  const { data } = useContext(DataContext)
  const router = useRouter()
  const eventReservation = data?.eventReservation

  useEffect(() => {
    if (!eventReservation) {
      router.push('/precos')
    }
  }, [])

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
      httpFetch.put('user', {
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
      }).then(({ data }) => {
        console.log(data)
      })
        .catch(err => console.log(err))

      // router.push('/atualizar-perfil')
    }
  })

  return (
      <Layout
        title=''
        keywords=''
        description=''
      >
        <div className='flex justify-center py-24' >
          <form onSubmit={handleSubmit} className="w-full h-full max-w-2xl space-y-5">
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

              <div className='grid grid-cols-3 gap-2 justify-between items-center'>
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
                Fazer reserva
              </button>
            </div>
          </form>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['next-auth.session-token']
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

export default PerfilUpdate
