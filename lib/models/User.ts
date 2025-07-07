import mongoose from 'mongoose'
import type { ObjectId } from "mongodb"

export interface IUser {
  name: string
  email: string
  password: string
  type: 'student' | 'admin' | 'teacher'
  registrationNumber?: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['student', 'admin', 'teacher'], required: true },
  registrationNumber: { type: String, required: function() { return this.type === 'student' } },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
})

// Update the timestamps on save
userSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export interface UserSession {
  id: string
  name: string
  email: string
  type: "student" | "admin" | "teacher"
}
