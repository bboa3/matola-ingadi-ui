export const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      h1: 'Economic and Financial Information for business and investments in Mozambique',
      description: 'We provide economic and financial information for businesses and investments in Mozambique.',
      partners: 'Partners',
      indicators: 'Economic and Financial Indicators',
      age: 'Months online',
      whyTitle: 'Why?',
      whyDescription: [
        'Imagine if you could have all the economic and financial information of Mozambique, the Money Market, the Credit Market, the Capital Market, the Foreign Exchange Market, the Real Estate Market, GDP, Inflation, etc., you would make wiser decisions about your investments, right? You would know exactly where to invest and the return on investments.',
        'Yes, it is for this reason that MozEconomia was born, a platform that aggregates all Mozambican financial and economic information.'
      ],
      sandBoxTitle: [
        'Regulatory Sandbox',
        'of the Bank of Mozambique'
      ],
      sandBoxDescription: [
        'MozEconomia is a participant in the Regulatory Sandbox of the Bank of Mozambique, which is a regulatory environment with the aim of monitoring and analyzing products, services and financial solutions so that they are the most suitable to the public.'
      ],
      sandBoxLink: 'More information',
      chatTitle: 'Talk to us',
      chatButton: 'Schedule chat',
      certified: {
        h2: 'We are a Certified Company',
        description: 'Our Economic and Financial Information provision activities have been tested and certified by the Bank of Mozambique through the BM Regulatory Sandbox incubator',
        downloadButton: 'Download Certification'
      }
    },
    {
      locale: 'pt',
      h1: 'Informação Económica e Financeira para negócios e investimentos em Moçambique',
      description: 'Fornecendo informação económica e financeira para negócios e investimentos em Moçambique.',
      partners: 'Parceiros',
      indicators: 'Indicadores Econômicos e Financeiros',
      age: 'Meses online',
      whyTitle: 'Porquê?',
      whyDescription: [
        'Imagine se você pudesse ter toda a informação económica e financeira de Moçambique, Mercado Monetário, Mercado de Crédito, Mercado de Capitais, Mercado Cambial, Mercado Imobiliário, PIB, Inflação, etc., tomaria decisões mais sábias sobre o seu investimentos, certo? Você saberia exatamente onde investir e o retorno sobre os investimentos.',
        'Sim, é por este motivo que nasce a MozEconomia, uma plataforma que agrega toda a informação financeira e económica moçambicana.'
      ],
      sandBoxTitle: [
        'Sandbox Regulatório',
        'do Banco de Moçambique'
      ],
      sandBoxDescription: [
        'A MozEconomia é participante do Sandbox Regulatório do Banco de Moçambique, que é um ambiente regulamentar com o objectivo de acompanhar e analisar produtos, serviços e soluções financeiras para que sejam os mais adequados ao público.'
      ],
      sandBoxLink: 'Saber Mais',
      chatTitle: 'Fale connosco',
      chatButton: 'Agendar Chat',
      certified: {
        h2: 'Somos Uma Empresa Certificada',
        description: 'As nossas atividades de fornecimento de Informação Económica e Financeira foram testadas e certificadas pelo Banco de Moçambique através da encubadora Sandbox Regulatório.',
        downloadButton: 'Baixar Certificado'
      }
    }
  ]
  return langOptions.find((page) => page.locale === locale)!
}
