import DataProvider from '@context/data'
import { SessionProvider } from 'next-auth/react'
import '../styles/calendar.css'
import '../styles/globals.css'

export default function App ({
  Component,
  pageProps: { session, ...pageProps }
}: any) {
  return (
    <SessionProvider session={session}>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </SessionProvider>
  )
}
