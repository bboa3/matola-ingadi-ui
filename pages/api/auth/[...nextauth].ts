import clientPromise from '@lib/mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,

      profile (profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,

      profile (profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture.data.url
        }
      }
    })
    // ...add more providers here
  ],
  pages: {
    signIn: '/login',
    verifyRequest: '/verify-request' // (used for check email message)
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  adapter: MongoDBAdapter(clientPromise)
}
export default NextAuth(authOptions)
