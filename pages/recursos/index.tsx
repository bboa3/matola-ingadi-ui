import getLanguage from '@common/Resources/lang/page'
import getSheetsCategories from '@common/Resources/sheets'
import ShowResources from '@common/Resources/ShowResources'
import Radio from '@components/Form/Radio'
import SelectMenu from '@components/Form/Select'
import SimpleLayout from '@components/Layout/Tools/SimpleLayout'
import { cookiesName } from '@utils/env'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function ResourcesPage () {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)
  const sheetsCategories = getSheetsCategories(locale!)
  const categories = sheetsCategories.map(({ id, name }) => ({ id, name }))
  const [active, setActive] = useState(categories[0])

  return (
    <SimpleLayout
      title='Tools - MozEconomia'
      description='Tools da MozEconomia focado na criação de conteúdos da economia e negócios em Moçambique'
      keywords='Tools da MozEconomia, economia, negócios, economia moçambicana, negócios em moçambique, empreendedorismo, empreendedor, informação financeira, investimento, investidor'
    >
      <div className="flex flex-col w-full min-h-full items-center justify-center py-14 px-4 sm:px-6 lg:px-8">
        <div className='flex w-full flex-col max-w-4xl text-center'>
          <h1 className='font-bold text-4xl'>{lang.h1}</h1>
          <p className='mt-6 leading-relaxed'>{lang.description}</p>
        </div>
        <div className='w-full pt-12 md:flex'>
          <div className='w-full md:w-1/4'>
            <span className='font-bold text-lg'>
              {lang.categorySelectorLabel}
            </span>
            <div className='hidden md:block'>
              <Radio
                label={''}
                name='sheetCategory'
                id='sheetCategory'
                items={categories}
                selected={active}
                setSelected={setActive}
              />
            </div>

            <div className='block md:hidden'>
              <SelectMenu
                label={''}
                selected={active}
                setSelected={setActive}
                items={categories}
              />
            </div>
          </div>
          <div className='w-full flex-1 flex justify-center md:justify-start flex-wrap'>
            {
              sheetsCategories.map(({ id, sheets }) => (
                <div
                  key={id}
                  className={`
                    ${id === active.id ? 'block' : 'hidden'}
                    w-full flex justify-center md:justify-start flex-wrap gap-6
                  `}
                >
                  {
                    sheets.map((sheet) => (
                      <ShowResources
                        key={sheet.filename}
                        sheet={sheet}
                        downloadButton={lang.downloadButton}
                      />
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context

  const token = req.cookies[cookiesName]

  return {
    props: {
      token
    }
  }
}
