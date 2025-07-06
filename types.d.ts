import { ObjectId } from "mongodb"

// User types
interface BaseUser {
  _id: ObjectId
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

interface Student extends BaseUser {
  type: "student"
  rollNumber?: string
  preferences?: {
    dietary?: string[]
    favorites?: ObjectId[]
  }
}

interface Admin extends BaseUser {
  type: "admin"
  role: "manager" | "staff"
  permissions?: string[]
}

type User = Student | Admin

// Menu types
interface MenuItem {
  _id: ObjectId
  name: string
  description: string
  price: number
  category: "snacks" | "beverages" | "meals"
  image?: string
  isAvailable: boolean
  preparationTime: number // in minutes
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}

// Order types
interface OrderItem {
  menuItem: ObjectId
  quantity: number
  specialInstructions?: string
  price: number // price at the time of order
}

interface Order {
  _id: ObjectId
  student: ObjectId
  items: OrderItem[]
  status: "pending" | "accepted" | "preparing" | "ready" | "completed" | "cancelled"
  totalAmount: number
  paymentStatus: "pending" | "paid" | "failed"
  estimatedReadyTime?: Date
  orderNumber: string
  createdAt: Date
  updatedAt: Date
}

// Cart types
interface CartItem {
  menuItem: ObjectId
  quantity: number
  specialInstructions?: string
}

interface Cart {
  _id: ObjectId
  student: ObjectId
  items: CartItem[]
  updatedAt: Date
}
