import ToolsDownload from '@common/Resources/ResourcesDownload'
import SimpleLayout from '@components/Layout/Tools/SimpleLayout'
import { userHttpFetch } from '@lib/fetch'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { cookiesName, nextAuthUrl } from '@utils/env'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import React from 'react'
import { ResourcesUser } from 'resources'

interface Props {
  token: string
  categoryId: string
  filename: string
}

const Tools: React.FC<Props> = ({ token, categoryId, filename }) => {
  // const { locale } = useRouter()
  // const lang = getLanguage(locale!)

  return (
    <SimpleLayout
      title='Tools - MozEconomia'
      robots='noindex nofollow'
      description='Tools da MozEconomia focado na criação de conteúdos da economia e negócios em Moçambique'
      keywords='Tools da MozEconomia, economia, negócios, economia moçambicana, negócios em moçambique, empreendedorismo, empreendedor, informação financeira, investimento, investidor'
    >
      <ToolsDownload
        filename={filename}
        categoryId={categoryId}
      />
    </SimpleLayout>
  )
}

export default Tools

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, query, resolvedUrl, locale } = context
  const { categoryId, filename } = query

  const token = req.cookies[cookiesName]
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session || !token) {
    return {
      redirect: {
        destination: `login?callbackUrl=${nextAuthUrl}/${locale}${resolvedUrl}`,
        permanent: false
      }
    }
  }

  let resourcesUser: ResourcesUser | null = null

  try {
    const res = await userHttpFetch.get('/tools/user', {
      headers: { Authorization: `beaer ${token}` }
    })
    resourcesUser = res.data
  } catch (e) {}

  if (!resourcesUser || (resourcesUser && resourcesUser.downloads >= 1)) {
    return {
      redirect: {
        destination: `/${locale}/precos`,
        permanent: false
      }
    }
  }

  return {
    props: {
      resourcesUser,
      token,
      categoryId,
      filename
    }
  }
}
