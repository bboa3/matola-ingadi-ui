import Head from 'next/head'
import React from 'react'

interface Props {
  description: string
  keywords: string
  title: string
  robots?: string
}

const SEO: React.FC<Props> = ({ description, keywords, title, robots }) => (
  <Head>
    <meta name="robots" content={ robots || 'index'} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="author" content="Arlindo Boa, contact arlindojosboa@gmail.com" />
    <meta name="referrer" content='origin' />

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest"></link>

    <meta property="og:url" content='https://mozeconomia.co.mz' />
    <meta property="og:type" content='website' />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content="MozEconomia" />
    <meta property="og:image" content='/img/african-business-male-people-shaking-hands.webp' />

    <meta name="twitter:site" content="@mozeconomia" />
    <meta name="twitter:creator" content="@mozeconomia" />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:title" content={title} />

    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <title>{title}</title>
  </Head>
)

export default SEO
