import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function PrivacyPolicyContent() {
  return (
    <div className="space-y-10">
      {/* Introduction & Contact Information */}
      <section id="introduction" className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Introduction & Contact Information</h2>
        <div className="prose prose-gray max-w-none">
          <p>
            At CreaVibe, we take your privacy seriously. This Privacy Policy explains how TechSci, Inc. collects,
            uses, and protects your personal information when you use our platform. We are committed to ensuring that
            your privacy is protected in compliance with the General Data Protection Regulation (GDPR) and other
            applicable privacy laws.
          </p>
          <p>
            By using CreaVibe, you agree to the collection and use of information in accordance with this policy.
          </p>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Data controller details</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="font-medium text-muted-foreground">Company Name</dt>
                  <dd>TechSci, Inc.</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Address</dt>
                  <dd>651 N Broad St, Suite 201, Middletown, DE 19709, USA</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Phone</dt>
                  <dd>(302) 279-2345</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Email</dt>
                  <dd>
                    <a href="mailto:hello@CreaVibe" className="text-primary hover:underline">
                      hello@CreaVibe
                    </a>
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What Data We Collect */}
      <section id="data-collection" className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">What Data We Collect</h2>
        <div className="prose prose-gray max-w-none">
          <p>
            We collect various types of information to provide and improve our services to you. Here's what we collect:
          </p>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="usage">Usage Data</TabsTrigger>
            <TabsTrigger value="payment">Payment Information</TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="space-y-4">
            <h3 className="text-lg font-medium">Personal Identification Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Profile picture (optional)</li>
              <li>Job title and company (optional)</li>
            </ul>
          </TabsContent>
          <TabsContent value="usage" className="space-y-4">
            <h3 className="text-lg font-medium">Usage Data</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited and features used</li>
              <li>Time spent on pages</li>
              <li>Referring website</li>
              <li>Time and date of visits</li>
              <li>Click patterns</li>
            </ul>
          </TabsContent>
          <TabsContent value="payment" className="space-y-4">
            <h3 className="text-lg font-medium">Payment Information</h3>
            <p>
              When you subscribe to our paid services, we collect payment information through our payment processor,
              Stripe. We do not store complete credit card information on our servers.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Billing address</li>
              <li>Payment method details (processed securely by Stripe)</li>
              <li>Transaction history</li>
              <li>Subscription details</li>
            </ul>
          </TabsContent>
        </Tabs>
      </section>

      {/* How We Use Your Data */}
      <section id="data-usage" className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">How We Use Your Data</h2>
        <div className="prose prose-gray max-w-none">
          <p>We use the collected data for various purposes, including:</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="service">
            <AccordionTrigger>Providing and Improving Our Services</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide access to our platform and its features</li>
                <li>To maintain and improve our services</li>
                <li>To develop new features, products, and services</li>
                <li>To fix bugs and resolve technical issues</li>
                <li>To analyze usage patterns and optimize user experience</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="personalization">
            <AccordionTrigger>Personalizing User Experience</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>To remember your preferences and settings</li>
                <li>To customize content and recommendations</li>
                <li>To provide personalized features</li>
                <li>To recognize you across different devices</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="payments">
            <AccordionTrigger>Processing Payments</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>To process subscription payments</li>
                <li>To prevent fraudulent transactions</li>
                <li>To maintain billing records</li>
                <li>To provide receipts and invoices</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="communication">
            <AccordionTrigger>Communicating With Users</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>To send administrative emails (e.g., password resets, account notifications)</li>
                <li>To provide customer support</li>
                <li>To send updates about our services</li>
                <li>To send marketing communications (with consent)</li>
                <li>To respond to inquiries and requests</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Legal Basis Under GDPR */}
      <section id="legal-basis" className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Legal Basis Under GDPR</h2>
        <div className="prose prose-gray max-w-none">
          <p>
            Under the General Data Protection Regulation (GDPR), we process your personal data based on the following
            legal grounds:
          </p>

          <Card className="mt-6">
            <CardContent className="pt-6">
              <dl className="space-y-6">
                <div>
                  <dt className="font-semibold">Consent</dt>
                  <dd className="mt-1">
                    When you explicitly agree to the processing of your personal data for specific purposes, such as
                    receiving marketing communications or enabling certain optional features.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Performance of a Contract</dt>
                  <dd className="mt-1">
                    When processing is necessary for the performance of our contract with you, such as providing access
                    to our platform and its features after you subscribe.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Legitimate Interests</dt>
                  <dd className="mt-1">
                    When processing is necessary for our legitimate interests, such as improving our services,
                    preventing fraud, and ensuring the security of our platform, provided these interests are not
                    overridden by your rights and freedoms.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Legal Obligation</dt>
                  <dd className="mt-1">
                    When processing is necessary to comply with a legal obligation to which we are subject, such as tax
                    laws or responding to legal requests from authorities.
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Data Retention Policy */}
      <section id="data-retention" className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Data Retention Policy</h2>
        <div className="prose prose-gray max-w-none">
          <p>
            We retain your personal data only for as long as necessary to fulfill the purposes for which it was
            collected, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting
            requirements.
          </p>

          <h3 className="text-lg font-medium mt-6">Retention Periods</h3>
          <ul>
            <li>
              <strong>Account Information:</strong> We retain your account information for as long as your account is
              active. If you request deletion of your account, we will delete or anonymize your personal data within 30
              days, unless we are required to retain it for legal reasons.
            </li>
            <li>
              <strong>Usage Data:</strong> We retain usage data for up to 24 months to analyze trends and improve our
              services.
            </li>
            <li>
              <strong>Payment Information:</strong> We retain payment information for as long as necessary to process
              payments and comply with tax and accounting requirements, typically 7 years.
            </li>
            <li>
              <strong>Communication Data:</strong> We retain communications with our support team for up to 3 years to
              provide better assistance and maintain records of issues resolved.
            </li>
          </ul>

          <p>We regularly review our retention periods to ensure we only keep data for as long as necessary.</p>
        </div>
      </section>

      {/* Third-Party Services */}
      <section id="third-party" className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Third-Party Services</h2>
        <div className="prose prose-gray max-w-none">
          <p>
            We use third-party services to help us operate our platform and provide our services. These third parties
            have access to your personal data only to perform specific tasks on our behalf and are obligated not to
            disclose or use it for any other purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>OpenAI</CardTitle>
              <CardDescription>AI content generation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                We use OpenAI's API to power our AI content generation features. When you use these features, your
                prompts and generated content may be processed by OpenAI.
              </p>
              <Link
                href="https://openai.com/policies/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                View OpenAI's Privacy Policy
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Supabase</CardTitle>
              <CardDescription>Database and authentication</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                We use Supabase for our database and authentication services. Your account information and content are
                stored securely in Supabase's infrastructure.
              </p>
              <Link
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                View Supabase's Privacy Policy
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stripe</CardTitle>
              <CardDescription>Payment processing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                We use Stripe to process payments. When you make a payment, your payment information is handled directly
                by Stripe's secure payment processing system.
              </p>
              <Link
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                View Stripe's Privacy Policy
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Your Rights */}
      <section id="your-rights" className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Your Rights</h2>
        <div className="prose prose-gray max-w-none">
          <p>Under the GDPR and other applicable privacy laws, you have certain rights regarding your personal data:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="flex">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Right to Access</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You have the right to request copies of your personal data that we hold.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Right to Rectification</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You have the right to request that we correct any inaccurate or incomplete personal data.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Right to Erasure</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You have the right to request that we delete your personal data in certain circumstances.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Right to Data Portability</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You have the right to request that we transfer your data to another controller or directly to you.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Right to Object</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You have the right to object to the processing of your personal data in certain circumstances.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Right to Restriction</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You have the right to request that we restrict the processing of your personal data in certain
                circumstances.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 prose prose-gray max-w-none">
          <p>
            To exercise any of these rights, please contact us using the information provided in the "How to Contact Us
            About Privacy" section. We will respond to your request within 30 days.
          </p>
        </div>
      </section>

      {/* Cookies & Tracking */}
      <section id="cookies" className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Cookies & Tracking</h2>
        <div className="prose prose-gray max-w-none">
          <p>
            We use cookies and similar tracking technologies to track activity on our platform and hold certain
            information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
          </p>

          <h3 className="text-lg font-medium mt-6">Types of Cookies We Use</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Essential Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                These cookies are necessary for the website to function properly. They enable core functionality such as
                security, network management, and account access. You cannot opt out of these cookies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preference Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                These cookies enable us to remember your preferences and settings, such as language preference and
                display settings. They help make your experience more personalized.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                These cookies help us understand how visitors interact with our website by collecting and reporting
                information anonymously. They help us improve our website and services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Marketing Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                These cookies track your online activity to help advertisers deliver more relevant advertising or to
                limit how many times you see an ad. They can share that information with other organizations or
                advertisers.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-gray max-w-none mt-6">
          <h3 className="text-lg font-medium">Managing Your Cookie Preferences</h3>
          <p>
            Most web browsers allow you to control cookies through their settings preferences. However, if you limit the
            ability of websites to set cookies, you may worsen your overall user experience.
          </p>

          <p>
            To manage your cookie preferences on our platform, you can use our cookie consent banner that appears when
            you first visit our site, or you can update your preferences at any time by clicking on the "Cookie
            Settings" link in the footer of our website.
          </p>
        </div>
      </section>

      {/* Data Protection Officer */}
      <section id="dpo" className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Data Protection Officer (DPO)</h2>
        <div className="prose prose-gray max-w-none">
          <p>
            We have appointed a Data Protection Officer (DPO) who is responsible for overseeing questions in relation to
            this Privacy Policy. If you have any questions about this Privacy Policy, including any requests to exercise
            your legal rights, please contact our DPO using the details below:
          </p>
        </div>

        <Card className="mt-6">
          <CardContent className="pt-6">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="font-medium text-muted-foreground">Name</dt>
                <dd>Sarah Johnson</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Email</dt>
                <dd>
                  <a href="mailto:privacy@CreaVibe" className="text-primary hover:underline">
                    privacy@CreaVibe
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Phone</dt>
                <dd>(302) 279-2346</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Address</dt>
                <dd>651 N Broad St, Suite 201, Middletown, DE 19709, USA</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </section>

      {/* How to Contact Us About Privacy */}
      <section id="contact" className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">How to Contact Us About Privacy</h2>
        <div className="prose prose-gray max-w-none">
          <p>
            If you have any questions or concerns about our Privacy Policy or our data practices, please contact us
            using one of the following methods:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a href="mailto:privacy@CreaVibe" className="text-primary hover:underline">
                privacy@CreaVibe
              </a>
              <p className="text-sm text-muted-foreground mt-2">For privacy-related inquiries and data requests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                Phone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>(302) 279-2345</p>
              <p className="text-sm text-muted-foreground mt-2">Monday - Friday, 9:00 AM - 5:00 PM EST</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                  />
                </svg>
                Mail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <address className="not-italic">
                Privacy Department
                <br />
                TechSci, Inc.
                <br />
                651 N Broad St, Suite 201
                <br />
                Middletown, DE 19709
                <br />
                USA
              </address>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-gray max-w-none mt-6">
          <p>
            We are committed to addressing your concerns and resolving any issues regarding your privacy. If you are not
            satisfied with our response, you have the right to lodge a complaint with a supervisory authority.
          </p>
        </div>
      </section>

      {/* Footer with last updated date */}
      <footer className="border-t pt-8 mt-12">
        <p className="text-sm text-muted-foreground">
          This Privacy Policy was last updated on May 18, 2025. We may update this Privacy Policy from time to time. We
          will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated"
          date.
        </p>
      </footer>
    </div>
  )
}
