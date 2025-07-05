"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "hi" | "mai" | "bho"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.title": "QuickBite 🍽️",
    "nav.student": "Order Food 🍽️",
    "nav.admin": "Login as Admin",

    // Hero Section
    "hero.badge": "🚀 Now Live at Your College Canteen",
    "hero.title": "Skip the Queue, Not the Meal 🍔",
    "hero.subtitle":
      "Pre-order your food from the college canteen, get notified when it's ready, and just pick it up. No more waiting in long lines!",
    "hero.cta1": "Login & Order Now",
    "hero.cta2": "Admin? Manage Orders Here",

    // Daily Specials
    "special.today": "Today's Special",
    "special.off": "OFF",

    // Canteen Status
    "canteen.status.open": "Canteen is currently OPEN",
    "canteen.status.closed": "Canteen is currently CLOSED",

    // Location
    "location.title": "Find Us Easily",
    "location.address": "Block B, Ground Floor, College Campus",

    // Feedback
    "feedback.title": "How was your last meal?",
    "feedback.submit": "Submit Feedback",

    // Group Order
    "group.title": "Ordering for a club meeting or team?",
    "group.subtitle": "Group ordering now available!",
    "group.cta": "Start Group Order",

    // Loyalty
    "loyalty.title": "Earn 1 point on every order. Redeem for free snacks!",

    // Demo
    "demo.title": "Try a Demo Order",
    "demo.subtitle": "Test the experience without real ordering",

    // Student Dashboard
    "dashboard.greeting": "Hi",
    "dashboard.question": "What would you like to eat today?",
    "dashboard.search": "Search for food items...",
    "dashboard.categories.all": "All",
    "dashboard.categories.snacks": "Snacks",
    "dashboard.categories.beverages": "Beverages",
    "dashboard.categories.meals": "Meals",
    "dashboard.add_to_cart": "Add to Cart",
    "dashboard.my_orders": "My Orders",
    "dashboard.cart": "Cart",
    "dashboard.logout": "Logout",

    // Cart
    "cart.title": "Your Cart",
    "cart.empty.title": "Your cart is empty",
    "cart.empty.subtitle": "Discover delicious meals and add them to your cart!",
    "cart.empty.browse": "Browse Menu",
    "cart.order_items": "Order Items",
    "cart.estimated": "Estimated: 10-15 min",
    "cart.subtotal": "Subtotal",
    "cart.service_fee": "Service Fee",
    "cart.taxes": "Taxes",
    "cart.total": "Total",
    "cart.payment_method": "Payment Method",
    "cart.cash_pickup": "Cash on Pickup",
    "cart.estimated_time": "Estimated Time",
    "cart.admin_time": "Admin will set exact time after confirmation",
    "cart.place_order": "Place Order",
    "cart.placing_order": "Placing Order...",
    "cart.terms": "By placing this order, you agree to our terms and conditions",
    "cart.item_removed": "Item removed!",
    "cart.removed_desc": "has been removed from your cart",

    // Order Status
    "status.title": "Order Tracking",
    "status.subtitle": "Track your delicious meal",
    "status.progress": "Order Progress",
    "status.pending": "Order Pending",
    "status.pending_desc": "Your order is waiting for admin confirmation. This usually takes 1-2 minutes.",
    "status.reviewing": "Admin is reviewing your order...",
    "status.accepted": "Order Accepted!",
    "status.accepted_desc": "Great news! Your order has been accepted and is now being prepared.",
    "status.estimated_time": "Estimated Time",
    "status.preparing": "Cooking in Progress",
    "status.preparing_desc": "Our chefs are working hard to prepare your delicious meal!",
    "status.remaining": "remaining",
    "status.ready": "🎉 Order Ready for Pickup!",
    "status.ready_desc": "Your delicious meal is ready! Please collect it from the canteen counter.",
    "status.pickup_location": "Pickup Location: Block B, Ground Floor",
    "status.mark_picked": "Mark as Picked Up",
    "status.complete": "Order Complete! 🎉",
    "status.complete_desc": "Thank you for using QuickBite! We hope you enjoyed your meal.",
    "status.rate_experience": "Rate your experience:",
    "status.order_again": "Order Again",
    "status.order_details": "Order Details",
    "status.order_id": "Order ID",
    "status.placed_at": "Placed at",
    "status.payment": "Payment",
    "status.need_help": "Need Help?",
    "status.call_canteen": "Call Canteen",
    "status.quick_actions": "Quick Actions",
    "status.browse_menu": "Browse Menu",
    "status.order_history": "Order History",

    // Admin Dashboard
    "admin.title": "QuickBite Admin 🍽️",
    "admin.manage_menu": "Manage Menu",
    "admin.logout": "Logout",
    "admin.order_queue": "Order Queue 📋",
    "admin.manage_orders": "Manage incoming orders from students",
    "admin.order_items": "Order Items:",
    "admin.set_eta": "Set ETA",
    "admin.accept_order": "Accept Order",
    "admin.mark_ready": "Mark as Ready",
    "admin.ready_pickup": "Ready for pickup",
    "admin.no_orders": "No orders yet",
    "admin.orders_appear": "New orders will appear here in real-time",

    // Login
    "login.title": "Welcome to QuickBite 🍽️",
    "login.admin_title": "Admin Login - QuickBite",
    "login.email": "Email",
    "login.password": "Password",
    "login.login": "Login",
    "login.logging_in": "Logging in...",
    "login.demo_credentials": "Fill Demo Credentials",
    "login.demo_info": "Demo credentials:",
    "login.back_home": "Back to Home",

    // Common
    "common.free": "Free",
    "common.included": "Included",
    "common.minutes": "minutes",
    "common.items": "items",
    "common.item": "item",
  },
  hi: {
    // Navigation
    "nav.title": "क्विकबाइट 🍽️",
    "nav.student": "छात्र लॉगिन",
    "nav.admin": "एडमिन लॉगिन",

    // Hero Section
    "hero.badge": "🚀 अब आपके कॉलेज कैंटीन में लाइव",
    "hero.title": "कतार छोड़ें, खाना नहीं 🍔",
    "hero.subtitle": "कॉलेज कैंटीन से खाना पहले से ऑर्डर करें, तैयार होने पर सूचना पाएं, और बस उठा लें। अब लंबी कतारों में इंतजार नहीं!",
    "hero.cta1": "लॉगिन करें और ऑर्डर करें",
    "hero.cta2": "एडमिन? यहाँ ऑर्डर मैनेज करें",

    // Daily Specials
    "special.today": "आज का स्पेशल",
    "special.off": "छूट",

    // Canteen Status
    "canteen.status.open": "कैंटीन अभी खुला है",
    "canteen.status.closed": "कैंटीन अभी बंद है",

    // Location
    "location.title": "हमें आसानी से खोजें",
    "location.address": "ब्लॉक बी, ग्राउंड फ्लोर, कॉलेज कैंपस",

    // Feedback
    "feedback.title": "आपका पिछला खाना कैसा था?",
    "feedback.submit": "फीडबैक भेजें",

    // Group Order
    "group.title": "क्लब मीटिंग या टीम के लिए ऑर्डर कर रहे हैं?",
    "group.subtitle": "ग्रुप ऑर्डरिंग अब उपलब्ध!",
    "group.cta": "ग्रुप ऑर्डर शुरू करें",

    // Loyalty
    "loyalty.title": "हर ऑर्डर पर 1 पॉइंट कमाएं। मुफ्त स्नैक्स के लिए रिडीम करें!",

    // Demo
    "demo.title": "डेमो ऑर्डर ट्राई करें",
    "demo.subtitle": "बिना असली ऑर्डर के अनुभव टेस्ट करें",

    // Student Dashboard
    "dashboard.greeting": "नमस्ते",
    "dashboard.question": "आज आप क्या खाना चाहेंगे?",
    "dashboard.search": "खाने की चीजें खोजें...",
    "dashboard.categories.all": "सभी",
    "dashboard.categories.snacks": "स्नैक्स",
    "dashboard.categories.beverages": "पेय पदार्थ",
    "dashboard.categories.meals": "भोजन",
    "dashboard.add_to_cart": "कार्ट में डालें",
    "dashboard.my_orders": "मेरे ऑर्डर",
    "dashboard.cart": "कार्ट",
    "dashboard.logout": "लॉगआउट",

    // Cart
    "cart.title": "आपका कार्ट",
    "cart.empty.title": "आपका कार्ट खाली है",
    "cart.empty.subtitle": "स्वादिष्ट भोजन खोजें और अपने कार्ट में डालें!",
    "cart.empty.browse": "मेन्यू देखें",
    "cart.order_items": "ऑर्डर आइटम",
    "cart.estimated": "अनुमानित: 10-15 मिनट",
    "cart.subtotal": "उप-योग",
    "cart.service_fee": "सेवा शुल्क",
    "cart.taxes": "कर",
    "cart.total": "कुल",
    "cart.payment_method": "भुगतान विधि",
    "cart.cash_pickup": "पिकअप पर नकद",
    "cart.estimated_time": "अनुमानित समय",
    "cart.admin_time": "एडमिन पुष्टि के बाद सटीक समय निर्धारित करेगा",
    "cart.place_order": "ऑर्डर करें",
    "cart.placing_order": "ऑर्डर कर रहे हैं...",
    "cart.terms": "इस ऑर्डर को करके, आप हमारे नियम और शर्तों से सहमत हैं",
    "cart.item_removed": "आइटम हटा दिया गया!",
    "cart.removed_desc": "आपके कार्ट से हटा दिया गया है",

    // Order Status
    "status.title": "ऑर्डर ट्रैकिंग",
    "status.subtitle": "अपने स्वादिष्ट भोजन को ट्रैक करें",
    "status.progress": "ऑर्डर प्रगति",
    "status.pending": "ऑर्डर लंबित",
    "status.pending_desc": "आपका ऑर्डर एडमिन की पुष्टि का इंतजार कर रहा है। इसमें आमतौर पर 1-2 मिनट लगते हैं।",
    "status.reviewing": "एडमिन आपके ऑर्डर की समीक्षा कर रहा है...",
    "status.accepted": "ऑर्डर स्वीकार किया गया!",
    "status.accepted_desc": "बहुत बढ़िया! आपका ऑर्डर स्वीकार कर लिया गया है और अब तैयार किया जा रहा है।",
    "status.estimated_time": "अनुमानित समय",
    "status.preparing": "खाना बन रहा है",
    "status.preparing_desc": "हमारे रसोइए आपका स्वादिष्ट भोजन तैयार करने में कड़ी मेहनत कर रहे हैं!",
    "status.remaining": "बाकी",
    "status.ready": "🎉 ऑर्डर पिकअप के लिए तैयार!",
    "status.ready_desc": "आपका स्वादिष्ट भोजन तैयार है! कृपया इसे कैंटीन काउंटर से लें।",
    "status.pickup_location": "पिकअप स्थान: ब्लॉक बी, ग्राउंड फ्लोर",
    "status.mark_picked": "पिक किया गया मार्क करें",
    "status.complete": "ऑर्डर पूरा! 🎉",
    "status.complete_desc": "क्विकबाइट का उपयोग करने के लिए धन्यवाद! हमें उम्मीद है कि आपको अपना भोजन पसंद आया।",
    "status.rate_experience": "अपने अनुभव को रेट करें:",
    "status.order_again": "फिर से ऑर्डर करें",
    "status.order_details": "ऑर्डर विवरण",
    "status.order_id": "ऑर्डर आईडी",
    "status.placed_at": "पर रखा गया",
    "status.payment": "भुगतान",
    "status.need_help": "मदद चाहिए?",
    "status.call_canteen": "कैंटीन को कॉल करें",
    "status.quick_actions": "त्वरित कार्य",
    "status.browse_menu": "मेन्यू देखें",
    "status.order_history": "ऑर्डर इतिहास",

    // Admin Dashboard
    "admin.title": "क्विकबाइट एडमिन 🍽️",
    "admin.manage_menu": "मेन्यू प्रबंधित करें",
    "admin.logout": "लॉगआउट",
    "admin.order_queue": "ऑर्डर कतार 📋",
    "admin.manage_orders": "छात्रों से आने वाले ऑर्डर प्रबंधित करें",
    "admin.order_items": "ऑर्डर आइटम:",
    "admin.set_eta": "ETA सेट करें",
    "admin.accept_order": "ऑर्डर स्वीकार करें",
    "admin.mark_ready": "तैयार मार्क करें",
    "admin.ready_pickup": "पिकअप के लिए तैयार",
    "admin.no_orders": "अभी तक कोई ऑर्डर नहीं",
    "admin.orders_appear": "नए ऑर्डर यहाँ रियल-टाइम में दिखाई देंगे",

    // Login
    "login.student_title": "छात्र लॉगिन",
    "login.admin_title": "एडमिन लॉगिन - क्विकबाइट",
    "login.email": "ईमेल",
    "login.password": "पासवर्ड",
    "login.login": "लॉगिन",
    "login.logging_in": "लॉगिन हो रहे हैं...",
    "login.demo_credentials": "डेमो क्रेडेंशियल भरें",
    "login.demo_info": "डेमो क्रेडेंशियल:",
    "login.back_home": "होम पर वापस",

    // Common
    "common.free": "मुफ्त",
    "common.included": "शामिल",
    "common.minutes": "मिनट",
    "common.items": "आइटम",
    "common.item": "आइटम",
  },
  mai: {
    // Navigation
    "nav.title": "क्विकबाइट 🍽️",
    "nav.student": "छात्र लॉगिन",
    "nav.admin": "एडमिन लॉगिन",

    // Hero Section
    "hero.badge": "🚀 अहाँक कॉलेज कैंटीन मे लाइव",
    "hero.title": "कतार छोड़ू, खाना नहि 🍔",
    "hero.subtitle": "कॉलेज कैंटीन सँ खाना पहिने ऑर्डर करू, तैयार भेलाक बाद सूचना पाबू, आ बस उठा लिअ। आब लम्बा कतार मे इंतजार नहि!",
    "hero.cta1": "लॉगिन करू आ ऑर्डर करू",
    "hero.cta2": "एडमिन? एतय ऑर्डर मैनेज करू",

    // Daily Specials
    "special.today": "आइक स्पेशल",
    "special.off": "छूट",

    // Canteen Status
    "canteen.status.open": "कैंटीन अखन खुजल अछि",
    "canteen.status.closed": "कैंटीन अखन बन्द अछि",

    // Location
    "location.title": "हमरा आसानी सँ खोजू",
    "location.address": "ब्लॉक बी, ग्राउंड फ्लोर, कॉलेज कैंपस",

    // Feedback
    "feedback.title": "अहाँक पछिला खाना कहन छल?",
    "feedback.submit": "फीडबैक भेजू",

    // Group Order
    "group.title": "क्लब मीटिंग या टीमक लेल ऑर्डर कऽ रहल छी?",
    "group.subtitle": "ग्रुप ऑर्डरिंग आब उपलब्ध!",
    "group.cta": "ग्रुप ऑर्डर शुरू करू",

    // Loyalty
    "loyalty.title": "हर ऑर्डर पर 1 पॉइंट कमाऊ। फ्री स्नैक्सक लेल रिडीम करू!",

    // Demo
    "demo.title": "डेमो ऑर्डर ट्राई करू",
    "demo.subtitle": "बिना असली ऑर्डरक अनुभव टेस्ट करू",

    // Student Dashboard
    "dashboard.greeting": "नमस्कार",
    "dashboard.question": "आइ अहाँ की खाए चाहब?",
    "dashboard.search": "खानाक चीज खोजू...",
    "dashboard.categories.all": "सभ",
    "dashboard.categories.snacks": "स्नैक्स",
    "dashboard.categories.beverages": "पेय",
    "dashboard.categories.meals": "भोजन",
    "dashboard.add_to_cart": "कार्ट मे डालू",
    "dashboard.my_orders": "हमर ऑर्डर",
    "dashboard.cart": "कार्ट",
    "dashboard.logout": "लॉगआउट",

    // Cart
    "cart.title": "अहाँक कार्ट",
    "cart.empty.title": "अहाँक कार्ट खाली अछि",
    "cart.empty.subtitle": "स्वादिष्ट भोजन खोजू आ अपन कार्ट मे डालू!",
    "cart.empty.browse": "मेन्यू देखू",
    "cart.order_items": "ऑर्डर आइटम",
    "cart.estimated": "अनुमानित: 10-15 मिनट",
    "cart.subtotal": "उप-योग",
    "cart.service_fee": "सेवा शुल्क",
    "cart.taxes": "कर",
    "cart.total": "कुल",
    "cart.payment_method": "भुगतान विधि",
    "cart.cash_pickup": "पिकअप पर नकद",
    "cart.estimated_time": "अनुमानित समय",
    "cart.admin_time": "एडमिन पुष्टिक बाद सटीक समय निर्धारित करत",
    "cart.place_order": "ऑर्डर करू",
    "cart.placing_order": "ऑर्डर कऽ रहल छी...",
    "cart.terms": "ई ऑर्डर कऽ कऽ, अहाँ हमर नियम आ शर्त सँ सहमत छी",
    "cart.item_removed": "आइटम हटा देल गेल!",
    "cart.removed_desc": "अहाँक कार्ट सँ हटा देल गेल अछि",

    // Order Status
    "status.title": "ऑर्डर ट्रैकिंग",
    "status.subtitle": "अपन स्वादिष्ट भोजन ट्रैक करू",
    "status.progress": "ऑर्डर प्रगति",
    "status.pending": "ऑर्डर लंबित",
    "status.pending_desc": "अहाँक ऑर्डर एडमिनक पुष्टिक इंतजार कऽ रहल अछि। एहि मे आमतौर पर 1-2 मिनट लगैत अछि।",
    "status.reviewing": "एडमिन अहाँक ऑर्डरक समीक्षा कऽ रहल अछि...",
    "status.accepted": "ऑर्डर स्वीकार भऽ गेल!",
    "status.accepted_desc": "बहुत नीक! अहाँक ऑर्डर स्वीकार कऽ लेल गेल अछि आ आब तैयार कएल जा रहल अछि।",
    "status.estimated_time": "अनुमानित समय",
    "status.preparing": "खाना बनि रहल अछि",
    "status.preparing_desc": "हमर रसोइया अहाँक स्वादिष्ट भोजन तैयार करै मे कड़ी मेहनत कऽ रहल छथि!",
    "status.remaining": "बाकी",
    "status.ready": "🎉 ऑर्डर पिकअपक लेल तैयार!",
    "status.ready_desc": "अहाँक स्वादिष्ट भोजन तैयार अछि! कृपया एकरा कैंटीन काउंटर सँ लऽ लिअ।",
    "status.pickup_location": "पिकअप स्थान: ब्लॉक बी, ग्राउंड फ्लोर",
    "status.mark_picked": "पिक कएल गेल मार्क करू",
    "status.complete": "ऑर्डर पूरा! 🎉",
    "status.complete_desc": "क्विकबाइटक उपयोग करबाक लेल धन्यवाद! हमरा उम्मीद अछि जे अहाँक अपन भोजन नीक लागल।",
    "status.rate_experience": "अपन अनुभव रेट करू:",
    "status.order_again": "फेर ऑर्डर करू",
    "status.order_details": "ऑर्डर विवरण",
    "status.order_id": "ऑर्डर आईडी",
    "status.placed_at": "पर राखल गेल",
    "status.payment": "भुगतान",
    "status.need_help": "मदद चाही?",
    "status.call_canteen": "कैंटीन कऽ कॉल करू",
    "status.quick_actions": "त्वरित कार्य",
    "status.browse_menu": "मेन्यू देखू",
    "status.order_history": "ऑर्डर इतिहास",

    // Admin Dashboard
    "admin.title": "क्विकबाइट एडमिन 🍽️",
    "admin.manage_menu": "मेन्यू प्रबंधित करू",
    "admin.logout": "लॉगआउट",
    "admin.order_queue": "ऑर्डर कतार 📋",
    "admin.manage_orders": "छात्र सभ सँ आबै वाला ऑर्डर प्रबंधित करू",
    "admin.order_items": "ऑर्डर आइटम:",
    "admin.set_eta": "ETA सेट करू",
    "admin.accept_order": "ऑर्डर स्वीकार करू",
    "admin.mark_ready": "तैयार मार्क करू",
    "admin.ready_pickup": "पिकअपक लेल तैयार",
    "admin.no_orders": "अखन तक कोनो ऑर्डर नहि",
    "admin.orders_appear": "नव ऑर्डर एतय रियल-टाइम मे देखाइत",

    // Login
    "login.student_title": "छात्र लॉगिन",
    "login.admin_title": "एडमिन लॉगिन - क्विकबाइट",
    "login.email": "ईमेल",
    "login.password": "पासवर्ड",
    "login.login": "लॉगिन",
    "login.logging_in": "लॉगिन भऽ रहल अछि...",
    "login.demo_credentials": "डेमो क्रेडेंशियल भरू",
    "login.demo_info": "डेमो क्रेडेंशियल:",
    "login.back_home": "घर वापस",

    // Common
    "common.free": "मुफ्त",
    "common.included": "शामिल",
    "common.minutes": "मिनट",
    "common.items": "आइटम",
    "common.item": "आइटम",
  },
  bho: {
    // Navigation
    "nav.title": "क्विकबाइट 🍽️",
    "nav.student": "छात्र लॉगिन",
    "nav.admin": "एडमिन लॉगिन",

    // Hero Section
    "hero.badge": "🚀 राउर कॉलेज कैंटीन में लाइव",
    "hero.title": "कतार छोड़ीं, खाना ना 🍔",
    "hero.subtitle": "कॉलेज कैंटीन से खाना पहिले ऑर्डर करीं, तैयार होखे पर सूचना पाईं, आ बस उठा लीं। अब लम्बा कतार में इंतजार ना!",
    "hero.cta1": "लॉगिन करीं आ ऑर्डर करीं",
    "hero.cta2": "एडमिन? इहाँ ऑर्डर मैनेज करीं",

    // Daily Specials
    "special.today": "आजु के स्पेशल",
    "special.off": "छूट",

    // Canteen Status
    "canteen.status.open": "कैंटीन अभी खुलल बा",
    "canteen.status.closed": "कैंटीन अभी बन्द बा",

    // Location
    "location.title": "हमनी के आसानी से खोजीं",
    "location.address": "ब्लॉक बी, ग्राउंड फ्लोर, कॉलेज कैंपस",

    // Feedback
    "feedback.title": "राउर पिछला खाना कइसन रहल?",
    "feedback.submit": "फीडबैक भेजीं",

    // Group Order
    "group.title": "क्लब मीटिंग या टीम खातिर ऑर्डर कर रहल बानी?",
    "group.subtitle": "ग्रुप ऑर्डरिंग अब उपलब्ध!",
    "group.cta": "ग्रुप ऑर्डर शुरू करीं",

    // Loyalty
    "loyalty.title": "हर ऑर्डर पर 1 पॉइंट कमाईं। फ्री स्नैक्स खातिर रिडीम करीं!",

    // Demo
    "demo.title": "डेमो ऑर्डर ट्राई करीं",
    "demo.subtitle": "बिना असली ऑर्डर के अनुभव टेस्ट करीं",

    // Student Dashboard
    "dashboard.greeting": "नमस्कार",
    "dashboard.question": "आज रउआ का खाए के मन बा?",
    "dashboard.search": "खाना के चीज खोजीं...",
    "dashboard.categories.all": "सब",
    "dashboard.categories.snacks": "स्नैक्स",
    "dashboard.categories.beverages": "पेय",
    "dashboard.categories.meals": "भोजन",
    "dashboard.add_to_cart": "कार्ट में डालीं",
    "dashboard.my_orders": "हमार ऑर्डर",
    "dashboard.cart": "कार्ट",
    "dashboard.logout": "लॉगआउट",

    // Cart
    "cart.title": "राउर कार्ट",
    "cart.empty.title": "राउर कार्ट खाली बा",
    "cart.empty.subtitle": "स्वादिष्ट भोजन खोजीं आ अपना कार्ट में डालीं!",
    "cart.empty.browse": "मेन्यू देखीं",
    "cart.order_items": "ऑर्डर आइटम",
    "cart.estimated": "अनुमानित: 10-15 मिनट",
    "cart.subtotal": "उप-योग",
    "cart.service_fee": "सेवा शुल्क",
    "cart.taxes": "कर",
    "cart.total": "कुल",
    "cart.payment_method": "भुगतान विधि",
    "cart.cash_pickup": "पिकअप पर नकद",
    "cart.estimated_time": "अनुमानित समय",
    "cart.admin_time": "एडमिन पुष्टि के बाद सटीक समय निर्धारित करी",
    "cart.place_order": "ऑर्डर करीं",
    "cart.placing_order": "ऑर्डर कर रहल बानी...",
    "cart.terms": "ई ऑर्डर करके, रउआ हमार नियम आ शर्त से सहमत बानी",
    "cart.item_removed": "आइटम हटा दिहल गइल!",
    "cart.removed_desc": "राउर कार्ट से हटा दिहल गइल बा",

    // Order Status
    "status.title": "ऑर्डर ट्रैकिंग",
    "status.subtitle": "अपना स्वादिष्ट भोजन ट्रैक करीं",
    "status.progress": "ऑर्डर प्रगति",
    "status.pending": "ऑर्डर लंबित",
    "status.pending_desc": "राउर ऑर्डर एडमिन के पुष्टि के इंतजार कर रहल बा। एह में आमतौर पर 1-2 मिनट लागेला।",
    "status.reviewing": "एडमिन राउर ऑर्डर के समीक्षा कर रहल बा...",
    "status.accepted": "ऑर्डर स्वीकार हो गइल!",
    "status.accepted_desc": "बहुत बढ़िया! राउर ऑर्डर स्वीकार हो गइल बा आ अब तैयार कइल जा रहल बा।",
    "status.estimated_time": "अनुमानित समय",
    "status.preparing": "खाना बन रहल बा",
    "status.preparing_desc": "हमार रसोइया राउर स्वादिष्ट भोजन तैयार करे में कड़ी मेहनत कर रहल बा!",
    "status.remaining": "बाकी",
    "status.ready": "🎉 ऑर्डर पिकअप खातिर तैयार!",
    "status.ready_desc": "राउर स्वादिष्ट भोजन तैयार बा! कृपया एकरा कैंटीन काउंटर से ले लीं।",
    "status.pickup_location": "पिकअप स्थान: ब्लॉक बी, ग्राउंड फ्लोर",
    "status.mark_picked": "पिक कइल गइल मार्क करीं",
    "status.complete": "ऑर्डर पूरा! 🎉",
    "status.complete_desc": "क्विकबाइट के उपयोग करे खातिर धन्यवाद! हमरा उम्मीद बा कि रउआ के अपना भोजन पसंद आइल।",
    "status.rate_experience": "अपना अनुभव रेट करीं:",
    "status.order_again": "फेर ऑर्डर करीं",
    "status.order_details": "ऑर्डर विवरण",
    "status.order_id": "ऑर्डर आईडी",
    "status.placed_at": "पर राखल गइल",
    "status.payment": "भुगतान",
    "status.need_help": "मदद चाहीं?",
    "status.call_canteen": "कैंटीन के कॉल करीं",
    "status.quick_actions": "त्वरित कार्य",
    "status.browse_menu": "मेन्यू देखीं",
    "status.order_history": "ऑर्डर इतिहास",

    // Admin Dashboard
    "admin.title": "क्विकबाइट एडमिन 🍽️",
    "admin.manage_menu": "मेन्यू प्रबंधित करीं",
    "admin.logout": "लॉगआउट",
    "admin.order_queue": "ऑर्डर कतार 📋",
    "admin.manage_orders": "छात्र लोग से आवे वाला ऑर्डर प्रबंधित करीं",
    "admin.order_items": "ऑर्डर आइटम:",
    "admin.set_eta": "ETA सेट करीं",
    "admin.accept_order": "ऑर्डर स्वीकार करीं",
    "admin.mark_ready": "तैयार मार्क करीं",
    "admin.ready_pickup": "पिकअप खातिर तैयार",
    "admin.no_orders": "अभी तक कवनो ऑर्डर नइखे",
    "admin.orders_appear": "नया ऑर्डर इहाँ रियल-टाइम में देखाई",

    // Login
    "login.student_title": "छात्र लॉगिन",
    "login.admin_title": "एडमिन लॉगिन - क्विकबाइट",
    "login.email": "ईमेल",
    "login.password": "पासवर्ड",
    "login.login": "लॉगिन",
    "login.logging_in": "लॉगिन हो रहल बा...",
    "login.demo_credentials": "डेमो क्रेडेंशियल भरीं",
    "login.demo_info": "डेमो क्रेडेंशियल:",
    "login.back_home": "घर वापस",

    // Common
    "common.free": "मुफ्त",
    "common.included": "शामिल",
    "common.minutes": "मिनट",
    "common.items": "आइटम",
    "common.item": "आइटम",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("quickbite_language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("quickbite_language", language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[Language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
