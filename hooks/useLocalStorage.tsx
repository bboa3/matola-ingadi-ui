import React, { useEffect, useState } from 'react'

type returnType<T> = [
    T,
    React.Dispatch<React.SetStateAction<T>>,
]

const useLocalStorage = <T, >(
  key: string,
  initialValue?: T
): returnType<T> => {
  const [state, setState] = useState<T>(
    () => {
      if (!initialValue) { return }

      try {
        const value = localStorage.getItem(key)
        return value ? JSON.parse(value) : initialValue
      } catch (err) {
        return initialValue
      }
    }
  )

  useEffect(() => {
    if (state) {
      try {
        localStorage.setItem(key, JSON.stringify(state))
      } catch (err) {
        console.log(err)
      }
    }
  }, [state, key])

  return [state, setState]
}

export default useLocalStorage
