import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image src="/logo.png" alt="Creavibe.pro" width={32} height={32} className="mr-2" />
              <span className="text-xl font-bold">Creavibe.pro</span>
            </Link>
            <p className="text-gray-600 mb-4">
              AI-powered content creation with real-time collaboration tools for marketing teams and creators.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-gray-600 hover:text-purple-600">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-purple-600">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/integrations" className="text-gray-600 hover:text-purple-600">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-gray-600 hover:text-purple-600">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-gray-600 hover:text-purple-600">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-purple-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-purple-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-purple-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-purple-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-gray-600 hover:text-purple-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-600 mb-4">Stay updated with the latest features and releases.</p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="max-w-[220px]" />
              <Button type="submit" variant="default">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Creavibe.pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
