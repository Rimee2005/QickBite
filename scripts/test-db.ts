const { MongoClient } = require('mongodb')
require('dotenv').config({ path: '.env.local' })

if (!process.env.MONGODB_URI) {
  console.error('\n❌ Error: MONGODB_URI not found in .env.local')
  process.exit(1)
}

async function testConnection() {
  console.log('🔄 Testing MongoDB connection...')
  const uri = process.env.MONGODB_URI as string
  
  // Debug: Log the URI structure (with sensitive info masked)
  console.log('🔑 Using MongoDB URI:', uri.replace(
    /(mongodb\+srv:\/\/)([^:]+):([^@]+)@/,
    (match, protocol, username) => `${protocol}${username}:****@`
  ))

  try {
    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db("quickbite")

    // Test the connection by listing collections
    console.log('📊 Fetching collections...')
    const collections = await db.listCollections().toArray()
    
    // Get server status
    console.log('📡 Getting server status...')
    const status = await db.command({ serverStatus: 1 })

    console.log('\n✅ Successfully connected to MongoDB!')
    console.log('----------------------------------------')
    console.log('📚 Collections:', collections.map((c: { name: string }) => c.name))
    console.log('📌 MongoDB Version:', status.version)
    console.log('⏱️  Uptime:', status.uptime, 'seconds')
    console.log('🔌 Active Connections:', status.connections.current)
    console.log('----------------------------------------\n')

    // Close the connection
    await client.close()
    console.log('🔒 Connection closed')
    process.exit(0)
  } catch (e) {
    console.error('\n❌ MongoDB Connection Error:')
    console.error('----------------------------------------')
    console.error('Error:', e instanceof Error ? e.message : String(e))
    console.error('----------------------------------------\n')
    process.exit(1)
  }
}

testConnection() 