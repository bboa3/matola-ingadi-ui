import Highlight from '@common/Blog/Highlight'
import ShowPost from '@common/Blog/ShowPost'
import SimpleLayout from '@components/Layout/Blog/SimpleLayout'
import EmptyList from '@components/Loading/EmptyList'
import { PostsDocument, usePostsQuery } from '@generated/graphql'
import { client, ssrCache } from '@lib/urql'
import { GetStaticProps } from 'next'

export default function Blog () {
  const [{ data }] = usePostsQuery()

  const posts = data?.posts

  return (
    <SimpleLayout
      title='Blog - MozEconomia'
      description='Blog da MozEconomia focado na criação de conteúdos da economia e negócios em Moçambique'
      keywords='Blog da MozEconomia, economia, negócios, economia moçambicana, negócios em moçambique, empreendedorismo, empreendedor, informação financeira, investimento, investidor'
    >
      <div className='py-20 w-full h-full'>
        {
          posts
            ? (
            <div className='md:flex w-full'>
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

export const getStaticProps: GetStaticProps = async () => {
  await client.query(PostsDocument, {}).toPromise()

  return {
    props: {
      urqlState: ssrCache.extractData()
    }
  }
}
