import { Head, Html, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html lang="pt" className="h-full bg-gray-50">
      <Head />
      <body className="h-full w-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
