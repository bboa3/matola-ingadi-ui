import SelectMenu, { ItemSelect } from '@components/Form/Select'
import Textarea from '@components/Form/Textarea'
import Layout from '@components/Layout/User'
import { httpFetch } from '@lib/fetch'
import validator from '@lib/validator/admin-payment-confirm'
import { dateFormatter } from '@utils/day'
import { moneyFormatter } from '@utils/money-formatter'
import { paymentMethodCalculator } from '@utils/payment-method-calculator'
import { Bill, Invoice, PaymentMethod } from 'bill'
import { useFormik } from 'formik'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'

interface Props {
  token: string
  invoiceUrl: string
  billId: string
  invoice: Invoice
  paymentMethods: PaymentMethod[]
  selectMethods: ItemSelect[]
}

const UserInvoice: React.FC<Props> = ({ invoiceUrl, token, billId, invoice, paymentMethods, selectMethods }) => {
  const [image, setImage] = useState<File>()
  const [showImageError, setShowImageError] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [selectMethod, setSelectMethod] = useState(selectMethods[0])

  const { invoiceId, service: { eventType, eventDate, guestsNumber }, total: subTotal, dueAt } = invoice

  const paymentMethodDeduction = useCallback(() => {
    const method = paymentMethods.find(({ id }) => selectMethod.id === id)

    const deduction = paymentMethodCalculator({ paymentMethod: method!, subTotal })

    return deduction
  }, [selectMethod])

  const { total, commissionAmount } = paymentMethodDeduction()

  const dueDate = dateFormatter(new Date(dueAt.split('+')[0]))
  const partyAt = dateFormatter(new Date(eventDate))

  useEffect(() => {
    if (image) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(image)

      setShowImageError(false)
    }
  }, [image])

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      description: ''
    },
    validate: (_values) => {
      if (!image) { return setShowImageError(true) }
    },
    validationSchema: validator,
    onSubmit: (values) => {
      const formData = new FormData()

      if (image) {
        formData.append('image', image)
      }

      formData.append('billId', billId)
      formData.append('invoiceId', invoiceId.code)
      formData.append('description', values.description)
      formData.append('paymentMethodId', selectMethod.id)

      httpFetch.post('/confirm-payment/admin', formData, {
        headers: { Authorization: `beaer ${token}` }
      })
        .then(() => {
        })
        .catch(err => console.log(err))
    }
  })

  return (
    <Layout
      title=''
      keywords=''
      description=''
    >
      <div className="flex flex-wrap justify-center mt-4">
        <form onSubmit={handleSubmit} className='w-full h-full max-w-5xl relative bg-white px-5 py-6 rounded-lg divide-y'>
          <div className='space-y-7 lg:space-y-0 lg:grid grid-cols-2 gap-4'>
            <div className=''>
              <h1 className='text-xl md:text-2xl text-red-700 font-medium'>Está fatura ainda não foi paga</h1>
              <p className='text-sm mt-1 lg:mt-0 text-gray-500'>Por favar, selecione a forma de pagamento para confirmar o pagamento</p>
            </div>
            <div className='w-full lg:flex justify-end'>
              <div className='max-w-[22rem] w-full'>
                <SelectMenu
                  label='Forma de pagamento'
                  selected={selectMethod}
                  setSelected={setSelectMethod}
                  items={selectMethods}
                />
              </div>
            </div>
          </div>
          <div className='lg:divide-x lg:grid grid-cols-2 gap-4 py-3'>
            <div className='lg:grid grid-cols-2 gap-4 py-3 lg:pr-3'>
              <div className='space-y-4'>
                <div className=''>
                  <span className='block text-sm text-gray-500'>Evento esperado</span>
                  <p className='text-xl font-medium'>{eventType}</p>
                </div>
                <div>
                  <span className='block text-sm text-gray-500'>Data do evento</span>
                  <p className='text-sm font-medium text-gray-500'>{partyAt}</p>
                </div>
              </div>

              <div className='space-y-4'>
                <div>
                  <span className='block text-sm text-gray-500'>Número de convidados</span>
                  <p className='text-sm font-medium text-gray-500'>{guestsNumber}</p>
                </div>
              </div>
            </div>

            <div className='lg:grid grid-cols-2 gap-4 py-3 lg:pl-3'>
              <div className='space-y-4'>
                <div className='py-3'>
                  <span className='block text-sm text-gray-500'>Data de Vencimento</span>
                  <p className='text-sm font-medium text-gray-500'>{dueDate}</p>
                </div>
                <div>
                  <span className='block text-sm text-gray-500'>Valor total da fatura</span>
                  <p className='text-sm font-medium'>{moneyFormatter(subTotal)}</p>
                </div>
              </div>
              <div className='space-y-4'>
                <div>
                  <span className='block text-sm text-gray-500'>Taxa gateway de pagamento</span>
                  <p className='text-sm font-medium'>{moneyFormatter(commissionAmount)}</p>
                </div>
                <div>
                  <span className='block text-sm text-gray-500'>Total a pagar</span>
                  <p className='text-xl font-medium'>{moneyFormatter(total)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='lg:grid grid-cols-2 gap-4 py-3'>
            <Textarea
              label='Descrição do pagamento'
              id='description'
              value={values.description}
              onChange={handleChange}
              error={errors.description}
            />

            <div className="w-full flex flex-col justify-center items-center">
              <label htmlFor="dropzone-image" className="h-24 w-32 flex flex-col justify-center items-center bg-gray-50 border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                <Image
                  src={imagePreview}
                  alt=''
                  width={300}
                  height={300}
                  className="h-full w-full object-cover object-center"
                />
                <input
                  onChange={e => {
                    const file = e.target.files
                    if (file && file[0].type.substring(0, 5) === 'image') {
                      setImage(file[0])
                    }
                  }}
                  accept='image/*'
                  id="dropzone-image"
                  type="file"
                  className="hidden"
                />
              </label>
              {showImageError
                ? (
                <span className='h-5 block text-sm text-red-500'>Adicione photo para confirmar o pagamento</span>
                  )
                : null
              }
            </div>
          </div>

          <div className='lg:grid grid-cols-2 gap-4 py-3'>
            <div className='lg:grid grid-cols-2 gap-4 py-3 lg:pl-3 space-y-3 lg:space-y-0 mt-3 lg:mt-0'>
              <button
                type='submit'
                className='w-full h-12 flex justify-center items-center font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-500'
              >
                Confirmar Pagamento
              </button>
              <Link
                href={invoiceUrl}
                download
                className='w-full h-12 flex justify-center items-center font-medium rounded-lg border-2 text-indigo-600 border-indigo-600 hover:bg-indigo-100'
              >
                Baixa fatura
              </Link>
            </div>
          </div>
        </form>
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

  const { billId, invoiceId, status } = context.query

  const { data: invoiceUrl } = await httpFetch.get(`/invoice/document?billId=${billId}&invoiceId=${invoiceId}`, {
    headers: { Authorization: `beaer ${token}` }
  })

  if (invoiceUrl && status !== 'PENDING') {
    return {
      redirect: {
        destination: invoiceUrl,
        permanent: false
      }
    }
  }

  const { data: admin } = await httpFetch.get('/user', {
    headers: { Authorization: `beaer ${token}` }
  })

  if (!admin.admin) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { data: bill }: { data: Bill} = await httpFetch.get(`bill/${billId}`, {
    headers: { Authorization: `beaer ${token}` }
  })

  const { data: paymentMethods }: {data: PaymentMethod[] } = await httpFetch.get('/payment-method', {
    headers: { Authorization: `beaer ${token}` }
  })

  if (!bill && !paymentMethods) {
    return {
      redirect: {
        destination: '/user/bills',
        permanent: false
      }
    }
  }

  const selectMethods = paymentMethods.map(({ id, name }) => ({ id, name }))

  const invoice = bill.invoices.find(invoice => invoice.invoiceId.code === invoiceId)

  if (!invoice) {
    return {
      redirect: {
        destination: '/user/bills',
        permanent: false
      }
    }
  }

  return {
    props: {
      token,
      invoiceUrl,
      billId,
      invoice,
      paymentMethods,
      selectMethods
    }
  }
}

export default UserInvoice
