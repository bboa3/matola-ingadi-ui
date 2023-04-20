import { Button } from '@components/Button'
import getLanguage from '@components/Nav/lang/manu'
import Link from 'next/link'
import React from 'react'

interface Props {
  locale: string
}

export const GetStartedButton: React.FC<Props> = ({ locale }) => {
  const lang = getLanguage(locale)

  return (
    <Button solid asChild>
      <Link
        href='/contacto'
      >
        {lang.contactButton}
      </Link>
    </Button>
  )
}

export default GetStartedButton
