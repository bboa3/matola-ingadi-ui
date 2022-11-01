import { MongoClient } from 'mongodb'

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error('Please add your Mongo URI to .env.local')
}

const client = new MongoClient(DATABASE_URL)
const clientPromise: Promise<MongoClient> = client.connect()

export default clientPromise
