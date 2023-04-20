import { Post } from '@generated/graphql'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  post: any
}

const ShowPost: React.FC<Props> = ({ post }) => {
  const { author, slug, title, categories, coverImage, date, readTime } = post as Post

  return (
    <Link
      key={slug}
      href={`/blog/post/${slug}`}
      className='w-full max-w-[24rem] flex items-center flex-col'
    >
      <div className='w-full h-40 overflow-hidden rounded-xl'>
        <Image
          width={500}
          height={500}
          className='rounded-xl'
          src={coverImage?.url || ''}
          alt={title}
        />
      </div>
      <div className='relative w-[90%] bg-white -top-6 px-6 py-5 rounded-xl shadow shadow-slate-200'>
        <h3 className='pb-4'>
          <span className='flex text-slate-600 text-sm font-light'>
            {categories.map(category => <span key={category.id}>{category.name} </span>)}
          </span>
          <span className='text-lg font-bold text-slate-900'>
            {title}
          </span>
        </h3>
        <div className='border-t border-slate-300 pt-4 flex items-center space-x-3'>
          <Image
            width={500}
            height={500}
            className='w-14 h-14 rounded-full'
            src={author?.picture?.url || ''}
            alt={author?.name || ''}
          />
          <div>
            <span className='block text-lg text-slate-800 font-bold'>{author?.name}</span>
            <span className='flex space-x-2 text-slate-600 font-light text-sm'>
              <span>{date}</span>
              <span className=' font-extrabold'>.</span>
              <span>{readTime} minutos de leitura</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ShowPost
