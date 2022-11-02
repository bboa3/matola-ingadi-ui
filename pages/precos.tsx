import Layout from '@components/Layout'
import React from 'react'

const LogIn: React.FC = () => {
  // const emailLoginHandler = (e: FormEvent) => {
  //   e.preventDefault()
  //   signIn('email', { email })
  // }

  return (
    <Layout
      title=''
      keywords=''
      description=''
    >
      <div className="w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className='w-full bg-gray-50'>
          <div className='w-full flex justify-center bg-gray-900 px-3 py-6 sm:px-4 lg:px-6 rounded-t-md text-white'>
            <div className='w-full max-w-5xl h-4/5'>
              <div className='text-center py-12'>
                <p className='text-gray-300'>Preços</p>
                <h1 className='font-bold text-5xl'>O Melhor Proco para o seu evento,</h1>
                <p className='text-gray-300 pt-3'>para começar apenas selecione e faremos reserva da data do seu evento.</p>
              </div>
              <div className='w-full grid grid-cols-2 gap-4'>
                <div className='p-6 rounded-lg bg-white'>
                  <h2 className="sr-only">Descrição dos preços</h2>
                  <div className='flex flex-col'>
                    <h3 className='w-20 p-1 font-medium text-center rounded-full bg-indigo-600'>Padrão</h3>
                    <div className='w-full flex items-end justify-center'>
                      <p className="text-5xl font-bold tracking-tight text-gray-900">53,00MT</p>
                      <p className="text-base font-bold text-gray-500"> /Convidado</p>
                    </div>
                    <p className='text-gray-700 mt-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                  </div>
                  <div></div>
                </div>
                <div className=' rounded-lg bg-white'>Test</div>
              </div>
            </div>
          </div>
          <div className='w-full h-1/5'>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default LogIn
