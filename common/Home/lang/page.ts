
export const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      indicators: {
        h1: {
          text1: 'We provide Economic and Financial Information',
          text2: ' for Business and Investment in Mozambique'
        },
        description: 'We specialize in providing and analyzing data from the national market. We aggregate all economic and financial data. You can download, compare the indicators and use our API.',
        button: 'Indicators'
      },
      consultancy: {
        h1: 'The Right Consultancy For Your Business',
        description: 'Specialized in national market studies, mergers and acquisitions, asset valuation, productivity maximization, competitive leverage, and business valuation.',
        button: 'Consultancy'
      },
      contactButton: 'Contact Sales',
      currenciesTitle: 'Metical Exchange rates',
      currenciesLink: 'More Currencies',
      cryptoTitle: 'Crypto Real Time Prices',
      cryptoLink: 'More Cryptocurrencies',
      certified: {
        h2: 'We are a Certified Company',
        description: 'Our Economic and Financial Information provision activities have been tested and certified by the Bank of Mozambique through the BM Regulatory Sandbox incubator.',
        downloadButton: 'Download Certification'
      }
    },
    {
      locale: 'pt',
      indicators: {
        h1: {
          text1: 'Fornecemos Informação Económica e Financeira',
          text2: ' para Negócios e Investimentos em Moçambique'
        },
        description: 'Somos especializados em fornecer e analisar dados do mercado nacional. Agregamos todos os dados econômicos e financeiros. Você pode baixar, comparar os indicadores e usar a nossa API.',
        button: 'Indicadores'
      },
      consultancy: {
        h1: 'A Consultoria Certa Para o Seu Negócio',
        description: 'Especializados em estudo do mercado nacional, fusões e aquisições, avaliação de Ativos, maximização da produtividade, alavancagem competitiva, e avaliação de negócios.',
        button: 'Consultoria'
      },
      contactButton: 'Fale conosco',
      currenciesTitle: 'Taxas de Câmbio do Metical',
      currenciesLink: 'Mais Moedas',
      cryptoTitle: 'Preços de Criptomoedas em Tempo Real',
      cryptoLink: 'Mais Criptomoedas',
      certified: {
        h2: 'Somos Uma Empresa Certificada',
        description: 'As nossas atividades de fornecimento de Informação Económica e Financeira foram testadas e certificadas pelo Banco de Moçambique através da encubadora Sandbox Regulatório',
        downloadButton: 'Baixar Certificado'
      }
    }
  ]

  return langOptions.find((page) => page.locale === locale)!
}
