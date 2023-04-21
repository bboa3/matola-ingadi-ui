import { billingAPIBaseUrl, userAPIBaseUrl } from '@utils/env'
import axios from 'axios'

export const userHttpFetch = axios.create({
  baseURL: userAPIBaseUrl
})

export const billingHttpFetch = axios.create({
  baseURL: billingAPIBaseUrl
})
