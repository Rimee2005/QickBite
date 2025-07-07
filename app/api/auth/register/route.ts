import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { User } from '@/lib/models/User'
import { hash } from 'bcrypt'

export async function POST(req: Request) {
  try {
    const { name, email, password, type, registrationNumber } = await req.json()

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Connect to database
    await connectToDatabase()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user object based on type
    const userData = {
      name,
      email,
      password: hashedPassword,
      type: type || 'student', // Default to student if not specified
    }

    // Add registration number for students
    if (type === 'student') {
      if (!registrationNumber) {
        return NextResponse.json(
          { error: "Registration number is required for students" },
          { status: 400 }
        )
      }
      Object.assign(userData, { registrationNumber })
    }

    // Create new user
    const user = await User.create(userData)

    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
      }
    })

  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Error creating user" },
      { status: 500 }
    )
  }
}

// Optional: Add GET method to check if registration endpoint is working
export async function GET() {
  return NextResponse.json(
    { message: 'Registration endpoint is working' },
    { status: 200 }
  )
}
