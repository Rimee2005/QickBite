"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  ShoppingCart,
  Clock,
  Bell,
  Shield,
  ChefHat,
  Star,
  ArrowRight,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Sun,
  Moon,
  TrendingUp,
  Users,
  Timer,
  Flame,
  Monitor,
  CheckCircle,
  MapPinIcon,
  Languages,
  Play,
  Gift,
  MessageSquare,
  UsersIcon,
  Heart,
  Award,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"
import { useLanguage } from "@/contexts/language-context"
import { useToast } from "@/hooks/use-toast"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Computer Science Student",
    content: "Loved how quick and smooth the process was! No more standing in lines during lunch break.",
    rating: 5,
    avatar: "👩‍🎓",
  },
  {
    id: 2,
    name: "Rahul Patel",
    role: "Engineering Student",
    content: "Perfect for busy students during breaks. I can order between classes and pick up when convenient.",
    rating: 5,
    avatar: "👨‍🎓",
  },
  {
    id: 3,
    name: "Anita Singh",
    role: "MBA Student",
    content: "No more standing in line. Great experience! The notifications are super helpful.",
    rating: 5,
    avatar: "👩‍💼",
  },
  {
    id: 4,
    name: "Admin Team",
    role: "Canteen Management",
    content: "Easy to manage orders and set realistic preparation times. Students love the transparency!",
    rating: 5,
    avatar: "👨‍🍳",
  },
]

const features = [
  {
    icon: <Shield className="w-8 h-8 text-emerald-500" />,
    title: "Secure Login",
    description: "Safe and secure authentication before ordering",
  },
  {
    icon: <ShoppingCart className="w-8 h-8 text-emerald-500" />,
    title: "One-Click Ordering",
    description: "Quick and easy food ordering with just a few clicks",
  },
  {
    icon: <ChefHat className="w-8 h-8 text-emerald-500" />,
    title: "Admin Control",
    description: "Admin-controlled food status updates and time management",
  },
  {
    icon: <Bell className="w-8 h-8 text-emerald-500" />,
    title: "Live Notifications",
    description: "Real-time updates when your food is ready for pickup",
  },
]

const steps = [
  {
    number: "01",
    title: "Sign Up or Log In",
    description: "Create your account or log in to access the ordering system",
    icon: <User className="w-6 h-6" />,
  },
  {
    number: "02",
    title: "Browse Menu & Add Items",
    description: "Explore our delicious menu and add your favorite items to cart",
    icon: <ShoppingCart className="w-6 h-6" />,
  },
  {
    number: "03",
    title: "Confirm Order",
    description: "Review your order and submit it for admin confirmation",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    number: "04",
    title: "Admin Updates Status",
    description: "Admin reviews, accepts order and sets preparation time",
    icon: <ChefHat className="w-6 h-6" />,
  },
  {
    number: "05",
    title: "Get Notified",
    description: "Receive notification when your food is ready for pickup",
    icon: <Bell className="w-6 h-6" />,
  },
]

const topPicks = [
  {
    id: 1,
    name: "Chicken Biryani",
    price: 120,
    emoji: "🍛",
    offer: "20% Off",
    popular: true,
  },
  {
    id: 2,
    name: "Masala Dosa",
    price: 60,
    emoji: "🥞",
    offer: null,
    popular: true,
  },
  {
    id: 3,
    name: "Paneer Butter Masala",
    price: 100,
    emoji: "🍛",
    offer: "15% Off",
    popular: false,
  },
  {
    id: 4,
    name: "Cold Coffee",
    price: 40,
    emoji: "☕",
    offer: null,
    popular: true,
  },
  {
    id: 5,
    name: "Veg Burger",
    price: 70,
    emoji: "🍔",
    offer: "10% Off",
    popular: false,
  },
  {
    id: 6,
    name: "Fresh Juice",
    price: 35,
    emoji: "🥤",
    offer: null,
    popular: true,
  },
]

const dailySpecials = [
  { name: "Paneer Wrap", emoji: "🌯", discount: 20 },
  { name: "Chicken Biryani", emoji: "🍛", discount: 25 },
  { name: "Masala Dosa", emoji: "🥞", discount: 15 },
  { name: "Veg Thali", emoji: "🍽️", discount: 30 },
]

const teamMembers = [
  {
    name: "Chef Ramesh",
    role: "Head Chef",
    experience: "Serving students since 2015",
    emoji: "👨‍🍳",
    specialty: "North Indian Cuisine",
  },
  {
    name: "Admin Priya",
    role: "Order Manager",
    experience: "Confirms every order herself",
    emoji: "👩‍💼",
    specialty: "Customer Service",
  },
  {
    name: "Chef Sunita",
    role: "South Indian Specialist",
    experience: "Expert in Dosa & Idli",
    emoji: "👩‍🍳",
    specialty: "South Indian Dishes",
  },
]

const funFacts = [
  {
    icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
    fact: "We've served over 5,000 orders!",
    emoji: "🎉",
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    fact: "Our fastest delivery was 4 minutes!",
    emoji: "⚡",
  },
  {
    icon: <Heart className="w-6 h-6 text-red-500" />,
    fact: "98% customer satisfaction rate!",
    emoji: "❤️",
  },
  {
    icon: <Award className="w-6 h-6 text-purple-500" />,
    fact: "Winner of 'Best Campus Food Service 2024'",
    emoji: "🏆",
  },
]

const faqs = [
  {
    question: "Do I need to login to place an order?",
    answer:
      "Yes, you need to create an account and login to place orders. This helps us track your orders and send you notifications.",
  },
  {
    question: "Can I cancel an order after placing it?",
    answer:
      "No, once an order is confirmed by the admin, it cannot be cancelled. Please review your order carefully before placing it.",
  },
  {
    question: "Who prepares the food?",
    answer:
      "The food is prepared by our trained canteen staff who are assigned by the admin. All hygiene and quality standards are maintained.",
  },
  {
    question: "How long does it take to prepare food?",
    answer:
      "Preparation time varies by dish and current order volume. The admin will set an estimated time when they accept your order.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "Currently, we accept cash payments at the time of pickup. Digital payment options will be available soon.",
  },
  {
    question: "Can I modify my order after placing it?",
    answer:
      "Order modifications are not possible once submitted. Please contact the canteen staff directly if you have special requirements.",
  },
]

// Animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <span className="animate-count-up">
      {count}
      {suffix}
    </span>
  )
}

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentSpecial, setCurrentSpecial] = useState(0)
  const [canteenOpen, setCanteenOpen] = useState(true)
  const [feedback, setFeedback] = useState("")
  const [selectedRating, setSelectedRating] = useState<string>("")
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { toast } = useToast()

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-rotate testimonials and daily specials
  useEffect(() => {
    const testimonialInterval = setInterval(nextTestimonial, 5000)
    const specialInterval = setInterval(() => {
      setCurrentSpecial((prev) => (prev + 1) % dailySpecials.length)
    }, 3000)

    return () => {
      clearInterval(testimonialInterval)
      clearInterval(specialInterval)
    }
  }, [])

  // Check canteen status based on time
  useEffect(() => {
    const checkCanteenStatus = () => {
      const now = new Date()
      const hour = now.getHours()
      // Canteen open from 8 AM to 8 PM
      setCanteenOpen(hour >= 8 && hour < 20)
    }

    checkCanteenStatus()
    const interval = setInterval(checkCanteenStatus, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  const handleFeedbackSubmit = () => {
    if (!selectedRating || !feedback.trim()) {
      toast({
        title: "Please provide rating and feedback",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Thank you for your feedback! 🙏",
      description: "Your feedback helps us improve our service",
    })

    setFeedback("")
    setSelectedRating("")
  }

  const handleDemoOrder = () => {
    toast({
      title: "Demo Mode Activated! 🎮",
      description: "This is a demo order. No real food will be prepared.",
    })
  }

  const handleGroupOrder = () => {
    toast({
      title: "Group Order Feature Coming Soon! 👥",
      description: "We're working on this feature for bulk orders",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Daily Specials Banner */}
      <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 px-4 text-center relative overflow-hidden">
        <div className="animate-pulse">
          <span className="font-bold">
            {t("special.today")}: {dailySpecials[currentSpecial].name} {dailySpecials[currentSpecial].emoji}{" "}
            {dailySpecials[currentSpecial].discount}% {t("special.off")} 🔥
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-800 dark:text-white">{t("nav.title")}</span>
        </div>
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
            <SelectTrigger className="w-auto border-none bg-transparent">
              <Languages className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी</SelectItem>
              <SelectItem value="mai">मैथिली</SelectItem>
              <SelectItem value="bho">भोजपुरी</SelectItem>
            </SelectContent>
          </Select>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>

          <Link href="/login">
            <Button
              variant="outline"
              className="rounded-[1.25rem] border-emerald-400 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950"
            >
              {t("login")}
            </Button>
          </Link>
          <Link href="/admin/login">
            <Button className="bg-emerald-400 hover:bg-emerald-500 text-white font-medium py-3 px-6 rounded-[1.25rem] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              {t("nav.admin")}
            </Button>
          </Link>
        </div>
      </nav>

      {/* Real-time Status Display */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex justify-center">
          <Badge
            className={`text-lg py-2 px-6 rounded-full ${
              canteenOpen
                ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {canteenOpen ? "✅" : "❌"} {canteenOpen ? t("canteen.status.open") : t("canteen.status.closed")}
          </Badge>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900 dark:text-emerald-200 px-4 py-2 rounded-full">
              {t("hero.badge")}
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">{t("hero.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button className="bg-emerald-400 hover:bg-emerald-500 text-white font-medium text-lg py-4 px-8 rounded-[1.25rem] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  {t("hero.cta1")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button
                  variant="outline"
                  className="text-lg py-4 px-8 rounded-[1.25rem] border-emerald-400 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950"
                >
                  {t("hero.cta2")}
                </Button>
              </Link>
            </div>

            {/* Demo Order Button */}
            <div className="pt-4">
              <Button
                variant="outline"
                onClick={handleDemoOrder}
                className="border-dashed border-2 border-gray-400 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                <Play className="w-4 h-4 mr-2" />
                {t("demo.title")}
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t("demo.subtitle")}</p>
            </div>
          </div>

          <div className="relative">
            <Card className="bg-white dark:bg-gray-800 rounded-[1.25rem] shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 dark:border-gray-700 p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Long Queue</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Students waiting in line</p>
                  </div>
                </div>

                <div className="border-l-4 border-emerald-400 pl-6 ml-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center">
                      <span className="text-2xl">😊</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">Quick Pickup</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Happy student with food</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Mini Video Demo Placeholder */}
            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-[1.25rem] shadow-lg p-4 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-white">How to Order</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Canteen Location Map */}
      <section className="bg-white dark:bg-gray-800 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{t("location.title")} 📍</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">{t("location.address")}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <Card className="bg-gray-100 dark:bg-gray-700 rounded-[1.25rem] shadow-lg border border-gray-200 dark:border-gray-600 p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPinIcon className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">Interactive Map Coming Soon</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Google Maps integration will be added here
                </p>
              </div>
            </Card>

            <div className="space-y-4">
              <Card className="bg-white dark:bg-gray-700 rounded-[1.25rem] shadow-lg border border-gray-100 dark:border-gray-600 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                    <MapPinIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Block B, Ground Floor</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Main Campus Building</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white dark:bg-gray-700 rounded-[1.25rem] shadow-lg border border-gray-100 dark:border-gray-600 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Open Hours</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Live Stats 📊</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Real-time data from our canteen system</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800 rounded-[1.25rem] shadow-lg border-0 p-8 text-center">
              <TrendingUp className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-emerald-700 dark:text-emerald-300 mb-2">
                <AnimatedCounter end={247} suffix="+" />
              </div>
              <p className="text-emerald-600 dark:text-emerald-400 font-medium">🍲 Total Orders Served Today</p>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-[1.25rem] shadow-lg border-0 p-8 text-center">
              <Users className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-blue-700 dark:text-blue-300 mb-2">
                <AnimatedCounter end={5} />
              </div>
              <p className="text-blue-600 dark:text-blue-400 font-medium">👨‍🍳 Active Admins</p>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-[1.25rem] shadow-lg border-0 p-8 text-center">
              <Timer className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-purple-700 dark:text-purple-300 mb-2">
                <AnimatedCounter end={12} suffix=" min" />
              </div>
              <p className="text-purple-600 dark:text-purple-400 font-medium">🕐 Avg. Preparation Time</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet The Team Section */}
      <section className="bg-white dark:bg-gray-800 py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Meet Our Team 👥</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">The people who make your food experience amazing</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-700 rounded-[1.25rem] shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 dark:border-gray-600 p-8 text-center"
              >
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{member.name}</h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{member.experience}</p>
                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  {member.specialty}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Picks Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Top Picks 🍽️</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Most popular dishes among students</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topPicks.map((dish) => (
              <Card
                key={dish.id}
                className="bg-white dark:bg-gray-800 rounded-[1.25rem] shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <div className="relative">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-6xl">{dish.emoji}</span>
                  </div>
                  {dish.offer && (
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white hover:bg-red-500">
                      <Flame className="w-3 h-3 mr-1" />
                      {dish.offer}
                    </Badge>
                  )}
                  {dish.popular && (
                    <Badge className="absolute top-3 right-3 bg-emerald-500 text-white hover:bg-emerald-500">
                      Popular
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{dish.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">₹{dish.price}</span>
                    {dish.offer && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ₹{Math.round(dish.price / (1 - Number.parseInt(dish.offer) / 100))}
                      </span>
                    )}
                  </div>
                  <Link href="/login">
                    <Button className="w-full bg-emerald-400 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-[1.25rem] transition-all duration-200">
                      Login to Order
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Group Order & Loyalty Program */}
      <section className="bg-white dark:bg-gray-800 py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Group Order */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-[1.25rem] shadow-lg border-0 p-8">
              <div className="text-center">
                <UsersIcon className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">{t("group.title")}</h3>
                <p className="text-blue-700 dark:text-blue-300 mb-6">{t("group.subtitle")}</p>
                <Button
                  onClick={handleGroupOrder}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-[1.25rem]"
                >
                  {t("group.cta")}
                </Button>
              </div>
            </Card>

            {/* Loyalty Program */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-[1.25rem] shadow-lg border-0 p-8">
              <div className="text-center">
                <Gift className="w-16 h-16 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-4">Loyalty Program 🎁</h3>
                <p className="text-purple-700 dark:text-purple-300 mb-6">{t("loyalty.title")}</p>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <span className="text-purple-700 dark:text-purple-300">Order = 1 Point</span>
                </div>
                <Badge className="bg-purple-600 text-white">Coming Soon!</Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Fun Facts 🧠</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Did you know?</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {funFacts.map((fact, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 rounded-[1.25rem] shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 dark:border-gray-700 p-6 text-center"
              >
                <div className="text-4xl mb-4">{fact.emoji}</div>
                <div className="flex justify-center mb-3">{fact.icon}</div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">{fact.fact}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Feedback Section */}
      <section className="bg-white dark:bg-gray-800 py-20 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">{t("feedback.title")} 💬</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Your feedback helps us improve</p>
          </div>

          <Card className="bg-white dark:bg-gray-700 rounded-[1.25rem] shadow-lg border border-gray-100 dark:border-gray-600 p-8">
            <div className="space-y-6">
              {/* Emoji Rating */}
              <div className="text-center">
                <p className="text-lg font-medium text-gray-800 dark:text-white mb-4">Rate your experience:</p>
                <div className="flex justify-center space-x-4">
                  {[
                    { emoji: "😞", value: "poor", label: "Poor" },
                    { emoji: "😐", value: "okay", label: "Okay" },
                    { emoji: "😊", value: "good", label: "Good" },
                    { emoji: "😍", value: "excellent", label: "Excellent" },
                  ].map((rating) => (
                    <button
                      key={rating.value}
                      onClick={() => setSelectedRating(rating.value)}
                      className={`text-4xl p-3 rounded-full transition-all duration-200 ${
                        selectedRating === rating.value
                          ? "bg-emerald-100 dark:bg-emerald-900 scale-110"
                          : "hover:bg-gray-100 dark:hover:bg-gray-600"
                      }`}
                    >
                      {rating.emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Text */}
              <div>
                <Textarea
                  placeholder="Tell us about your experience..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="rounded-[1.25rem] border-gray-300 dark:border-gray-600"
                  rows={4}
                />
              </div>

              <div className="text-center">
                <Button
                  onClick={handleFeedbackSubmit}
                  className="bg-emerald-400 hover:bg-emerald-500 text-white font-medium py-3 px-8 rounded-[1.25rem]"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {t("feedback.submit")}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Smart Dashboard Preview */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Smart Dashboard Preview 📊</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Transparent order management system</p>
          </div>

          <Card className="bg-white dark:bg-gray-800 rounded-[1.25rem] shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-sm text-gray-600 dark:text-gray-300">QuickBite Admin Dashboard</span>
              </div>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-emerald-50 dark:bg-emerald-900 border border-emerald-200 dark:border-emerald-700 p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">12</div>
                  <p className="text-emerald-600 dark:text-emerald-400 text-sm">Pending Orders</p>
                </Card>
                <Card className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">8 min</div>
                  <p className="text-blue-600 dark:text-blue-400 text-sm">Avg. Wait Time</p>
                </Card>
                <Card className="bg-purple-50 dark:bg-purple-900 border border-purple-200 dark:border-purple-700 p-4 text-center">
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">3</div>
                  <p className="text-purple-600 dark:text-purple-400 text-sm">Active Admins</p>
                </Card>
              </div>

              <div className="space-y-4">
                <Card className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">#QB-1325 - Priya Sharma</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">1x Burger 🍔, 1x Cold Coffee ☕</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
                        <option>Set ETA</option>
                        <option>10 min</option>
                        <option>15 min</option>
                        <option>20 min</option>
                      </select>
                      <Button size="sm" className="bg-emerald-400 hover:bg-emerald-500 text-white">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900 rounded-lg border border-emerald-200 dark:border-emerald-700">
                <div className="flex items-center space-x-2">
                  <Monitor className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <p className="text-emerald-800 dark:text-emerald-200 font-medium">
                    🎯 <strong>Admin Full Control:</strong> Only admins can set preparation times after reviewing each
                    order. Students get notified with exact pickup time!
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white dark:bg-gray-800 py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">How It Works 🔍</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Simple steps to get your food without the wait</p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <Card className="bg-white dark:bg-gray-700 rounded-[1.25rem] shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 dark:border-gray-600 p-6 text-center h-full">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-emerald-600 dark:text-emerald-400">{step.icon}</div>
                  </div>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{step.number}</div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-emerald-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Features Highlights 📦</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need for a seamless food ordering experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-700 rounded-[1.25rem] shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 dark:border-gray-600 p-6 text-center"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white dark:bg-gray-800 py-20 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">What Our Users Say 🗣️</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Real feedback from students and admins</p>
          </div>

          <div className="relative">
            <Card className="bg-white dark:bg-gray-700 rounded-[1.25rem] shadow-lg border border-gray-100 dark:border-gray-600 p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">{testimonials[currentTestimonial].avatar}</div>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-emerald-400" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full dark:border-gray-600 dark:text-gray-300"
                onClick={prevTestimonial}
              >
                ←
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full dark:border-gray-600 dark:text-gray-300"
                onClick={nextTestimonial}
              >
                →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Frequently Asked Questions ❓</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Everything you need to know about QuickBite</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gray-50 dark:bg-gray-700 rounded-[1.25rem] border border-gray-200 dark:border-gray-600 px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-800 dark:text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-400 to-emerald-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Skip the Queue? 📣</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join hundreds of students who are already enjoying hassle-free food ordering
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button className="bg-white text-emerald-600 hover:bg-gray-100 font-medium text-lg py-4 px-8 rounded-[1.25rem] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                👉 {t("hero.cta1")}
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg py-4 px-8 rounded-[1.25rem]"
              >
                👉 {t("hero.cta2")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold">{t("nav.title")}</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Making college dining faster and more convenient for everyone.
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>🏫</span>
                <span>College Campus Project</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/admin/login" className="text-gray-400 hover:text-white transition-colors">
                    Admin Login
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Menu
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>support@quickbite.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>College Campus, India</span>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
              <div className="text-sm text-gray-400">
                <p>Built with ❤️ for students</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 QuickBite. All rights reserved. Made with ❤️ for college students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
