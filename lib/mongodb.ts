import { databaseUrl } from '@utils/env'
import { MongoClient } from 'mongodb'

const client = new MongoClient(databaseUrl)
const clientPromise: Promise<MongoClient> = client.connect()

export default clientPromise
