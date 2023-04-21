import { homePhotos } from '@common/Home/lang/photos'

export const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      h1: 'Choose Matola Ingadi',
      bookingButton: 'Book Now',
      photos: homePhotos,
      description: 'Our happiness is in guaranteeing unique and five-star events, provide an experience that goes according to the dreams of our customers. Matola Ingadi is more than an event hall, it is a garden where dreams come true, where our customers, together with their loved ones, hold their events.',
      highlightsTitle: 'Event Hall Description',
      highlights: {
        groupOne: [
          'Total of 14 000 m² of Area',
          'Event Hall for 350 Guests',
          'Parking for over 200 cars',
          'Space for civil ceremony',
          'Kitchen ready for use in your events'
        ],
        groupTwo: [
          'Bridal and Groom suites',
          'Electric generator available throughout the event',
          'Decorative lighting at your parties',
          'Toilets for women, men and for people with special needs'
        ]
      },
      details: 'We cultivate tranquility, authenticity, spontaneity. We organize events that go hand in hand with love, happiness, friendship, affection and companionship.',
      testimonial: {
        title: 'Testimonial',
        eventType: 'Event'
      }
    },
    {
      locale: 'pt',
      photos: homePhotos,
      bookingButton: 'Reservar Agora',
      h1: 'Escolha Matola Ingadi',
      description: 'A nossa felicidade está em garantir eventos únicos e cinco estrelas, proporcionar uma experiência que vai de acordo com os sonhos dos nossos clientes. Matola Ingadi é mais do que um salão de eventos, é um jardim onde sonhos são realizados, onde nossos clientes na companhia daqueles que mais amam realizam os seus eventos.',
      highlightsTitle: 'Características do Salão',
      highlights: {
        groupOne: [
          'Total de 14 000 m² de Área',
          'Salão para 350 Convidados',
          'Estacionamento para mais de 200 carros',
          'Espaço para cerimonia civil',
          'Cozinha pronta para o uso nos seus eventos'
        ],
        groupTwo: [
          'Suíte para os Noivos',
          'Gerador disponível em todo o evento',
          'Iluminação Decorativa nas suas festas',
          'Banheiros Feminino, Masculino e para Pessoas com Necessidades Especiais'
        ]
      },
      details: 'Alimentamos tranquilidade, autenticidade, espontaneidade. Organizamos eventos que caminham de mãos dadas com o amor, felicidade, amizade, carinho e companheirismo.',
      testimonial: {
        title: 'Depoimentos',
        eventType: 'Evento'
      }
    }
  ]

  return langOptions.find((page) => page.locale === locale)!
}
