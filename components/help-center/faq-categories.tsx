"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { faqCategories } from "@/lib/mock-help-data"

export default function FaqCategories() {
  const [activeTab, setActiveTab] = useState("getting-started")

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

      <Tabs defaultValue="getting-started" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
          {faqCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {faqCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <Card>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <div className="prose prose-sm max-w-none">
                          <p>{faq.answer}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
