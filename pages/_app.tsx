// pages/_app.tsx
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import '@/styles/globals.css' // ✅ your global CSS (adjust path if needed)

// OPTIONAL: For toast notifications
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    fetch('/api/socket')
      .then(() => console.log('✅ Socket route hit'))
      .catch((err) => console.error('❌ Socket route error', err))
  }, [])
  

  return (
    <>
      <Component {...pageProps} />
      {/* Optional: Uncomment below if using react-toastify */}
      {/* <ToastContainer position="bottom-right" /> */}
    </>
  )
}
