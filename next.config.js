/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'pt',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.mozeconomia.co.mz',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cryptologos.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media-exp1.licdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.graphassets.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'blog.algolia.com',
        pathname: '/**',
      },
    ],
  }
}

module.exports = nextConfig