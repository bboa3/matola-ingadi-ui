import Layout from '@components/Layout'
import { GetServerSideProps } from 'next'
import { getSession, signOut } from 'next-auth/react'
import React from 'react'

const Home: React.FC = () => {
  return (
    <Layout
      title=''
      keywords=''
      description=''
    >
      <h1>Pagina Inicial</h1>
      <button className='mt-3 bg-slate-600' onClick={() => signOut()}>
        SignOut
      </button>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default Home
