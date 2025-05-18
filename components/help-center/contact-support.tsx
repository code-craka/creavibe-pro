import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactSupport() {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8">Still Need Help?</h2>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Our support team is here to help you with any questions or issues you may have. Choose the option that works
        best for you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <Mail className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Email Support</CardTitle>
            <CardDescription>Send us an email and we'll get back to you within 24 hours.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Our support team is available Monday through Friday, 9am-5pm PT.</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Email Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <MessageSquare className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Live Chat</CardTitle>
            <CardDescription>Chat with our support team in real-time for immediate assistance.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Live chat is available Monday through Friday, 9am-5pm PT.</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Start Chat
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Phone className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Phone Support</CardTitle>
            <CardDescription>Speak directly with a support representative for complex issues.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Phone support is available for Premium and Enterprise customers.</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Call Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
