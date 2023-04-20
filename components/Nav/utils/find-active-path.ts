export const findActivePath = (pathname: string) => {
  if (pathname.includes('/blog', 0)) {
    return '/blog'
  }

  if (pathname.includes('/recursos', 0)) {
    return '/recursos'
  }

  if (pathname.includes('/Precos', 0)) {
    return '/precos'
  }

  return '/'
}
