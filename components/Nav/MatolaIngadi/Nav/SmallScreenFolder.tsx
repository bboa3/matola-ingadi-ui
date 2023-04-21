import { Menu } from 'blog'
import Link from 'next/link'
import React from 'react'

interface Props {
  menu: Menu
}

export const FolderComponent: React.FC<Props> = ({ menu }) => {
  return (
    <>
      {
        menu.pages.map(({ id, name }) => (
          <Link
            key={id}
            href={`${menu.id}/${id}`}
            className='w-full flex justify-between items-center my-2 py-1 px-3 rounded-full hover:bg-slate-100 active:bg-slate-100'
          >
            <span className='text-slate-600'>
              {name}
            </span>
          </Link>
        ))
      }
    </>
  )
}

export default FolderComponent
