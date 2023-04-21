import { PresentationChartLineIcon } from '@heroicons/react/24/outline'

export const getPopularPages = (locale: string) => {
  return [
    {
      title: locale === 'pt' ? 'Galleria' : 'Gallery',
      description: '',
      Icon: PresentationChartLineIcon,
      href: '/galeria'
    }
  ]
}
