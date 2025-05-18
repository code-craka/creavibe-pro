import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Info } from "lucide-react"

export function TermsOfServiceContent() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section id="introduction" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">1. Introduction</h2>
        <p>
          Welcome to Creavibe.pro. These Terms of Service ("Terms") govern your access to and use of Creavibe.pro's
          website, services, and applications (collectively, the "Services"). By accessing or using our Services, you
          agree to be bound by these Terms and our Privacy Policy.
        </p>
        <p>
          Please read these Terms carefully before using our Services. If you do not agree to these Terms, you may not
          access or use our Services. By using our Services, you acknowledge that you have read, understood, and agree
          to be bound by these Terms.
        </p>
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            These Terms constitute a legally binding agreement between you and Creavibe.pro, operated by TechSci, Inc.
          </AlertDescription>
        </Alert>
      </section>

      {/* User Responsibilities */}
      <section id="user-responsibilities" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">2. User Responsibilities</h2>
        <p>
          When using our Services, you are responsible for maintaining the confidentiality of your account information
          and for all activities that occur under your account. You agree to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide accurate, current, and complete information when creating your account</li>
          <li>Maintain and promptly update your account information</li>
          <li>
            Maintain the security of your account by protecting your password and restricting access to your account
          </li>
          <li>Notify Creavibe.pro immediately of any unauthorized access to or use of your account</li>
          <li>
            Take responsibility for all activities that occur under your account and accept all risks of unauthorized
            access
          </li>
        </ul>
        <Card>
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
            <CardDescription>Your responsibilities for maintaining account security</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              You are solely responsible for maintaining the confidentiality and security of your account credentials.
              We recommend using strong, unique passwords and enabling two-factor authentication when available. You
              must immediately notify us of any unauthorized use of your account or any other breach of security.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Acceptable Use */}
      <section id="acceptable-use" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">3. Acceptable Use</h2>
        <p>
          You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to
          use our Services:
        </p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="prohibited-activities">
            <AccordionTrigger>Prohibited Activities</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  In any way that violates any applicable federal, state, local, or international law or regulation
                </li>
                <li>
                  To transmit, or procure the sending of, any advertising or promotional material, including any "junk
                  mail," "chain letter," "spam," or any other similar solicitation
                </li>
                <li>
                  To impersonate or attempt to impersonate Creavibe.pro, a Creavibe.pro employee, another user, or any
                  other person or entity
                </li>
                <li>
                  To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Services,
                  or which may harm Creavibe.pro or users of the Services
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="prohibited-content">
            <AccordionTrigger>Prohibited Content</AccordionTrigger>
            <AccordionContent>
              <p>You agree not to create, upload, post, or transmit any content that:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  Is illegal, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous,
                  or invasive of another's privacy
                </li>
                <li>
                  Infringes any patent, trademark, trade secret, copyright, or other intellectual property or
                  proprietary rights of any party
                </li>
                <li>
                  Contains software viruses or any other computer code, files, or programs designed to interrupt,
                  destroy, or limit the functionality of any computer software or hardware
                </li>
                <li>Interferes with or disrupts the Services or servers or networks connected to the Services</li>
                <li>Contains misleading, deceptive, or fraudulent information</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Violation of these acceptable use policies may result in termination of your account and access to our
            Services.
          </AlertDescription>
        </Alert>
      </section>

      {/* Account and API Key Access */}
      <section id="account-api-access" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">4. Account and API Key Access</h2>
        <p>
          To access certain features of our Services, you may be required to register for an account and obtain API
          keys. When registering for an account, you agree to provide accurate, current, and complete information.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>API Key Usage</CardTitle>
            <CardDescription>Guidelines for using Creavibe.pro API keys</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>API keys are unique to your account and should not be shared with third parties</li>
              <li>You are responsible for all activities that occur under your API keys</li>
              <li>You must follow any rate limits or usage guidelines provided in our documentation</li>
              <li>We reserve the right to revoke API access if we detect abuse or violation of these Terms</li>
              <li>
                You must implement appropriate security measures to protect your API keys from unauthorized access
              </li>
            </ul>
          </CardContent>
        </Card>
        <p>
          You are responsible for safeguarding your API keys and for all activities that occur through the use of your
          API keys. You agree to notify us immediately of any unauthorized use of your API keys or any other breach of
          security.
        </p>
      </section>

      {/* Intellectual Property */}
      <section id="intellectual-property" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">5. Intellectual Property</h2>
        <p>
          The Services and their entire contents, features, and functionality (including but not limited to all
          information, software, text, displays, images, video, and audio, and the design, selection, and arrangement
          thereof) are owned by Creavibe.pro, its licensors, or other providers of such material and are protected by
          United States and international copyright, trademark, patent, trade secret, and other intellectual property or
          proprietary rights laws.
        </p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="ownership">
            <AccordionTrigger>Ownership of Content</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                <strong>Your Content:</strong> You retain all rights to any content you create, upload, or share through
                our Services ("User Content"). By uploading or sharing User Content, you grant Creavibe.pro a worldwide,
                non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute
                your User Content in connection with providing and promoting our Services.
              </p>
              <p>
                <strong>Our Content:</strong> All content provided by Creavibe.pro, including but not limited to text,
                graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, is the
                property of Creavibe.pro or its content suppliers and is protected by international copyright laws.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="restrictions">
            <AccordionTrigger>Usage Restrictions</AccordionTrigger>
            <AccordionContent>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  Modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative
                  works from, transfer, or sell any information, software, products, or services obtained from the
                  Services without prior written permission from Creavibe.pro
                </li>
                <li>
                  Use any automated means, including, without limitation, agents, robots, scripts, or spiders, to
                  access, monitor, or copy any part of the Services
                </li>
                <li>
                  Attempt to decipher, decompile, disassemble, or reverse engineer any of the software comprising or in
                  any way making up a part of the Services
                </li>
                <li>Remove any copyright, trademark, or other proprietary notices from any portion of the Services</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Disclaimer & Limitation of Liability */}
      <section id="disclaimer-liability" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">6. Disclaimer & Limitation of Liability</h2>
        <Card>
          <CardHeader>
            <CardTitle>Disclaimer of Warranties</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">
              THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED. CREAVIBE.PRO DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, WITHOUT
              LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </CardContent>
        </Card>
        <p>
          Creavibe.pro does not warrant that the Services will be uninterrupted or error-free, that defects will be
          corrected, or that the Services or the server that makes them available are free of viruses or other harmful
          components.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">
              IN NO EVENT WILL CREAVIBE.PRO, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS,
              OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN
              CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SERVICES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL,
              INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
            </p>
          </CardContent>
        </Card>
        <p>
          Creavibe.pro is not responsible for the content, accuracy, or opinions expressed in any user-generated content
          on our Services. Such content does not necessarily reflect the opinions or policies of Creavibe.pro.
        </p>
      </section>

      {/* Termination & Account Deletion */}
      <section id="termination-deletion" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">7. Termination & Account Deletion</h2>
        <p>
          We may terminate or suspend your account and access to our Services immediately, without prior notice or
          liability, for any reason whatsoever, including, without limitation, if you breach these Terms.
        </p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="termination-by-creavibe">
            <AccordionTrigger>Termination by Creavibe.pro</AccordionTrigger>
            <AccordionContent>
              <p>
                Creavibe.pro may terminate your access to all or any part of the Services at any time, with or without
                cause, with or without notice, effective immediately. Reasons for termination may include, but are not
                limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Violation of these Terms</li>
                <li>Engaging in fraudulent or illegal activities</li>
                <li>Creating risk or possible legal exposure for Creavibe.pro</li>
                <li>Extended periods of inactivity</li>
                <li>Non-payment of any fees owed</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="account-deletion">
            <AccordionTrigger>Account Deletion by User</AccordionTrigger>
            <AccordionContent>
              <p>You may delete your account at any time by following these steps:</p>
              <ol className="list-decimal pl-6 space-y-2 mt-2">
                <li>Log in to your Creavibe.pro account</li>
                <li>Navigate to Account Settings</li>
                <li>Select the "Delete Account" option</li>
                <li>Follow the confirmation process</li>
              </ol>
              <p className="mt-2">
                Upon account deletion, your personal information will be handled as described in our Privacy Policy.
                Certain information may be retained as required for legal or legitimate business purposes.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="consequences">
            <AccordionTrigger>Consequences of Termination</AccordionTrigger>
            <AccordionContent>
              <p>Upon termination of your account:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Your right to access and use the Services will immediately cease</li>
                <li>All API keys associated with your account will be invalidated</li>
                <li>Any pending transactions may be cancelled</li>
                <li>We may delete or archive your data according to our data retention policies</li>
                <li>You will remain liable for any outstanding fees or obligations incurred before termination</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Jurisdiction */}
      <section id="jurisdiction" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">8. Jurisdiction</h2>
        <p>
          These Terms and your use of the Services shall be governed by and construed in accordance with the laws of the
          State of Delaware, without giving effect to any principles of conflicts of law. Any legal action or proceeding
          arising under these Terms shall be brought exclusively in the federal or state courts located in Delaware,
          USA, and you hereby consent to the personal jurisdiction and venue therein.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Dispute Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Any dispute arising from or relating to these Terms or your use of the Services shall first be attempted
              to be resolved through informal negotiation. If the dispute cannot be resolved through informal
              negotiation, it shall be resolved through binding arbitration in Delaware, USA, in accordance with the
              rules of the American Arbitration Association.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Contact Information */}
      <section id="contact-information" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">9. Contact Information</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <Card>
          <CardContent className="pt-6">
            <p className="font-medium">TechSci, Inc.</p>
            <p>651 N Broad St, Suite 201</p>
            <p>Middletown, DE 19709, USA</p>
            <p className="mt-4">
              Email:{" "}
              <a href="mailto:hello@creavibe.pro" className="text-primary hover:underline">
                hello@creavibe.pro
              </a>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Final Provisions */}
      <section id="final-provisions" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">10. Final Provisions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="modifications">
            <AccordionTrigger>Modifications to Terms</AccordionTrigger>
            <AccordionContent>
              <p>
                Creavibe.pro reserves the right to modify these Terms at any time. We will provide notice of any
                material changes by posting the new Terms on our website and updating the "Last Updated" date. Your
                continued use of the Services after any such changes constitutes your acceptance of the new Terms.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="severability">
            <AccordionTrigger>Severability</AccordionTrigger>
            <AccordionContent>
              <p>
                If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck
                and the remaining provisions shall be enforced to the fullest extent under law.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="waiver">
            <AccordionTrigger>Waiver</AccordionTrigger>
            <AccordionContent>
              <p>
                The failure of Creavibe.pro to enforce any right or provision of these Terms will not be deemed a waiver
                of such right or provision. Any waiver of any provision of these Terms will be effective only if in
                writing and signed by Creavibe.pro.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="entire-agreement">
            <AccordionTrigger>Entire Agreement</AccordionTrigger>
            <AccordionContent>
              <p>
                These Terms, together with the Privacy Policy and any other legal notices published by Creavibe.pro on
                the Services, shall constitute the entire agreement between you and Creavibe.pro concerning the
                Services.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  )
}
