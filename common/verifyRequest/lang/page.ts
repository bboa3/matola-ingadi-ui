export const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      h1: 'Check your email inbox',
      p: 'A sign in link has been sent to your email address.'
    },
    {
      locale: 'pt',
      h1: 'Verifique sua caixa de email',
      p: 'Um link de login foi enviado para o seu endereço de e-mail.'
    }
  ]
  return langOptions.find((page) => page.locale === locale)!
}
