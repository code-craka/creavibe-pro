"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqItems = [
  {
    question: "What's included in the free plan?",
    answer:
      "The free plan includes 5 AI-generated content pieces per month, access to basic templates, 5GB of storage, and email support. It's perfect for individuals who are just getting started with AI content creation.",
  },
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new pricing will be effective immediately. If you downgrade, the new pricing will take effect at the end of your current billing cycle.",
  },
  {
    question: "How does the 14-day free trial work?",
    answer:
      "All paid plans come with a 14-day free trial. You won't be charged until the trial period ends, and you can cancel anytime during the trial period without being charged.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. We also support payment via PayPal for select regions.",
  },
  {
    question: "Is there a limit to how many users I can add to the Team plan?",
    answer:
      "The Team plan includes up to 10 users. If you need more users, please contact our sales team for a custom enterprise solution tailored to your organization's needs.",
  },
  {
    question: "What happens to my content if I cancel my subscription?",
    answer:
      "If you cancel your subscription, you'll still have access to your content until the end of your billing period. After that, your account will be downgraded to the Free plan, and you'll have limited access to your content. Your content will be stored for 30 days, after which it may be deleted.",
  },
]

export default function PricingFAQ() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Have questions about our pricing? Find answers to common questions below.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center">
            <p className="text-muted-foreground">
              Still have questions?{" "}
              <a href="/contact" className="font-medium text-primary hover:underline">
                Contact our team
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
