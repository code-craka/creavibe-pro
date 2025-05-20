import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Mail, Phone, Clock } from "lucide-react"

export function ContactSidebar() {
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-6">Contact Information</h2>

        <div className="space-y-4">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-gray-600">
                123 Innovation Way
                <br />
                San Francisco, CA 94107
                <br />
                United States
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Mail className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600">
                <a href="mailto:support@creavibe.app" className="hover:text-purple-600">
                  support@creavibe.app
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Phone className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-gray-600">
                <a href="tel:+14155550123" className="hover:text-purple-600">
                  +1 (415) 555-0123
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold">Business Hours</h3>
              <p className="text-gray-600">
                Monday - Friday: 9am - 5pm PST
                <br />
                Saturday - Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
