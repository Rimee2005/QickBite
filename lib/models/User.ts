import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  name: string
  email: string
  password: string
  type: "student" | "admin"
  studentId?: string
  phone?: string
  createdAt: Date
  updatedAt: Date
}

export interface UserSession {
  id: string
  name: string
  email: string
  type: "student" | "admin"
}
