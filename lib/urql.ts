import { blogCmsApiURL } from '@utils/env'
import { cacheExchange, createClient, dedupExchange, fetchExchange, ssrExchange } from 'urql'

const isServerSide = typeof window === 'undefined'
const ssrCache = ssrExchange({ isClient: !isServerSide })

const client = createClient({
  url: blogCmsApiURL,
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange]
})

export { client, ssrCache }
