
export const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      linkedin: 'Login with LinkedIn',
      google: 'Login with Google',
      or: 'Or',
      emailLabel: 'Your email',
      emailPlaceholder: 'Your email address',
      rememberLabel: 'Remember me',
      signInButton: 'Sign In',
      signUpButton: 'Subscribe',
      terms: 'We’ll always treat your personal details with care. By submitting this form you consent to allow Matola Ingadi to store and process the personal information submitted above to email you information about sales, exclusive offers, and latest info from Matola Ingadi. Thank you for your interest!'
    },
    {
      locale: 'pt',
      linkedin: 'Login com Linkedin',
      google: 'Login com Google',
      or: 'Ou',
      emailLabel: 'Seu email',
      emailPlaceholder: 'Seu endereço de email',
      rememberLabel: 'Lembrar de me',
      signInButton: 'Entrar',
      signUpButton: 'Escrever-se',
      terms: 'Sempre trataremos seus dados pessoais com cuidado. Ao enviar este formulário, você concorda em permitir que a Matola Ingadi armazene e processe as informações pessoais enviadas acima para enviar e-mails com informações sobre vendas, ofertas exclusivas e informações mais recentes da Matola Ingadi. Obrigado pelo seu interesse!'
    }
  ]
  return langOptions.find((page) => page.locale === locale)!
}
