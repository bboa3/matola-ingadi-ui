import { APIBaseUrl, billingAPIBaseUrl } from '@utils/env'
import axios from 'axios'

export const httpFetch = axios.create({
  baseURL: APIBaseUrl
})

export const billingHttpFetch = axios.create({
  baseURL: billingAPIBaseUrl
})
