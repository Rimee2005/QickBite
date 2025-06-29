"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  type: "student" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, type: "student" | "admin") => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("quickbite_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string, type: "student" | "admin"): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (type === "admin") {
      if (
        (email === "admin@quickbite.com" && password === "admin123") ||
        (email === "admin" && password === "admin123")
      ) {
        const adminUser: User = {
          id: "admin-1",
          name: "Admin",
          email: email,
          type: "admin",
        }
        setUser(adminUser)
        localStorage.setItem("quickbite_user", JSON.stringify(adminUser))
        return true
      }
    } else {
      // Student login - accept any valid email/password for demo
      if (email && password) {
        const studentUser: User = {
          id: "student-1",
          name: email.split("@")[0] || "Student",
          email: email,
          type: "student",
        }
        setUser(studentUser)
        localStorage.setItem("quickbite_user", JSON.stringify(studentUser))
        return true
      }
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("quickbite_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
