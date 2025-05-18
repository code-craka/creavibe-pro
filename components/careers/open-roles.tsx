"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const departments = ["All", "Engineering", "Product", "Marketing", "Design", "Operations"]

const openRoles = [
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    remote: true,
    description: "Join our frontend team to build beautiful, responsive interfaces for our AI-powered platform.",
  },
  {
    title: "AI Research Scientist",
    department: "Engineering",
    location: "Remote",
    remote: true,
    description: "Help us push the boundaries of what's possible with AI in content creation.",
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "New York, NY",
    remote: true,
    description: "Lead product initiatives that help our users create amazing content with AI.",
  },
  {
    title: "Content Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    remote: true,
    description: "Create compelling content that showcases the power of our platform.",
  },
  {
    title: "UX/UI Designer",
    department: "Design",
    location: "London, UK",
    remote: true,
    description: "Design intuitive, beautiful experiences that make AI accessible to everyone.",
  },
  {
    title: "Customer Success Manager",
    department: "Operations",
    location: "Berlin, Germany",
    remote: false,
    description: "Help our customers get the most out of Creavibe.pro and achieve their content goals.",
  },
]

export function OpenRoles() {
  const [activeTab, setActiveTab] = useState("All")

  const filteredRoles = activeTab === "All" ? openRoles : openRoles.filter((role) => role.department === activeTab)

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>

      <Tabs defaultValue="All" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
          {departments.map((dept) => (
            <TabsTrigger key={dept} value={dept}>
              {dept}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {filteredRoles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRoles.map((role) => (
                <Card key={role.title} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{role.title}</h3>
                      {role.remote && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Remote
                        </Badge>
                      )}
                    </div>
                    <p className="text-purple-600 mb-3">
                      {role.department} • {role.location}
                    </p>
                    <p className="text-gray-600 mb-4">{role.description}</p>
                    <Button>Apply Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-600">No open positions in this department at the moment.</p>
              <p className="text-purple-600 mt-2">Check back soon or send us your resume for future opportunities!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  )
}
