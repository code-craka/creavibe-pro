"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"
import { HTMLAttributes, FormEvent, useState } from "react"

export function Footer({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<null | 'success' | 'error'>(null)

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsSubscribing(true)
    setSubscriptionStatus(null)
    
    try {
      // Replace with your actual subscription logic
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      if (response.ok) {
        setSubscriptionStatus('success')
        setEmail('')
      } else {
        setSubscriptionStatus('error')
      }
    } catch (error) {
      setSubscriptionStatus('error')
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <footer className="bg-gray-50 border-t" aria-labelledby="footer-heading" {...props}>
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <a 
              href="/"
              className="flex items-center mb-4 no-underline"
            >
              <Image 
                src="/logo.png" 
                alt="CreaVibe" 
                width={32} 
                height={32} 
                className="mr-2" 
                priority
              />
              <span className="text-xl font-bold">CreaVibe</span>
            </a>
            <p className="text-gray-600 mb-4">
              AI-powered content creation with real-time collaboration tools for marketing teams and creators.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/creavibe" 
                className="text-gray-400 hover:text-purple-600 transition-colors" 
                aria-label="CreaVibe on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a 
                href="https://twitter.com/creavibe" 
                className="text-gray-400 hover:text-purple-600 transition-colors" 
                aria-label="CreaVibe on Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a 
                href="https://instagram.com/creavibe" 
                className="text-gray-400 hover:text-purple-600 transition-colors" 
                aria-label="CreaVibe on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a 
                href="https://linkedin.com/company/creavibe" 
                className="text-gray-400 hover:text-purple-600 transition-colors" 
                aria-label="CreaVibe on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a 
                href="https://github.com/creavibe" 
                className="text-gray-400 hover:text-purple-600 transition-colors" 
                aria-label="CreaVibe on GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/ai-generator" 
                  className="text-gray-600 hover:text-purple-600 hover:underline"
                >
                  AI Generator
                </Link>
              </li>
              <li>
                <Link 
                  href="/pricing" 
                  className="text-gray-600 hover:text-purple-600 hover:underline"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  href="/integrations" 
                  className="text-gray-600 hover:text-purple-600 hover:underline"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link 
                  href="/changelog" 
                  className="text-gray-600 hover:text-purple-600 hover:underline"
                >
                  Changelog
                </Link>
              </li>
              <li>
                <Link 
                  href="/roadmap" 
                  className="text-gray-600 hover:text-purple-600 hover:underline"
                >
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-600 hover:text-purple-600 hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/careers" 
                  className="text-gray-600 hover:text-purple-600 hover:underline"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-gray-600 hover:text-purple-600 hover:underline"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-600 hover:text-purple-600 hover:underline"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/community" 
                  className="text-gray-600 hover:text-purple-600 hover:underline"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy-policy" 
                  className="text-gray-600 hover:text-purple-600 hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms-of-service" 
                  className="text-gray-600 hover:text-purple-600 hover:underline"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/help-center" 
                  className="text-gray-600 hover:text-purple-600 hover:underline"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-600 mb-4">Stay updated with the latest features and releases.</p>
            <form onSubmit={handleSubscribe} className="space-y-2" aria-label="Newsletter subscription">
              <div className="flex space-x-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 max-w-[220px]" 
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <Button 
                  type="submit" 
                  variant="default"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </div>
              {subscriptionStatus === 'success' && (
                <p className="text-sm text-green-600">Thank you for subscribing!</p>
              )}
              {subscriptionStatus === 'error' && (
                <p className="text-sm text-red-600">Failed to subscribe. Please try again.</p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} CreaVibe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
