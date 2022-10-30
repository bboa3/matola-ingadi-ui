import { MongoClient } from 'mongodb'

if (!process.env.DATABASE_URL) {
  throw new Error('Please add your Mongo URI to .env.local')
}

const DATABASE_URL = process.env.DATABASE_URL

const client = new MongoClient(DATABASE_URL)
const clientPromise: Promise<MongoClient> = client.connect()

export default clientPromise
