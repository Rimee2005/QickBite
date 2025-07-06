import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable in .env.local")
}

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === "development") {
  // Reuse the global connection in dev to prevent too many connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri!, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise!
} else {
  // In production, create a new connection
  client = new MongoClient(uri!, options)
  clientPromise = client.connect()
}

export default clientPromise
