import fs from 'fs'
import { importPKCS8, importSPKI, jwtVerify, SignJWT } from 'jose'
import { JWT } from 'next-auth/jwt'

interface SignProps {
  payload?: JWT
  rememberMe?: boolean
}

interface VerifyProps {
  token?: string
}

const algorithm = 'RS256'
const pkcs8 = fs.readFileSync('./private.pem', { encoding: 'utf-8' })
const spki = fs.readFileSync('./public.pem', { encoding: 'utf-8' })

export async function signJWT ({ payload, rememberMe }: SignProps) {
  const privateKey = await importPKCS8(pkcs8, algorithm)

  const expirationIn = rememberMe ? '30d' : '24h'

  const token = await new SignJWT(payload || {})
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setIssuer('urn:ui-me:issuer')
    .setAudience('urn:mozeconomia:audience')
    .setExpirationTime(expirationIn)
    .sign(privateKey)

  return token
}

export async function verifyJWT ({ token }: VerifyProps) {
  const publicKey = await importSPKI(spki, algorithm)

  const { payload } = await jwtVerify(
    token || '',
    publicKey,
    {
      issuer: 'urn:ui-me:issuer',
      audience: 'urn:mozeconomia:audience',
      algorithms: [algorithm]
    }
  )

  return payload
}
