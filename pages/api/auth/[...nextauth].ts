import { signJWT, verifyJWT } from '@lib/jwt'
import { sendVerificationRequest } from '@lib/mail/send-verification-request'
import clientPromise from '@lib/mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { emailFrom, emailServerHost, emailServerPassword, emailServerPort, emailServerUser } from '@utils/env'
import axios from 'axios'
import NextAuth, { AuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import LinkedinProvider from 'next-auth/providers/linkedin'

export const authOptions: AuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: emailServerHost,
        port: Number(emailServerPort),
        auth: {
          user: emailServerUser,
          pass: emailServerPassword
        }
      },
      from: emailFrom,
      sendVerificationRequest
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
    LinkedinProvider({
      async profile (profile, tokens) {
        const { data } = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
          {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`
            }
          })

        return {
          id: profile.id,
          name: `${profile.localizedFirstName} ${profile.localizedLastName}`,
          email: data?.elements?.[0]?.['handle~']?.emailAddress,
          image:
          profile.profilePicture?.['displayImage~']?.elements?.[0]
            ?.identifiers?.[0]?.identifier
        }
      },
      clientId: process.env.LINKEDIN_ID!,
      clientSecret: process.env.LINKEDIN_SECRET!
    })
  ],
  pages: {
    signIn: '/login',
    verifyRequest: '/verify-request' // (used for check email message)
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt' },
  jwt: {
    async encode ({ token }) {
      const jwt = await signJWT({ payload: token, rememberMe: false })
      return jwt
    },
    async decode ({ token }) {
      const payload = await verifyJWT({ token })

      return payload
    }
  }
}
export default NextAuth(authOptions)
