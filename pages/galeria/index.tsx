import { getLanguage } from '@common/Gallery/lang/page'
import SimpleLayout from '@components/Layout/MatolaIngadi/SimpleLayout'
import { createDate } from '@utils/date'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  age: number
}

const GalleryPage: React.FC<Props> = () => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)
  console.log(lang)

  return (
  <SimpleLayout
    title='Quem Somos'
    description='Organizamos eventos que caminham de mãos dadas com o amor, felicidade, amizade, carinho e companheirismo.'
    keywords='Matola Ingadi, Salão de Eventos, Casamentos, Aniversários'
  >
    <div className='w-full flex flex-col items-center min-h-screen mx-auto py-14 overflow-hidden'>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="grid gap-4">
              <div>
                  <Image
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                    alt=""
                    width={500}
                    height={500}
                  />
              </div>
              <div>
                  <Image
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
                    alt=""
                    width={500}
                    height={500}
                  />
              </div>
              <div>
                  <Image
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
                    alt=""
                    width={500}
                    height={500}
                  />
              </div>
          </div>
          <div className="grid gap-4">
              <div>
                  <Image
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
                    alt=""
                    width={500}
                    height={500}
                  />
              </div>
              <div>
                  <Image
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
                    alt=""
                    width={500}
                    height={500}
                  />
              </div>
              <div>
                  <Image
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
                    alt=""
                    width={500}
                    height={500}
                  />
              </div>
          </div>
          <div className="grid gap-4">
              <div>
                  <Image
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
                    alt=""
                    width={500}
                    height={500}
                  />
              </div>
              <div>
                  <Image
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
                    alt=""
                    width={500}
                    height={500}
                  />
              </div>
              <div>
                  <Image
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
                    alt=""
                    width={500}
                    height={500}
                  />
              </div>
          </div>
          <div className="grid gap-4">
              <div>
                  <Image
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
                    alt=""
                    width={500}
                    height={500}
                  />
              </div>
              <div>
                  <Image
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
                    alt=""
                    width={500}
                    height={500}
                  />
              </div>
              <div>
                  <Image
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
                    alt=""
                    width={500}
                    height={500}
                  />
              </div>
          </div>
      </div>

    </div>
  </SimpleLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const mozEconomiaBirthDay = createDate(new Date(2015, 0, 1))
  const now = createDate(new Date())

  const age = now.diff(mozEconomiaBirthDay, 'month') + 1

  return {
    props: {
      age
    },
    revalidate: 24 * 60 * 60
  }
}

export default GalleryPage
