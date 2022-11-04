import Layout from '@components/Layout'
import { DataContext } from '@context/data'
import React, { useContext } from 'react'

const PerfilUpdate: React.FC = () => {
  const { data } = useContext(DataContext)

  console.log(data)

  return (
    <Layout
      title=''
      keywords=''
      description=''
    >
      <div className="w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-white">
      </div>
    </Layout>
  )
}

export default PerfilUpdate
