import type { Metadata } from "next"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactSidebar } from "@/components/contact/contact-sidebar"
import { MapEmbed } from "@/components/contact/map-embed"

export const metadata: Metadata = {
  title: "Contact Us | CreaVibe",
  description: "Get in touch with the CreaVibe team for support, inquiries, or partnerships.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
        <div>
          <ContactSidebar />
          <div className="mt-8">
            <MapEmbed />
          </div>
        </div>
      </div>
    </div>
  )
}
