const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      h1: 'Scale your business with our smart spreadsheet templates',
      description: 'Achieve more by automating your work with our Accounting and Finance, Marketing, Sales, Human Resources and Management worksheets.',
      downloadButton: 'Download',
      categorySelectorLabel: 'Categories'
    },
    {
      locale: 'pt',
      h1: 'Escale seu negócio com nossos modelos de planilhas inteligentes',
      description: 'Alcance mais automatizando seu trabalho com nossas planilhas de Contabilidade e Finanças, Marketing, Vendas, Recursos Humanos e Gestão.',
      downloadButton: 'Baixar',
      categorySelectorLabel: 'Categorias'
    }
  ]

  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
