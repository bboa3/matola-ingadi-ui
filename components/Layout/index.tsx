import Footer from '@components/Footer'
import SEO from '@components/Layout/SEO'
import Nav from '@components/Nav'
import React, { ReactNode } from 'react'

interface Props {
  description: string
  keywords: string
  title: string
  robots?: string
  children: ReactNode
  avatar?: string
}

const Layout: React.FC<Props> = ({ description, keywords, title, avatar, children, robots }) => {
  return (
    <>
      <SEO description={description} keywords={keywords} title={title} robots={robots} />

      <Nav avatar={avatar} />
      <main className='w-full min-h-screen h-full overflow-hidden'>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
