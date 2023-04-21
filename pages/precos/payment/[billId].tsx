import { totalCalculator } from '@common/Prices/invoice/total'
import getLanguage from '@common/Prices/lang/payment/page'
import { Button } from '@components/Button'
import Radio from '@components/Form/Radio'
import { ItemSelect } from '@components/Form/Select'
import SimpleLayout from '@components/Layout/MatolaIngadi/SimpleLayout'
import Table2Cols, { Row } from '@components/Tables/2Cols'
import { billingHttpFetch } from '@lib/fetch'
import { paymentMethods } from '@lib/validator/payment'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { getMonths } from '@utils/date/months'
import { cookiesName, nextAuthUrl } from '@utils/env'
import { moneyFormatter } from '@utils/number-formatter'
import { Invoice, Pricing } from 'bill'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

interface Props {
  token: string
  billId: string
  invoice: Invoice
  pricing: Pricing
}

type SetPaymentMethod = React.Dispatch<React.SetStateAction<ItemSelect>>

const CreateBillPage: React.FC<Props> = ({ token, billId, invoice, pricing }) => {
  const { locale, push } = useRouter()
  const lang = getLanguage(locale!)
  const { months, dateLocalizer } = getMonths(locale!)

  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0])

  const { subTotal, paymentGatewayFee, total } = totalCalculator({
    pricing,
    guestsNumber: invoice.guestsNumber,
    commission: paymentMethod.commission
  })

  const tableData = [
    {
      col1: invoice.activity.name,
      col2: moneyFormatter(subTotal)
    },
    {
      col1: `${lang.commission} (${paymentMethod.name})`,
      col2: moneyFormatter(paymentGatewayFee)
    }
  ]

  const paymentHandler = () => {
    billingHttpFetch.post('/invoice-payment', {
      billId,
      invoiceCode: invoice.invoiceCode,
      paymentMethodId: paymentMethod.id
    }, {
      headers: { Authorization: `beaer ${token}` }
    })
      .then(({ data }) => {
        const { invoiceCode } = data
        push(`/precos/invoice/${billId}?invoiceCode=${invoiceCode}`)
      })
      .catch(err => console.log(err))
  }

  return (
    <SimpleLayout
      robots='noindex nofollow'
      title='Preços | MozEconomia'
      description='Preço dos serviços da MozEconomia'
      keywords='moçambique, economia, dados, finança, comércio, mercado, capital, despesas, Hipoteca, dinheiro'
    >
      <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <section className='w-full md:grid grid-cols-3 border border-gray-200 rounded-lg divide-y md:divide-x divide-slate-100'>
          <div className='col-span-1 flex flex-col justify-center items-center p-6 text-center space-y-5'>
            <div
              className='w-32 md:w-40'
            >
              <Image
                width={500}
                height={500}
                className='w-full h-auto'
                src={paymentMethod.image}
                alt={paymentMethod.name}
                priority
              />
            </div>
            <span>
              {paymentMethod.name} {lang.form.paymentMethodSelected}
            </span>
          </div>

          <div className='col-span-2 p-3'>
            <form className="w-full">
              <Radio
                isFlex
                label={lang.form.paymentMethod}
                name='paymentMethod'
                items={paymentMethods}
                selected={paymentMethod}
                setSelected={setPaymentMethod as SetPaymentMethod}
              />
            </form>
            <div className='w-full'>
              <Table2Cols header={lang.header} data={tableData as unknown as Row[]} tableNavigation={undefined} />
            </div>
            <div className='w-full grid grid-cols-2'>
              <div className='text-sm w-full flex justify-end'>
                <div className='w-full max-w-[14rem]'>
                  <span className='block font-bold'>Total</span>
                  <span className='block'>{lang.dueAt} {dateLocalizer(invoice.dueAt, months)}</span>
                </div>
              </div>
              <div className='w-full text-right'>
                <span className='text-4xl'>
                  {moneyFormatter(total)}
                </span>
              </div>
            </div>
            <div className='w-full flex justify-end mt-5 pr-6'>
              <Button solid onClick={() => paymentHandler()}>
                <span className='w-40'>
                  {lang.form.submitButton}
                </span>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </SimpleLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, locale, query } = context
  const { billId, invoiceCode, resolvedUrl } = query

  const token = req.cookies[cookiesName]
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session || !token) {
    return {
      redirect: {
        destination: `login?callbackUrl=${nextAuthUrl}/${locale}${resolvedUrl}`,
        permanent: false
      }
    }
  }

  const { data: invoice } = await billingHttpFetch.get(`/billing/invoice?billId=${billId}&invoiceCode=${invoiceCode}`, {
    headers: { Authorization: `beaer ${token}` }
  })

  const { pricingId }: Invoice = invoice

  const { data: pricing } = await billingHttpFetch.get(`/billing/pricing/${pricingId}/${locale}`)

  return {
    props: {
      token,
      billId,
      invoice,
      pricing
    }
  }
}

export default CreateBillPage
