import Footer from '@components/Footer'
import SEO from '@components/Layout/SEO'
import Nav from '@components/Nav'
import React, { ReactNode } from 'react'

interface Props {
  description: string
  keywords: string
  title: string
  children: ReactNode
}

const Layout: React.FC<Props> = ({ description, keywords, title, children }) => {
  return (
    <>
      <SEO description={description} keywords={keywords} title={title} />

      <Nav />
      <main className='w-full min-h-screen overflow-hidden pt-[3.9rem]'>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
