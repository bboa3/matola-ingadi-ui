import { Slot } from '@radix-ui/react-slot'
import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  solid?: boolean
  children: ReactNode
}

export const Button: React.FC<Props> = ({ solid, children, asChild, ...i }) => {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      className={`
        ${!solid ? 'py-1.5 text-green-500 ring-2 border-green-500 ring-green-500 hover:ring-green-600' : 'py-2 bg-green-500 text-white'}
        flex justify-center items-center min-w-[10rem] w-fit px-6 rounded-full border-in shadow-sm font-bold hover:bg-green-600 hover:text-white
      `}
      {...i}
    >
      {children}
    </Component>
  )
}
