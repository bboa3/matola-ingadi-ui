import algoliasearch from 'algoliasearch/lite'
import { appId, searchApiKey } from './env'

export const searchClient = algoliasearch(
  appId,
  searchApiKey
)
