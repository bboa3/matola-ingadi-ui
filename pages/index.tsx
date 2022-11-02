import Layout from '@components/Layout'
import { events } from '@utils/events'
import { Event } from 'ingadi'
import Image from 'next/image'
import React, { useState } from 'react'

const Home: React.FC = () => {
  const [event, setEvent] = useState<Event>(events[0])

  return (
    <Layout
      title=''
      keywords=''
      description=''
    >
      <div className="bg-white">
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
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
              <Image
                src={event.images[0].src}
                alt={event.images[0].alt}
                width={300}
                height={300}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <Image
                src={event.images[1].src}
                alt={event.images[1].alt}
                width={300}
                height={300}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <Image
                src={event.images[2].src}
                alt={event.images[2].alt}
                width={300}
                height={300}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
              <Image
                src={event.images[3].src}
                alt={event.images[3].alt}
                width={300}
                height={300}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* event info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"></div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">event information</h2>
              <div className='flex items-end justify-center'>
                <p className="text-3xl tracking-tight text-gray-900">{event.price}/ </p>
                <p className="text-base font-bold text-gray-500">{event.pricingModel}</p>
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

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Faça uma reserva
              </button>
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
      </div>
    </Layout>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context)

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {}
//   }
// }

export default Home
