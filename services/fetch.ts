import axios from 'axios'

export const httpFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'
})
