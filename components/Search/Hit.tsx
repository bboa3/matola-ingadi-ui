import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Highlight } from 'react-instantsearch-hooks-web'

interface Props {
  hit: {
    title: string
    genre: string[]
    description: string
    slug: string
  }
}

export default function Hit ({ hit }: Props) {
  const { description, slug } = hit

  return (
    <Link
      className='block w-full my-2.5 px-2 py-1 hover:bg-slate-400/30 rounded-lg'
      href={slug}
    >
      <article className="w-full flex items-center">
        <div className="w-4 h-4">
          <MagnifyingGlassIcon className='w-full h-full text-slate-400' aria-hidden="true" />
        </div>
        <div className="flex flex-1 text-slate-600 flex-col px-2 truncate">
          <h2>
            <Highlight attribute="title" hit={hit as any} />
          </h2>
          <div className='flex'>
            <ChevronDownIcon className='hidden md:block w-4 h-4 rotate-45' aria-hidden="true" />
            <div>
              <p className='ml-2 text-sm font-light truncate'>
                {description}
              </p>
              <p className='ml-2 text-sm font-light truncate'>
                <span className='text-xs'>
                  <Highlight attribute="genre" hit={hit as any} />
                </span>
              </p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
