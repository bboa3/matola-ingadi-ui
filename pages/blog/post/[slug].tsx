import Chip from '@common/Blog/Chip'
import getLanguage from '@common/Blog/lang/page'
import ShowPost from '@common/Blog/ShowPost'
import SimpleLayout from '@components/Layout/Blog/SimpleLayout'
import EmptyList from '@components/Loading/EmptyList'
import { PostDocument, PostsDocument, usePostQuery, usePostsQuery } from '@generated/graphql'
import { client, ssrCache } from '@lib/urql'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'

interface Props {
  slug: string
}

const PostComponent: React.FC<Props> = ({ slug }) => {
  const [{ data }] = usePostQuery({ variables: { slug } })
  const [{ data: postsData }] = usePostsQuery()
  const router = useRouter()
  const { locale } = useRouter()
  const lang = getLanguage(locale!)

  const getRecommendations = useCallback(() => {
    const posts = postsData?.posts
    if (!posts) return null

    return posts.slice(0, 3)
  }, [postsData])

  const post = data?.post

  const recommendations = getRecommendations()

  return (
    <SimpleLayout
      title={post?.seo?.title || 'Blog'}
      description={post?.seo?.description || ''}
      keywords={post?.seo?.keywords.join(', ') || ''}
    >
      <div className='max-w-6xl leading-relaxed min-h-screen mx-auto px-4 sm:px-6 py-12 overflow-hidden'>
        <button
          onClick={() => router.back()}
          className='text-xs text-emerald-500 font-normal block'>
          <span className='text-lg'> &#8592;</span> <span>{lang.GoBackButton}</span>
        </button>
        {
          post
            ? (
              <div className=' my-0 mx-auto max-w-3xl'>
                <header className='text-center'>
                  <p className='text-slate-400'>{lang.published} {post.date}</p>
                  <h1 className='text-5xl font-bold'>
                    {post.title}
                  </h1>
                  <div className='flex justify-center'>
                    {post.categories.map(({ slug, name }) => (
                      <div key={slug} className='m-4'>
                        <Chip label={name} />
                      </div>
                    ))}
                  </div>
                </header>
                <Image
                  width={900}
                  height={900}
                  className='h-full'
                  src={post.coverImage?.url || ''}
                  alt={post.title}
                />
                <div
                  className='p-4 mt-6 blog-content leading-loose flex flex-col justify-center items-start text-slate-800'
                  dangerouslySetInnerHTML={{ __html: post.content.html }}
                />
              </div>
              )
            : (
            <EmptyList />
              )
        }
      </div>
      <div className='w-full h-full min-h-screen border-t pt-12 border-slate-200'>
        <div className='w-full max-w-6xl leading-relaxed mx-auto px-4 sm:px-6 pt-4 pb-12 overflow-hidden'>
          {
            recommendations
              ? (
              <div className='w-full text-center'>
                <h1 className='text-3xl font-bold py-3'>{lang.recommended}</h1>
                <p className='py-2'>{lang.recommendedDescription}</p>
                <div className='flex flex-wrap space-x-3 space-y-3 pt-16'>
                  {
                    recommendations.map((post) => {
                      return (
                        <ShowPost key={post.slug} post={post}/>
                      )
                    })
                  }
                </div>
              </div>
                )
              : null
          }
        </div>
      </div>
    </SimpleLayout>
  )
}

export default PostComponent

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug

  await Promise.all([
    client.query(PostDocument, { slug }).toPromise(),
    client.query(PostsDocument, {}).toPromise()
  ])

  return {
    props: {
      urqlState: ssrCache.extractData(),
      slug
    },
    revalidate: 60 * 10
  }
}
