import OfficeLocationIcon from '@assets/icons/OfficeLocation'
import { Button } from '@components/Button'
import Input from '@components/Form/Input'
import SelectMenu from '@components/Form/Select'
import Textarea from '@components/Form/Textarea'
import SimpleLayout from '@components/Layout/MatolaIngadi/SimpleLayout'
import { httpFetch } from '@lib/fetch'
import getValidator from '@lib/validator/contact'
import getLanguage from 'common/Contact/lang/page'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { MdOutlineAttachEmail } from 'react-icons/md'
import { TfiHeadphoneAlt } from 'react-icons/tfi'

interface UseFormikData {
  name: string
  email: string
  phoneNumber: string
  message: string
}

const ContactPage: React.FC = () => {
  const { locale, push, query: { serviceId } } = useRouter()
  const lang = getLanguage(locale!)
  const { services } = lang
  const [service, setService] = useState(services[0])

  useEffect(() => {
    const found = services.find(({ id }) => id === serviceId)

    if (found) {
      setService(found)
    }
  }, [])

  const { errors, values, handleChange, handleSubmit } = useFormik<UseFormikData>({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      message: ''
    },
    validationSchema: getValidator(locale!),
    onSubmit: (values) => {
      const data = {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        message: values.message,
        service: service.name
      }

      console.log(data)

      httpFetch.post('/mail/support', data)
        .then(() => {
          push('/contacto/enviado')
        })
        .catch(err => console.log(err))
    }
  })

  return (
    <SimpleLayout
      robots='noindex nofollow'
      title='Preços | matolaingadi'
      description='Preço dos serviços da matolaingadi'
      keywords='moçambique, economia, dados, finança, comércio, mercado, capital, despesas, Hipoteca, dinheiro'
    >
      <div className='flex w-full flex-col md:flex-row min-h-full py-12 md:py-0 px-4 sm:px-6 md:px-0'>
        <section className='w-full md:w-1/2 h-fit md:h-full text-white overflow-hidden'>
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <div className='w-full h-full md:min-h-screen relative flex justify-center bg-gradient-to-tr from-slate-900 to-green-900 px-3 sm:px-4 lg:px-6'>
              <div className='w-full h-full mt-9 py-9 px-6 space-y-6'>
                <div className='flex items-center gap-3'>
                  <div>
                    <TfiHeadphoneAlt className='w-9 h-9 block text-green-500' aria-hidden="true" />
                  </div>
                  <span className='block'>+258 87 44 44 689</span>
                </div>
                <div className='flex items-center gap-3'>
                  <div>
                    <MdOutlineAttachEmail className='w-9 h-9 block text-green-500' aria-hidden="true" />
                  </div>
                  <span className='block'>contacto@matolaingadi.co.mz</span>
                </div>
                <div className='w-full flex items-center gap-3'>
                  <div>
                    <OfficeLocationIcon className='w-9 h-9 block fill-green-500' aria-hidden="true" />
                  </div>
                  <span className='block'>Matola J, Cidade da Matola, Matola 1114, Moçambique.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='w-full md:w-1/2 min-h-screen'>
          <form onSubmit={handleSubmit} className="w-full mt-3 max-w-2xl space-y-5 border md:border-none rounded-md p-3 md:p-12">
            <span className='text-xl font-medium'>{lang.form.title}</span>
            <Input
                label={lang.form.name}
                id='name'
                type='text'
                value={values.name}
                onChange={handleChange}
                error={errors.name}
              />

              <Input
                label={lang.form.email}
                id='email'
                type='email'
                value={values.email}
                onChange={handleChange}
                error={errors.email}
              />

              <Input
                label={lang.form.phoneNumber}
                id='phoneNumber'
                type='tel'
                value={values.phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
              />

              <SelectMenu
                label={lang.form.service}
                selected={service}
                setSelected={setService}
                items={services}
              />

              <Textarea
                label={lang.form.message}
                id='message'
                rows={6}
                value={values.message}
                onChange={handleChange}
                error={errors.message}
              />

            <div className='pt-5 w-full'>
              <Button solid type='submit'>
                {lang.form.submitButton}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </SimpleLayout>
  )
}

export default ContactPage
