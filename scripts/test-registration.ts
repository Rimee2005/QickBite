import { hashPassword, verifyPassword } from '../lib/auth'

async function testAuthUtils() {
  console.log('Testing auth utilities...')
  
  const testPassword = 'testPassword123'
  
  // Test password hashing
  console.log('Testing password hashing...')
  const hashedPassword = await hashPassword(testPassword)
  console.log('Hashed password:', hashedPassword)
  
  // Test password verification
  console.log('Testing password verification...')
  const isValid = await verifyPassword(testPassword, hashedPassword)
  console.log('Password verification result:', isValid)
  
  // Test wrong password
  const isInvalid = await verifyPassword('wrongPassword', hashedPassword)
  console.log('Wrong password verification result:', isInvalid)
  
  console.log('Auth utilities test completed!')
}

async function testRegistrationEndpoint() {
  console.log('\nTesting registration endpoint...')
  
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'testPassword123'
  }
  
  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    })
    
    const data = await response.json()
    console.log('Response status:', response.status)
    console.log('Response data:', JSON.stringify(data, null, 2))
    
  } catch (error) {
    console.error('Error testing registration endpoint:', error)
  }
}

async function main() {
  await testAuthUtils()
  await testRegistrationEndpoint()
}

if (require.main === module) {
  main().catch(console.error)
} 