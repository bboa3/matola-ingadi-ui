import getLanguage from '@common/Resources/ResourcesDownload/lang/page'
import { Button } from '@components/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'

interface Props {
  filename: string
  categoryId: string
}

const ToolsDownload: React.FC<Props> = ({ filename, categoryId }) => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)

  const downloadButtonRef = useRef<any>()

  useEffect(() => {
    downloadButtonRef.current.click()
  }, [])

  return (
    <div className='w-full flex justify-center'>
      <div className="flex flex-col w-full max-w-3xl min-h-full items-center justify-center py-14 px-4 sm:px-6 lg:px-8">
        <div className='space-y-3'>
          <h1 className='text-5xl font-semibold'>{lang.h1}</h1>
          <p className='leading-loose'>
            {lang.description.text1}{' '}
            <span className='text-emerald-500 underline'>{filename}</span>
            {' '}{lang.description.text2}
          </p>
          <Button
            asChild
            solid
          >
            <Link
              href={'/recursos'}
            >
              {lang.downloadMoreButton}
            </Link>
          </Button>
          <Link ref={downloadButtonRef} href={`/api/smartSheets/${categoryId}/${filename}`}>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ToolsDownload
