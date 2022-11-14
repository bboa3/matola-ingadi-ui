import Layout from '@components/Layout/Admin'
import { httpFetch } from '@lib/fetch'
import { Testimonial } from 'design'
import { User } from 'ingadi'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  user: User
  token: string,
  testimonials: Testimonial[]
}

const TestimonialPage: React.FC<Props> = ({ user, token, testimonials }) => {
  return (
    <Layout
      title=''
      keywords=''
      description=''
      avatar={user.image ? user.image : undefined}
    >
      <div className="flex flex-wrap justify-center mt-4">
        <div className='w-full h-full max-w-2xl relative bg-white px-5 rounded-lg space-y-6'>
          <div className='w-full flex justify-end mt-5'>
            <Link
              href={'/admin/testimonial/create'}
              className='w-48 h-12 flex justify-center items-center font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700'
            >
              Registrar Testemunho
            </Link>
          </div>

          {
            testimonials.map(({ id, name, eventType, description, image }) => (
              <div key={id} className='flex  flex-col justify-center items-center'>
                <div className="flex h-24 w-24 rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <Image
                    className="h-full w-full rounded-full"
                    src={ image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                    alt=""
                    width={32}
                    height={32}
                  />
                </div>
                <div className='hidden md:block text-center'>
                  <p>{name}</p>
                  <p className='text-indigo-600'>Evento, {eventType}</p>
                </div>
                <p className='text-center'>
                  {description}
                </p>
                <div className='pt-5'>

                <Link
                  href={`/admin/testimonial/edit/${id}`}
                    className='w-32 h-12 flex justify-center items-center font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800'
                  >
                  Editar
                </Link>
                </div>
              </div>
            ))
          }
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

  const { data: testimonials } = await httpFetch.get('/design/testimonial')

  return {
    props: {
      user,
      token,
      testimonials
    }
  }
}

export default TestimonialPage
