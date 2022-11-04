import { EventReservation } from 'ingadi'
import React, { createContext, ReactNode } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

type Data = {
  eventReservation?: EventReservation
}

interface ContextProps {
  data: Data
  setData: React.Dispatch<React.SetStateAction<Data>>;
}

interface Props {
  children: ReactNode
}

export const DataContext = createContext<ContextProps>({} as ContextProps)

const DataProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useLocalStorage<Data>('matola-ingadi')

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
