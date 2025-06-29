"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { login } = useAuth()
  const { t } = useLanguage()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(email, password, "admin")
      if (success) {
        toast({
          title: "Login successful! 🎉",
          description: "Welcome to QuickBite Admin Panel",
        })
        router.push("/admin/dashboard")
      } else {
        toast({
          title: "Login failed ❌",
          description: "Invalid admin credentials",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login failed ❌",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const quickLogin = () => {
    setEmail("admin@quickbite.com")
    setPassword("admin123")
    toast({
      title: "Demo credentials filled! 📝",
      description: "Click Login to continue",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      {/* Back Button - Mobile Optimized */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="rounded-full p-2 sm:p-3">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="ml-2 hidden sm:inline">{t("login.back_home")}</span>
          </Button>
        </Link>
      </div>

      <Card className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 w-full max-w-md mx-4 transform hover:scale-105 transition-all duration-300">
        <CardHeader className="text-center pb-6 pt-8 px-6 sm:px-8">
          <div className="text-5xl sm:text-6xl mb-4 animate-bounce">🍽️</div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white leading-tight">
            {t("login.admin_title")}
          </CardTitle>
        </CardHeader>

        <CardContent className="px-6 sm:px-8 pb-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("login.email")}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@quickbite.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2xl h-12 text-base border-gray-200 dark:border-gray-600 focus:border-emerald-400 focus:ring-emerald-400"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("login.password")}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-2xl h-12 text-base border-gray-200 dark:border-gray-600 focus:border-emerald-400 focus:ring-emerald-400 pr-12"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{t("login.logging_in")}</span>
                </div>
              ) : (
                t("login.login")
              )}
            </Button>
          </form>

          {/* Demo Section */}
          <div className="mt-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Demo</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full rounded-2xl border-emerald-200 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950 h-12 text-base"
              onClick={quickLogin}
            >
              {t("login.demo_credentials")}
            </Button>

            {/* Demo Info Card */}
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900 dark:to-green-900 rounded-2xl border border-emerald-100 dark:border-emerald-700">
              <p className="font-semibold mb-2 text-emerald-800 dark:text-emerald-200 text-sm">
                {t("login.demo_info")}
              </p>
              <div className="space-y-1 text-sm text-emerald-700 dark:text-emerald-300">
                <p>📧 Email: admin@quickbite.com</p>
                <p>🔑 Password: admin123</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
