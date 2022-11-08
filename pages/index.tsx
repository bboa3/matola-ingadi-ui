import Gallery from '@components/Gallery'
import Layout from '@components/Layout'
import { httpFetch } from '@lib/fetch'
import { events } from '@utils/events'
import { Event, Pricing } from 'ingadi'
import { GetStaticProps } from 'next'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { useState } from 'react'

const CardTestimonial = dynamic(() => import('@components/Carousel/CarouselTestimonial'), {
  ssr: false
})

interface Props {
  pricing: Pricing[]
}

const Home: React.FC<Props> = ({ pricing }) => {
  const session = useSession()
  const [event, setEvent] = useState<Event>(events[0])

  const user = session.data?.user

  const standardPricing = pricing[0]

  return (
    <Layout
      title=''
      keywords=''
      description=''
      avatar={user?.image ? user?.image : undefined}
    >
      <div className="w-full bg-white mt-[3rem]">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {events.map((event, index) => {
                const lastEventIndex = events.length - 1

                if (index !== lastEventIndex) {
                  return (
                    <li key={event.id}>
                      <div className="flex items-center">
                        <button
                          onClick={() => setEvent(event)}
                          className={`mr-2 text-sm font-medium ${index === 0 ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          {event.name}
                        </button>
                        <svg
                          width={16}
                          height={20}
                          viewBox="0 0 16 20"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="h-5 w-4 text-gray-300"
                        >
                          <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                      </div>
                    </li>
                  )
                }

                return (
                  <li key={event.id} className="text-sm">
                    <button
                      onClick={() => setEvent(event)}
                      className="font-medium text-gray-500 hover:text-gray-700"
                    >
                      {event.name}
                    </button>
                  </li>
                )
              }
              )}
            </ol>
          </nav>

          <h1 className="text-xl text-center font-bold tracking-tight text-gray-900 sm:text-xl">{event.name}</h1>

          {/* Image gallery */}
          <Gallery images={event.images} />

          {/* event info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"></div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">event information</h2>
              <div className='flex items-end justify-center'>
                <p className="text-3xl font-bold tracking-tight text-gray-900">{standardPricing.price}</p>
                <p className="text-base font-bold text-gray-500"> /{standardPricing.pricingModel}</p>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Salão</h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {event.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href='/prices'
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Faça uma reserva
              </Link>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{event.description}</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {event.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{event.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full px-4 pt-10 pb-16 sm:px-6'>
          <CardTestimonial />
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await httpFetch.get('/services')

  return {
    props: {
      pricing: data
    },
    revalidate: 25 * 60 * 60
  }
}

export default Home
