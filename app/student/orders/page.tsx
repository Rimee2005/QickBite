"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  date: string
  time: string
  items: string[]
  total: number
  status: "picked-up" | "cancelled"
  rating?: number
}

const orders: Order[] = [
  {
    id: "#QB-1321",
    date: "2024-01-15",
    time: "12:30 PM",
    items: ["1x Burger 🍔", "1x Cold Coffee ☕"],
    total: 110,
    status: "picked-up",
    rating: 5,
  },
  {
    id: "#QB-1320",
    date: "2024-01-14",
    time: "1:15 PM",
    items: ["2x Samosa 🥟", "1x Mango Juice 🥭"],
    total: 65,
    status: "picked-up",
    rating: 4,
  },
  {
    id: "#QB-1319",
    date: "2024-01-13",
    time: "11:45 AM",
    items: ["1x Chicken Biryani 🍛"],
    total: 120,
    status: "cancelled",
  },
  {
    id: "#QB-1318",
    date: "2024-01-12",
    time: "2:00 PM",
    items: ["1x French Fries 🍟", "1x Cold Coffee ☕"],
    total: 90,
    status: "picked-up",
    rating: 5,
  },
]

export default function OrderHistoryPage() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/student/dashboard">
            <Button variant="ghost" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Menu
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Order History 📋</h1>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="card-style">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{order.id}</h3>
                    <p className="text-gray-600 text-sm">
                      {order.date} at {order.time}
                    </p>
                  </div>
                  <Badge
                    className={`mt-2 sm:mt-0 ${
                      order.status === "picked-up"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }`}
                  >
                    {order.status === "picked-up" ? "Picked Up ✅" : "Cancelled ❌"}
                  </Badge>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Items Ordered:</h4>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <p key={index} className="text-gray-600 text-sm">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-lg font-bold text-emerald-600 mb-2 sm:mb-0">Total: ₹{order.total}</div>

                  {order.rating && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Your rating:</span>
                      <div className="flex space-x-1">{renderStars(order.rating)}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {orders.length === 0 && (
          <Card className="card-style p-8 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Your order history will appear here</p>
            <Link href="/student/dashboard">
              <Button className="btn-primary">Browse Menu</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  )
}
