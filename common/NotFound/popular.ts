import { PresentationChartLineIcon } from '@heroicons/react/24/outline'

export const getPopularPages = (locale: string) => {
  return [
    {
      title: 'Galleria',
      description: '',
      Icon: PresentationChartLineIcon,
      href: '/galeria'
    }
  ]
}
