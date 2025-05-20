import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Sparkles, Users, History, Shield, Zap, Star } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="inline-block font-bold">CreaVibe</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#features"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Pricing
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Login
              </Link>
              <Button asChild size="sm">
                <Link href="/signup">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex rounded-md px-3 py-1 text-sm" variant="secondary">
                    New Release
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Create, Collaborate, and Captivate with AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    CreaVibe combines AI-powered content creation with real-time collaboration tools, empowering
                    marketing teams and creators to produce exceptional content faster than ever.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="h-12 px-6">
                    Start Creating for Free
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-6">
                    Book a Demo
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>No credit card required</span>
                  </div>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl border bg-background md:h-[420px] lg:h-[500px]">
                  <div className="animate-pulse-slow absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-muted"></div>
                  <Image
                    src="/modern-content-dashboard.png"
                    width={700}
                    height={500}
                    alt="CreaVibe dashboard interface"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  Powerful Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Create</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  CreaVibe combines powerful AI tools with intuitive collaboration features to streamline your
                  content creation workflow.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Sparkles className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>AI-Powered Creation</CardTitle>
                  <CardDescription>
                    Generate blog posts, images, and videos with state-of-the-art AI models tailored to your brand
                    voice.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Real-time Collaboration</CardTitle>
                  <CardDescription>
                    Work together seamlessly with your team through shared workspaces and live editing capabilities.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <History className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Version History</CardTitle>
                  <CardDescription>
                    Track changes, compare versions, and restore previous work with comprehensive version control.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Role-Based Access</CardTitle>
                  <CardDescription>
                    Manage permissions and access levels for team members with customizable role assignments.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Instant Publishing</CardTitle>
                  <CardDescription>
                    Publish content directly to your platforms with one-click integration to major CMS systems.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Star className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Advanced Analytics</CardTitle>
                  <CardDescription>
                    Gain insights into content performance with detailed analytics and actionable recommendations.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Creators Worldwide</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what our customers are saying about how CreaVibe has transformed their content creation
                  process.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/professional-woman-headshot.png"
                      alt="Sarah Johnson"
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                      <CardDescription>Marketing Director, TechFlow</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "CreaVibe has revolutionized our content strategy. We're producing twice the content in half the
                    time, and the AI-generated drafts are remarkably on-brand."
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/professional-man-headshot.png"
                      alt="David Chen"
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">David Chen</CardTitle>
                      <CardDescription>Content Creator, Visionary Media</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "The collaboration features are game-changing. My team can work together seamlessly, and the version
                    history has saved us countless times when we needed to revert changes."
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/diverse-professional-woman-headshots.png"
                      alt="Maya Patel"
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">Maya Patel</CardTitle>
                      <CardDescription>CEO, Innovate Agency</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "We've cut our content production costs by 40% while increasing output by 75%. The ROI with
                    CreaVibe has been incredible for our agency and our clients."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for your team. All plans include a 14-day free trial.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$29</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>Perfect for individual creators and small projects.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>5 AI-generated content pieces/month</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Basic collaboration tools</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>1 workspace</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>5GB storage</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Email support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col border-primary relative">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
                <CardHeader>
                  <CardTitle>Professional</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$79</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>Ideal for growing teams and businesses.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>25 AI-generated content pieces/month</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Advanced collaboration tools</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>3 workspaces</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>25GB storage</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Priority email & chat support</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Analytics dashboard</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$199</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>For large teams and organizations with advanced needs.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Unlimited AI-generated content</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Premium collaboration suite</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Unlimited workspaces</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>100GB storage</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>24/7 priority support</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Advanced analytics & reporting</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Custom integrations</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Content Creation?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Join thousands of creators and marketing teams who are already using CreaVibe to produce
                  exceptional content.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" className="h-12 px-8">
                  Start Your Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <span className="font-bold">CreaVibe</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered content creation and real-time collaboration for modern teams.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M12 2H2v10h10V2zM22 2h-10v10h10V2zM12 12H2v10h10V12zM22 12h-10v10h10V12z"></path>
                  </svg>
                  <span className="sr-only">Slack</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} CreaVibe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
