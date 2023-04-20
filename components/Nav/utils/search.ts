import { appId, searchApiKey } from '@utils/env'
import algoliasearch from 'algoliasearch'

const client = algoliasearch(appId, searchApiKey)

const index = client.initIndex('economics_mozeconomia')

fetch('https://alg.li/doc-media.json')
  .then(function (response) {
    return response.json()
  })
  .then(function (posts) {
    return index.saveObjects(posts, {
      autoGenerateObjectIDIfNotExist: true
    })
  })
