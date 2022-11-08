import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const SuccessAlert: React.FC<Props> = ({ children }) => {
  const [showAlert, setShowAlert] = React.useState(true)

  setInterval(() => {
    setShowAlert(false)
  }, 12000)

  return (
    <>
      {showAlert
        ? (
        <div className='absolute z-50 w-full top-0 left-0'>
          <div
            className="text-white px-6 py-4 border-0 rounded mb-4 bg-emerald-500"
          >
            {children}
            <button
              className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
              onClick={() => setShowAlert(false)}
            >
              <span>×</span>
            </button>
          </div>
        </div>
          )
        : null}
    </>
  )
}

export default SuccessAlert
