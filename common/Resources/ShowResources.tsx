import { Button } from '@components/Button'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Sheet } from 'resources'

interface Props {
  sheet: Sheet
  downloadButton: string
}

const ShowResources: React.FC<Props> = ({ sheet, downloadButton }) => {
  const session = useSession()
  const user = session.data?.user
  const { title, coverImage, categoryId, filename } = sheet
  return (
      <div className='w-64 shadow-lg border border-slate-50 rounded-xl flex flex-col items-center gap-y-6 p-3'>
        <div className='w-full h-40 flex justify-center items-center rounded-t-xl overflow-hidden'>
          <Image
            width={500}
            height={500}
            className='w-full'
            src={coverImage}
            alt={title}
          />
        </div>
        <p>{title}</p>
        <Button
          asChild
          solid
        >
          {
            !user
              ? (
              <button onClick={() => signIn()}>{downloadButton}</button>
                )
              : (
              <Link
                href={`/recursos/download/${categoryId}?filename=${filename}`}
              >
                {downloadButton}
              </Link>
                )
          }
        </Button>
      </div>
  )
}

export default ShowResources
