import CardNextEvents from '@components/Cards/CardNextEvents'
import Layout from '@components/Layout/User'
import Loading from '@components/Loading'
import { httpFetch } from '@lib/fetch'
import { Bill } from 'bill'
import CardUserInvoices, { CustomInvoice } from 'components/Cards/CardUserInvoices'
import { GetServerSideProps } from 'next'
import { User } from 'next-auth'
import { getSession } from 'next-auth/react'
import React, { useCallback } from 'react'

interface Props {
  bills: Bill[]
  user: User
}

const UserBills: React.FC<Props> = ({ bills, user }) => {
  const findInvoices = useCallback(() => {
    if (!bills) return null
    const allInvoices: CustomInvoice[] = []

    for (const bill of bills) {
      const { invoices, id } = bill

      for (const invoice of invoices) {
        allInvoices.push({
          ...invoice,
          billId: id
        })
      }
    }

    return allInvoices
  }, [bills])

  const invoices = findInvoices()

  if (!invoices) return <Loading />

  return (
    <Layout
      title=''
      keywords=''
      description=''
      avatar={user.image ? user.image : undefined}
    >
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardUserInvoices invoices={invoices} />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardNextEvents invoices={invoices} />
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

  const { data } = await httpFetch.get('/bills', {
    headers: { Authorization: `beaer ${token}` }
  })

  return {
    props: {
      bills: data,
      user: session.user
    }
  }
}

export default UserBills
