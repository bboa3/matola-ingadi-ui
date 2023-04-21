import { client, ssrCache } from '@lib/urql'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Provider } from 'urql'
import '../styles/calendar.css'
import '../styles/globals.css'

function MyApp ({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState)
  }

  return (
    <Provider value={client}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  )
}

export default MyApp
