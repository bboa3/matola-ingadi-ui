export const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      h1: 'Welcome to Matola Ingadi',
      h2: 'About Us. Our home.',
      description: {
        location: 'Event hall Matola Ingadi, born in 2015, is located in Matola after Externato Cantinho do Céu and Condomínio Niketche, coming from Matola Shoprite side to Malhampsene. We are surrounded by the green of the Matola River, from where it is possible to see the green landscape along with the sunset from our lounge.',
        why: 'The word Ingadi comes from Zulu, which means garden, Matola Ingadi is more than an event hall, it is a garden where dreams come true, where our customers, in the company of those they love most, hold their events and are left with the memory of the green of our garden forever etched in their minds. Matola Ingadi inspires tranquility and brings a fusion between nature and modernism.',
        team: 'All our effort is for the customer to leave our house satisfied and come back more often.'
      },
      chatTitle: 'Talk to us',
      chatButton: 'schedule visit',
      certified: {
        h2: 'We are a Certified Company',
        description: 'Our Economic and Financial Information provision activities have been tested and certified by the Bank of Mozambique through the BM Regulatory Sandbox incubator',
        downloadButton: 'Download Certification'
      }
    },
    {
      locale: 'pt',
      h1: 'Bem vindo a Matola Ingadi',
      h2: 'Sobre nós. Nossa casa.',
      description: {
        location: 'Salão de eventos Matola Ingadi, nascido em 2015, localiza-se na Matola depois do Externato Cantinho do Céu e Condomínio Niketche vindo pelo lado da Shopripe da Matola para Malhapsene. Estamos cercado pelo verde do rio Matola, de onde é possível ver a paisagem verde junto com o cair do sol estando no nosso salão.',
        why: 'A palavra Ingadi provem do Zulu que significa jardim, Matola Ingadi é mais do que um salão de eventos é um jardim onde sonhos são realizados, onde os nossos clientes na companhia daqueles que mais amam realizam os seus eventos e ficam com a memória do verde do nosso jardim para sempre marcada nas suas mentes. Matola Ingadi inspira tranquilidade, traz uma fusão entre a natureza e o modernismo.',
        team: 'Todo o nosso esforço é para garantir que o cliente saia feliz do nosso estabelecimento e que venha mais vezes.'
      },
      chatTitle: 'Fale connosco',
      chatButton: 'Agendar Visita',
      certified: {
        h2: 'Somos Uma Empresa Certificada',
        description: 'As nossas atividades de fornecimento de Informação Económica e Financeira foram testadas e certificadas pelo Banco de Moçambique através da encubadora Sandbox Regulatório.',
        downloadButton: 'Baixar Certificado'
      }
    }
  ]
  return langOptions.find((page) => page.locale === locale)!
}
