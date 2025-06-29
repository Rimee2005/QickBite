"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Check, Clock, Bell, LogOut, Settings, Menu, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

interface Order {
  id: string
  studentName: string
  items: string[]
  orderTime: string
  status: "pending" | "accepted" | "ready"
  eta?: number
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "#QB-1325",
      studentName: "Rimjhim Sharma",
      items: ["1x Burger 🍔", "1x Cold Coffee ☕"],
      orderTime: "2:30 PM",
      status: "pending",
    },
    {
      id: "#QB-1324",
      studentName: "Arjun Patel",
      items: ["2x Samosa 🥟", "1x Mango Juice 🥭"],
      orderTime: "2:25 PM",
      status: "accepted",
      eta: 10,
    },
    {
      id: "#QB-1323",
      studentName: "Priya Singh",
      items: ["1x Chicken Biryani 🍛"],
      orderTime: "2:20 PM",
      status: "ready",
    },
  ])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { t } = useLanguage()

  // Make ETA selection mandatory
  const acceptOrder = (orderId: string, eta: number) => {
    if (!eta) {
      toast({
        title: "Please set ETA first! ⏰",
        description: "You must set estimated preparation time before accepting order",
        variant: "destructive",
      })
      return
    }

    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: "accepted" as const, eta } : order)),
    )
    toast({
      title: "Order accepted ✅",
      description: `Order ${orderId} accepted with ${eta} min ETA (Student will be notified)`,
    })
  }

  const markAsReady = (orderId: string) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: "ready" as const } : order)))
    toast({
      title: "Order ready! 🔔",
      description: `Order ${orderId} is ready for pickup`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200"
      case "accepted":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200"
      case "ready":
        return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
    }
  }

  const handleLogout = () => {
    toast({
      title: "Admin logged out! 👋",
      description: "Session ended successfully",
    })
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Mobile-First Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">{t("admin.title")}</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/admin/menu">
                <Button variant="ghost" className="text-gray-600 dark:text-gray-300">
                  <Settings className="w-4 h-4 mr-2" />
                  {t("admin.manage_menu")}
                </Button>
              </Link>
              <Button variant="ghost" className="text-gray-600 dark:text-gray-300" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                {t("admin.logout")}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" className="p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 space-y-2">
              <Link href="/admin/menu" className="block">
                <Button variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-300">
                  <Settings className="w-4 h-4 mr-2" />
                  {t("admin.manage_menu")}
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 dark:text-gray-300"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t("admin.logout")}
              </Button>
            </div>
          )}
        </div>
      </nav>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {t("admin.order_queue")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{t("admin.manage_orders")}</p>
        </div>

        {/* Orders Grid - Mobile First */}
        <div className="space-y-4 sm:space-y-6">
          {orders.map((order, index) => (
            <Card
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "slideInUp 0.5s ease-out forwards",
              }}
            >
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div>
                    <CardTitle className="text-lg sm:text-xl text-gray-800 dark:text-white">{order.id}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{order.studentName}</p>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end space-x-4">
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{order.orderTime}</span>
                    <Badge className={`${getStatusColor(order.status)} text-xs sm:text-sm px-2 py-1`}>
                      {order.status === "pending" && "⏳ Pending"}
                      {order.status === "accepted" && "👨‍🍳 Preparing"}
                      {order.status === "ready" && "✅ Ready"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Order Items */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base">
                    {t("admin.order_items")}
                  </h4>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <p key={index} className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {order.status === "pending" && (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <Select onValueChange={(value) => acceptOrder(order.id, Number.parseInt(value))}>
                          <SelectTrigger className="rounded-2xl h-12 border-gray-200 dark:border-gray-600">
                            <SelectValue placeholder={t("admin.set_eta")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 {t("common.minutes")}</SelectItem>
                            <SelectItem value="10">10 {t("common.minutes")}</SelectItem>
                            <SelectItem value="15">15 {t("common.minutes")}</SelectItem>
                            <SelectItem value="20">20 {t("common.minutes")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        className="bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white rounded-2xl h-12 px-6 font-medium"
                        onClick={() => acceptOrder(order.id, 10)}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        {t("admin.accept_order")}
                      </Button>
                    </div>
                  )}

                  {order.status === "accepted" && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                      <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm sm:text-base">
                          ETA: {order.eta} {t("common.minutes")}
                        </span>
                      </div>
                      <Button
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl h-12 px-6 font-medium w-full sm:w-auto"
                        onClick={() => markAsReady(order.id)}
                      >
                        <Bell className="w-4 h-4 mr-2" />
                        {t("admin.mark_ready")}
                      </Button>
                    </div>
                  )}

                  {order.status === "ready" && (
                    <div className="flex items-center text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900 rounded-2xl p-4">
                      <Check className="w-5 h-5 mr-2" />
                      <span className="font-medium text-sm sm:text-base">{t("admin.ready_pickup")}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 sm:p-12 text-center">
            <div className="text-6xl sm:text-8xl mb-4">📋</div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">{t("admin.no_orders")}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{t("admin.orders_appear")}</p>
          </Card>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
