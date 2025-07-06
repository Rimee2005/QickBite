const { MongoClient } = require('mongodb')
require('dotenv').config({ path: '.env.local' })

if (!process.env.MONGODB_URI) {
  console.error('\n❌ Error: MONGODB_URI not found in .env.local')
  process.exit(1)
}

async function initializeDatabase() {
  console.log('🔄 Initializing database...')
  const uri = process.env.MONGODB_URI
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db("quickbite")
    
    // Create collections
    console.log('\n📦 Creating collections...')
    
    // 1. Users Collection
    await db.createCollection("users")
    await db.collection("users").createIndexes([
      { key: { email: 1 }, unique: true },
      { key: { role: 1 } }
    ])
    console.log('✅ Users collection created with indexes')

    // 2. MenuItems Collection
    await db.createCollection("menuItems")
    await db.collection("menuItems").createIndexes([
      { key: { category: 1 } },
      { key: { name: "text", description: "text" } } // Enable text search
    ])
    console.log('✅ MenuItems collection created with indexes')

    // 3. Orders Collection
    await db.createCollection("orders")
    await db.collection("orders").createIndexes([
      { key: { userId: 1 } },
      { key: { orderDate: -1 } },
      { key: { status: 1 } }
    ])
    console.log('✅ Orders collection created with indexes')

    // 4. Carts Collection
    await db.createCollection("carts")
    await db.collection("carts").createIndexes([
      { key: { userId: 1 }, unique: true },
      { key: { lastUpdated: 1 } }
    ])
    console.log('✅ Carts collection created with indexes')

    // Add sample data
    console.log('\n📝 Adding sample data...')

    // Sample admin user
    await db.collection("users").insertOne({
      email: "admin@quickbite.com",
      name: "Admin User",
      role: "admin",
      // In production, this would be hashed
      password: "admin123" 
    })

    // Sample menu items
    await db.collection("menuItems").insertMany([
      {
        name: "Classic Burger",
        description: "Juicy beef patty with fresh vegetables",
        price: 8.99,
        category: "Burgers",
        image: "/placeholder.jpg",
        availability: true
      },
      {
        name: "Margherita Pizza",
        description: "Traditional Italian pizza with tomatoes and mozzarella",
        price: 12.99,
        category: "Pizza",
        image: "/placeholder.jpg",
        availability: true
      },
      {
        name: "Caesar Salad",
        description: "Fresh romaine lettuce with Caesar dressing",
        price: 6.99,
        category: "Salads",
        image: "/placeholder.jpg",
        availability: true
      }
    ])

    console.log('\n✨ Database initialized successfully!')
    console.log('----------------------------------------')
    console.log('Created collections:')
    const collections = await db.listCollections().toArray()
    collections.forEach(c => console.log(`- ${c.name}`))
    console.log('----------------------------------------')

    await client.close()
    console.log('\n🔒 Connection closed')
    process.exit(0)
  } catch (e) {
    console.error('\n❌ Database initialization error:')
    console.error('----------------------------------------')
    console.error('Error:', e instanceof Error ? e.message : String(e))
    console.error('----------------------------------------\n')
    await client.close()
    process.exit(1)
  }
}

initializeDatabase() 