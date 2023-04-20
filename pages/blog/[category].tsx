import Highlight from '@common/Blog/Highlight'
import ShowPost from '@common/Blog/ShowPost'
import SimpleLayout from '@components/Layout/Blog/SimpleLayout'
import EmptyList from '@components/Loading/EmptyList'
import { PostsByCategoryDocument, usePostsByCategoryQuery } from '@generated/graphql'
import { client, ssrCache } from '@lib/urql'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

interface Props {
  slug: string
}

const Blog: React.FC<Props> = ({ slug }) => {
  const [{ data }] = usePostsByCategoryQuery({ variables: { slug } })

  const posts = data?.posts

  return (
    <SimpleLayout
      title='Blog - MozEconomia'
      description='Blog da MozEconomia focado na criação de conteúdos da economia e negócios em Moçambique'
      keywords='Blog da MozEconomia, economia, negócios, economia moçambicana, negócios em moçambique, empreendedorismo, empreendedor, informação financeira, investimento, investidor'
    >
      <div className='py-20'>
        {
          posts
            ? (
            <div className='md:flex'>
              <Highlight />
              <div className='h-full max-w-5xl flex-1 flex flex-wrap gap-4 px-8'>
                {
                  posts.map((post) => {
                    return (
                      <ShowPost key={post.slug} post={post}/>
                    )
                  })
                }
              </div>
            </div>
              )
            : (
            <EmptyList />
              )
        }
      </div>
    </SimpleLayout>
  )
}

export default Blog

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { category: 'economia' } },
      { params: { category: 'negocio' } },
      { params: { category: 'financas-e-contabilidade' } }
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.category
  await client.query(PostsByCategoryDocument, { slug }).toPromise()

  return {
    props: {
      urqlState: ssrCache.extractData(),
      slug
    },
    revalidate: 60 * 10
  }
}
