// Environment
export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV === 'production'
export const isTest = process.env.NODE_ENV === 'test'

// API URLs
export const userAPIBaseUrl = process.env.NEXT_PUBLIC_USER_API_URL!
export const billingAPIBaseUrl = process.env.NEXT_PUBLIC_BILLING_API_URL!
export const blogCmsApiURL = process.env.NEXT_PUBLIC_BLOG_CMS_API_URL!

// DATABASE
export const databaseUrl = process.env.DATABASE_URL!

// InstantSearch
export const appId = process.env.NEXT_PUBLIC_INSTANTSEARCH_APP_ID!
export const searchApiKey =
  process.env.NEXT_PUBLIC_INSTANTSEARCH_SEARCH_API_KEY!

// cookies
export const cookiesName = process.env.NEXT_PUBLIC_COOKIES_NAME!

// URL
export const nextAuthUrl = process.env.NEXTAUTH_URL!

// Email Server
export const emailServerUser = process.env.EMAIL_SERVER_USER!
export const emailServerPassword = process.env.EMAIL_SERVER_PASSWORD!
export const emailServerHost = process.env.EMAIL_SERVER_HOST!
export const emailServerPort = process.env.EMAIL_SERVER_PORT!
export const emailFrom = process.env.EMAIL_FROM!

if (
  !appId ||
  !searchApiKey ||
  !userAPIBaseUrl ||
  !blogCmsApiURL ||
  !cookiesName
) {
  throw new Error(
    'An environment variable is missing. Rename the \'.env.sample\' file to \'.env.local\' and change the values.'
  )
}
