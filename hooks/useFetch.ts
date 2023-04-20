import { httpFetch } from '@lib/fetch'
import useSWR from 'swr'

export default function useFetch<Data = any, Error = any> (url: string) {
  const { data, error, mutate } = useSWR<Data, Error>(
    url,
    () => httpFetch.get(url).then(response => response.data)
  )

  return { data, error, mutate }
}
