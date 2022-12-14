import SEO from '@components/Layout/SEO'
import FooterAdmin from 'components/Footer/FooterUser'
import HeaderUser from 'components/Header/HeaderUser'
import UserNavbar from 'components/Nav/NavUser'
import Sidebar from 'components/Sidebar/SidebarUser'
import React, { ReactNode } from 'react'

interface Props {
  description: string
  keywords: string
  robots?: string
  title: string
  avatar?: string
  children: ReactNode
}

const User: React.FC<Props> = ({ description, keywords, title, children, avatar, robots }) => {
  return (
    <>
      <SEO description={description} keywords={keywords} title={title} robots={robots} />
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <UserNavbar avatar={avatar} />
        {/* Header */}
        <HeaderUser />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  )
}

export default User
