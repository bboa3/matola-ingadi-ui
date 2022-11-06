import Layout from '@components/Layout'
import { httpFetch } from '@lib/fetch'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'

interface Props {
  invoiceUrl: string
}

const UserInvoice: React.FC<Props> = ({ invoiceUrl }) => {
  return (
    <Layout
      title=''
      keywords=''
      description=''
    >
      <div className="flex w-full min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className='w-full max-w-5xl bg-white'>
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

  const { billId, invoiceId } = context.query

  const { data } = await httpFetch.get(`/invoice/document?billId=${billId}&invoiceId=${invoiceId}`, {
    headers: { Authorization: `beaer ${token}` }
  })

  if (data) {
    return {
      redirect: {
        destination: data,
        permanent: false
      }
    }
  }

  return {
    props: {
      invoiceUrl: data
    }
  }
}

export default UserInvoice
