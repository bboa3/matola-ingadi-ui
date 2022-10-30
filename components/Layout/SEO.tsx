import Head from 'next/head'
import React from 'react'

interface Props {
  description: string
  keywords: string
  title: string
}

const SEO: React.FC<Props> = ({ description, keywords, title }) => (
  <Head>
    <meta name="robots" content="index" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest"></link>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <title>{title}</title>
  </Head>
)

export default SEO
