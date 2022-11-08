import SuccessAlert from '@components/Alert/Success'
import Layout from '@components/Layout/Admin'
import { httpFetch } from '@lib/fetch'
import { Gallery, User } from 'ingadi'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import React, { FormEvent, useEffect, useState } from 'react'

interface Props {
  user: User
  token: string,
  galleries: Gallery[]
}

const GalleryAdmin: React.FC<Props> = ({ user, token, galleries }) => {
  const [gallery, setGallery] = useState<Gallery>(galleries[0])
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const { images } = gallery
  const [image0, setImage0] = useState<File>()
  const [image0Preview, setImage0Preview] = useState<string>(images[0].url)

  const [image1, setImage1] = useState<File>()
  const [image1Preview, setImage1Preview] = useState<string>(images[1].url)

  const [image2, setImage2] = useState<File>()
  const [image2Preview, setImage2Preview] = useState<string>(images[2].url)

  const [image3, setImage3] = useState<File>()
  const [image3Preview, setImage3Preview] = useState<string>(images[2].url)

  useEffect(() => {
    setShowSuccessAlert(false)

    if (image0) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage0Preview(reader.result as string)
      }
      reader.readAsDataURL(image0)
    } else {
      setImage0Preview(images[0].url)
    }
  }, [image0, gallery])

  useEffect(() => {
    setShowSuccessAlert(false)

    if (image1) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage1Preview(reader.result as string)
      }
      reader.readAsDataURL(image1)
    } else {
      setImage1Preview(images[1].url)
    }
  }, [image1, gallery])

  useEffect(() => {
    setShowSuccessAlert(false)

    if (image2) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage2Preview(reader.result as string)
      }
      reader.readAsDataURL(image2)
    } else {
      setImage2Preview(images[2].url)
    }
  }, [image2, gallery])

  useEffect(() => {
    setShowSuccessAlert(false)

    if (image3) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage3Preview(reader.result as string)
      }
      reader.readAsDataURL(image3)
    } else {
      setImage3Preview(images[3].url)
    }
  }, [image3, gallery])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData()

    if (image0) {
      formData.append('image0', image0)
    }
    if (image1) {
      formData.append('image1', image1)
    }

    if (image2) {
      formData.append('image2', image2)
    }

    if (image3) {
      formData.append('image3', image3)
    }

    formData.append('galleryId', gallery.id)

    httpFetch.post('/design/gallery/images', formData, {
      headers: { Authorization: `beaer ${token}` }
    })
      .then(() => {
        setShowSuccessAlert(true)
      })
      .catch(err => console.log(err))
  }

  return (
    <Layout
      title=''
      keywords=''
      description=''
      avatar={user.image ? user.image : undefined}
    >
      <div className="flex flex-wrap justify-center mt-4">
        { showSuccessAlert
          ? (<SuccessAlert> <span className="inline-block align-middle mr-8">
              <b className="capitalize">{user.name} </b>
              você atualizou a galeria coom sucesso
            </span></SuccessAlert>)
          : null
        }
        <div className='w-full h-full max-w-2xl relative bg-white px-5 rounded-lg'>
          <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {galleries.map((gallery, index) => {
                const lastEventIndex = galleries.length - 1

                if (index !== lastEventIndex) {
                  return (
                    <li key={gallery.id}>
                      <div className="flex items-center">
                        <button
                          onClick={() => setGallery(gallery)}
                          className={`mr-2 text-sm font-medium ${index === 0 ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          {gallery.name}
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
                  <li key={gallery.id} className="text-sm">
                    <button
                      onClick={() => setGallery(gallery)}
                      className="font-medium text-gray-500 hover:text-gray-700"
                    >
                      {gallery.name}
                    </button>
                  </li>
                )
              }
              )}
            </ol>
          </nav>

          <h1 className="text-xl text-center font-bold tracking-tight text-gray-900 sm:text-xl">{gallery.name}</h1>

          <form onSubmit={handleSubmit} className="hidden md:block mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
              <label htmlFor="dropzone-1mage0" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                <Image
                  src={image0Preview}
                  alt={gallery.images[0].alt}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover object-center"
                />
                <input
                  onChange={e => {
                    const file = e.target.files
                    if (file && file[0].type.substring(0, 5) === 'image') {
                      setImage0(file[0])
                    }
                  }}
                  accept='image/*'
                  id="dropzone-1mage0"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>

            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                <label htmlFor="dropzone-1mage1" className="flex flex-col justify-center items-center bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                  <Image
                    src={image1Preview}
                    alt={gallery.images[1].alt}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover object-center"
                  />
                  <input
                    onChange={e => {
                      const file = e.target.files
                      if (file && file[0].type.substring(0, 5) === 'image') {
                        setImage1(file[0])
                      }
                    }}
                    accept='image/*'
                    id="dropzone-1mage1"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
              <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                <label htmlFor="dropzone-1mage2" className="flex flex-col justify-center items-center bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                  <Image
                    src={image2Preview}
                    alt={gallery.images[2].alt}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover object-center"
                  />
                  <input
                    onChange={e => {
                      const file = e.target.files
                      if (file && file[0].type.substring(0, 5) === 'image') {
                        setImage2(file[0])
                      }
                    }}
                    accept='image/*'
                    id="dropzone-1mage2"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="aspect-w-4 relative aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
              <label htmlFor="dropzone-1mage3" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                <Image
                  src={image3Preview}
                  alt={gallery.images[3].alt}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover object-center"
                />
                <input
                  onChange={e => {
                    const file = e.target.files
                    if (file && file[0].type.substring(0, 5) === 'image') {
                      setImage3(file[0])
                    }
                  }}
                  accept='image/*'
                  id="dropzone-1mage3"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>

            <div className='pt-5'>
              <button
                type='submit'
                className='w-full h-12 flex justify-center items-center font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800'
              >
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['next-auth.session-token']
  const session = await getSession(context)

  if (!session || !token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { data: user } = await httpFetch.get('/user', {
    headers: { Authorization: `beaer ${token}` }
  })

  if (!user.admin) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { data: galleries } = await httpFetch.get('/design/gallery')

  return {
    props: {
      user,
      token,
      galleries
    }
  }
}

export default GalleryAdmin
