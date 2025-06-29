"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Clock, CheckCircle, ChefHat, Bell, ArrowLeft, MapPin, Phone, Star } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function OrderStatusPage() {
  const [status, setStatus] = useState<"pending" | "accepted" | "preparing" | "ready" | "picked-up">("pending")
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isAuthenticated } = useAuth()
  const orderId = searchParams.get("orderId") || "#QB-1321"

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated || user?.type !== "student") {
      router.push("/student/login")
    }
  }, [isAuthenticated, user, router])

  // Simulate order status updates
  useEffect(() => {
    const acceptTimer = setTimeout(() => {
      setStatus("accepted")
      setEstimatedTime(15) // 15 minutes estimated time
      setTimeRemaining(15 * 60) // 15 minutes in seconds
      setProgress(25)
      toast({
        title: "Order accepted! 👨‍🍳",
        description: "Your order is being prepared. Estimated time: 15 minutes",
      })
    }, 3000)

    const preparingTimer = setTimeout(() => {
      setStatus("preparing")
      setProgress(60)
    }, 8000)

    const readyTimer = setTimeout(() => {
      setStatus("ready")
      setProgress(100)
      setTimeRemaining(0)
      toast({
        title: "🔔 Order Ready!",
        description: "Your delicious meal is ready for pickup!",
      })
    }, 15000)

    return () => {
      clearTimeout(acceptTimer)
      clearTimeout(preparingTimer)
      clearTimeout(readyTimer)
    }
  }, [toast])

  // Countdown timer
  useEffect(() => {
    if (timeRemaining && timeRemaining > 0 && status !== "ready") {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev && prev > 0) {
            return prev - 1
          }
          return 0
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timeRemaining, status])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const markAsPickedUp = () => {
    setStatus("picked-up")
    toast({
      title: "✅ Order Complete!",
      description: "Thank you for using QuickBite! Please rate your experience.",
    })
  }

  const getStatusIcon = () => {
    switch (status) {
      case "pending":
        return "⏳"
      case "accepted":
        return "👨‍🍳"
      case "preparing":
        return "🔥"
      case "ready":
        return "🔔"
      case "picked-up":
        return "✅"
      default:
        return "⏳"
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "from-yellow-400 to-orange-500"
      case "accepted":
        return "from-blue-400 to-blue-600"
      case "preparing":
        return "from-purple-400 to-purple-600"
      case "ready":
        return "from-green-400 to-green-600"
      case "picked-up":
        return "from-emerald-400 to-emerald-600"
      default:
        return "from-gray-400 to-gray-600"
    }
  }

  if (!isAuthenticated || user?.type !== "student") {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/student/dashboard">
                <Button
                  variant="ghost"
                  className="rounded-full p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Order Tracking</h1>
                <p className="text-gray-600 dark:text-gray-300">Track your delicious meal</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl mb-2">{getStatusIcon()}</div>
              <Badge className={`bg-gradient-to-r ${getStatusColor()} text-white border-0`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Status Card */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <CardHeader className={`bg-gradient-to-r ${getStatusColor()} text-white p-8`}>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">Order {orderId}</CardTitle>
                    <p className="text-white/90">Placed by {user?.name || "Student"}</p>
                  </div>
                  <div className="text-6xl animate-pulse">{getStatusIcon()}</div>
                </div>
              </CardHeader>

              <CardContent className="p-8 space-y-8">
                {/* Progress Bar */}
                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-300">
                    <span>Order Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3 rounded-full" />
                </div>

                {/* Status Details */}
                <div className="space-y-6">
                  {status === "pending" && (
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto">
                        <Clock className="w-10 h-10 text-yellow-600 dark:text-yellow-400 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Order Pending</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Your order is waiting for admin confirmation. This usually takes 1-2 minutes.
                        </p>
                      </div>
                      <div className="bg-yellow-50 dark:bg-yellow-900 rounded-2xl p-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                          <span className="text-yellow-800 dark:text-yellow-200 font-medium">
                            Admin is reviewing your order...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {status === "accepted" && (
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                        <ChefHat className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Order Accepted!</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Great news! Your order has been accepted and is now being prepared.
                        </p>
                      </div>
                      {estimatedTime && timeRemaining && (
                        <div className="bg-blue-50 dark:bg-blue-900 rounded-2xl p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                              <span className="text-blue-800 dark:text-blue-200 font-medium">
                                Estimated Time: {estimatedTime} minutes
                              </span>
                            </div>
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              {formatTime(timeRemaining)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {status === "preparing" && (
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                        <div className="text-3xl animate-bounce">🔥</div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Cooking in Progress</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Our chefs are working hard to prepare your delicious meal!
                        </p>
                      </div>
                      {timeRemaining && (
                        <div className="bg-purple-50 dark:bg-purple-900 rounded-2xl p-6">
                          <div className="flex items-center justify-center space-x-4">
                            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                              {formatTime(timeRemaining)}
                            </div>
                            <span className="text-purple-800 dark:text-purple-200">remaining</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {status === "ready" && (
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                        <Bell className="w-10 h-10 text-green-600 dark:text-green-400 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
                          🎉 Order Ready for Pickup!
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Your delicious meal is ready! Please collect it from the canteen counter.
                        </p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900 rounded-2xl p-6">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                          <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <span className="text-green-800 dark:text-green-200 font-medium">
                            Pickup Location: Block B, Ground Floor
                          </span>
                        </div>
                        <Button
                          onClick={markAsPickedUp}
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-[1.5rem] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Mark as Picked Up
                        </Button>
                      </div>
                    </div>
                  )}

                  {status === "picked-up" && (
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                          Order Complete! 🎉
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Thank you for using QuickBite! We hope you enjoyed your meal.
                        </p>
                      </div>

                      {/* Rating Section */}
                      <div className="bg-emerald-50 dark:bg-emerald-900 rounded-2xl p-6">
                        <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-4">
                          Rate your experience:
                        </h4>
                        <div className="flex justify-center space-x-2 mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              className="text-2xl hover:scale-110 transition-transform"
                              onClick={() =>
                                toast({
                                  title: "Thank you for rating! ⭐",
                                  description: `You rated ${star} star${star !== 1 ? "s" : ""}`,
                                })
                              }
                            >
                              <Star className="w-8 h-8 text-yellow-400 hover:text-yellow-500 fill-current" />
                            </button>
                          ))}
                        </div>
                        <Link href="/student/dashboard">
                          <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-[1.5rem] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Order Again
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Details */}
            <Card className="bg-white dark:bg-gray-800 rounded-[1.5rem] shadow-lg border border-gray-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Order ID</span>
                    <span className="font-medium text-gray-800 dark:text-white">{orderId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Placed at</span>
                    <span className="font-medium text-gray-800 dark:text-white">{new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Payment</span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">Cash on Pickup</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-white dark:bg-gray-800 rounded-[1.5rem] shadow-lg border border-gray-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">Call Canteen</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">Pickup Location</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Block B, Ground Floor</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800 rounded-[1.5rem] shadow-lg border-0">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-emerald-800 dark:text-emerald-200 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/student/dashboard">
                    <Button
                      variant="outline"
                      className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-200 dark:border-emerald-600 dark:text-emerald-300 dark:hover:bg-emerald-800"
                    >
                      Browse Menu
                    </Button>
                  </Link>
                  <Link href="/student/orders">
                    <Button
                      variant="outline"
                      className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-200 dark:border-emerald-600 dark:text-emerald-300 dark:hover:bg-emerald-800"
                    >
                      Order History
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
