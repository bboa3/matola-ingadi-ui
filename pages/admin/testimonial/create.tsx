import userImg from '@assets/img/user'
import SuccessAlert from '@components/Alert/Success'
import Input from '@components/Form/Imput'
import SelectMenu from '@components/Form/Select'
import Textarea from '@components/Form/Textarea'
import Layout from '@components/Layout/Admin'
import { httpFetch } from '@lib/fetch'
import { eventTypes } from '@lib/validator/event-reservation'
import validator from '@lib/validator/testimonial'
import { useFormik } from 'formik'
import { User } from 'ingadi'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface Props {
  user: User
  token: string
}

const TestimonialPage: React.FC<Props> = ({ user, token }) => {
  const [image, setImage] = useState<File>()
  const [eventType, setEventType] = useState(eventTypes[0])
  const [showImageError, setShowImageError] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>(userImg)

  useEffect(() => {
    setShowSuccessAlert(false)

    if (image) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(image)

      setShowImageError(false)
    } else {
      setImagePreview(userImg)
    }
  }, [image])

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validate: (_values) => {
      if (!image) { return setShowImageError(true) }
    },
    validationSchema: validator,
    onSubmit: (values) => {
      const formData = new FormData()

      if (image) {
        formData.append('image', image)
      }

      formData.append('name', values.name)
      formData.append('eventType', eventType.name)
      formData.append('description', values.description)

      httpFetch.post('/design/testimonial', formData, {
        headers: { Authorization: `beaer ${token}` }
      })
        .then(() => {
          setShowSuccessAlert(true)
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
        { showSuccessAlert
          ? (<SuccessAlert> <span className="inline-block align-middle mr-8">
              <b className="capitalize">{user.name} </b>
              você atualizou o testemunho com sucesso
            </span></SuccessAlert>)
          : null
        }
        <div className='w-full h-full max-w-2xl relative bg-white px-5 rounded-lg'>
          <form onSubmit={handleSubmit} className="w-full h-full space-y-5">
            <div className="w-full flex flex-col justify-center items-center">
              <label htmlFor="dropzone-image" className="h-24 w-24 flex flex-col rounded-full justify-center items-center bg-gray-50 border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                <Image
                  src={imagePreview}
                  alt=''
                  width={300}
                  height={300}
                  className="h-full w-full rounded-full object-cover object-center"
                />
                <input
                  onChange={e => {
                    const file = e.target.files
                    if (file && file[0].type.substring(0, 5) === 'image') {
                      setImage(file[0])
                    }
                  }}
                  accept='image/*'
                  id="dropzone-image"
                  type="file"
                  className="hidden"
                />
              </label>
              {showImageError
                ? (
                <span className='h-5 block text-sm text-red-500'>Adicione a photo do cliente</span>
                  )
                : null
              }
            </div>

            <Input
              label='Nome'
              id='name'
              type='text'
              value={values.name}
              onChange={handleChange}
              error={errors.name}
            />

            <SelectMenu
              label='Evento'
              selected={eventType}
              setSelected={setEventType}
              items={eventTypes}
            />

            <Textarea
              label='Mensagem'
              id='description'
              value={values.description}
              onChange={handleChange}
              error={errors.description}
            />

            <div className='pt-5'>
              <button
                type='submit'
                className='w-full h-12 flex justify-center items-center font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800'
                >
                Confirmar
              </button>
            </div>
          </form>
        </div>
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

  const { data: user } = await httpFetch.get('/user', {
    headers: { Authorization: `beaer ${token}` }
  })

  if (!user.admin) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      user,
      token
    }
  }
}

export default TestimonialPage
