"use client"

import { useState, useEffect } from "react"
import { CheckCircle, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { motion, AnimatePresence } from "framer-motion"

export function AuthSuccessBanner() {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [type, setType] = useState<"success" | "welcome">("success")
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    // Check URL for auth_success parameter
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('auth_success') === 'true') {
      setVisible(true)
      
      // Determine if this is a first-time login or a return login
      const isNewUser = user?.app_metadata?.is_new_user === true
      
      if (isNewUser) {
        setType("welcome")
        setMessage(`Welcome to CreaVibe, ${user?.full_name || user?.email?.split('@')[0] || 'there'}!`)
      } else {
        setType("success")
        setMessage(`Welcome back, ${user?.full_name || user?.email?.split('@')[0] || 'there'}!`)
      }
      
      // Remove the parameter from URL without page reload
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('auth_success')
      window.history.replaceState({}, document.title, newUrl.toString())
      
      // Auto-hide after 8 seconds
      const timer = setTimeout(() => {
        setVisible(false)
      }, 8000)
      
      return () => clearTimeout(timer)
    }
    
    // Also check for error messages
    const error = urlParams.get('error')
    if (error) {
      // Handle error display in a different component
      console.error("Auth error:", error)
    }
  }, [user])

  if (!visible) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 right-4 z-50 shadow-lg w-auto max-w-md ${type === "welcome" ? "bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary" : "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500"} p-4 rounded-md`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className={`h-5 w-5 ${type === "welcome" ? "text-primary" : "text-green-500"}`} />
              <p className={`text-sm font-medium ${type === "welcome" ? "text-primary-800 dark:text-primary-200" : "text-green-800 dark:text-green-200"}`}>
                {message}
              </p>
            </div>
            <button
              onClick={() => setVisible(false)}
              className={`${type === "welcome" ? "text-primary hover:text-primary-700 dark:hover:text-primary-300" : "text-green-500 hover:text-green-700 dark:hover:text-green-300"} focus:outline-none`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
