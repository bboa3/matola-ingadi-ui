import Footer from '@components/Footer'
import SEO from '@components/Layout/SEO'
import Nav from '@components/Nav/Blog/Nav'
import React, { ReactNode } from 'react'

interface Props {
  description: string
  keywords: string
  title: string
  children: ReactNode
  robots?: string
}

const SimpleLayout: React.FC<Props> = ({ description, robots, keywords, title, children }) => {
  return (
    <>
      <SEO description={description} keywords={keywords} robots={robots} title={title} />

      <Nav />
      <main className='w-full min-h-screen overflow-hidden pt-12 lg:pt-32 pb-3 text-slate-800'>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default SimpleLayout
