"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Book, Layout, Settings, Save, Eye, Download, Layers } from "lucide-react"

// Types
interface WebBookChapter {
  id: string
  title: string
  content: string
  sections: WebBookSection[]
  order: number
}

interface WebBookSection {
  id: string
  title: string
  content: string
  order: number
}

interface WebBook {
  id: string
  title: string
  description: string
  coverImage?: string
  author: string
  createdAt: string
  updatedAt: string
  chapters: WebBookChapter[]
  isPublished: boolean
  visibility: "public" | "private" | "restricted"
  theme: "light" | "dark" | "sepia"
  fontFamily: string
  fontSize: string
  customCss?: string
  allowComments: boolean
  enableSearch: boolean
  enableToc: boolean
}

// Sample book configuration
const initialConfig = {
  general: {
    title: "My Web Book",
    subtitle: "An interactive digital publication",
    author: "John Doe",
    language: "en",
    coverImage: "/placeholder.svg?key=ifw01",
    description: "This is a sample web book created with the Creavibe.pro platform.",
  },
  layout: {
    theme: "light",
    fontFamily: "serif",
    fontSize: 16,
    lineHeight: 1.6,
    pageWidth: "medium",
    navigationStyle: "sidebar",
  },
  features: {
    tableOfContents: true,
    pageNumbers: true,
    searchEnabled: true,
    highlightingEnabled: true,
    notesEnabled: true,
    bookmarksEnabled: true,
    socialSharing: true,
    printEnabled: false,
  },
  advanced: {
    customCSS: "",
    customJS: "",
    analyticsEnabled: true,
    accessControl: "public",
  },
}

// Main component
export function WebBookConfiguration() {
  const [config, setConfig] = useState(initialConfig)
  const [activeTab, setActiveTab] = useState("general")
  const [previewMode, setPreviewMode] = useState(false)

  const updateConfig = (section, field, value) => {
    setConfig({
      ...config,
      [section]: {
        ...config[section],
        [field]: value,
      },
    })
  }

  const handleSave = () => {
    console.log("Saving configuration:", config)
    // In a real app, this would save to a database
    alert("Configuration saved successfully!")
  }

  const handleExport = () => {
    const configJson = JSON.stringify(config, null, 2)
    const blob = new Blob([configJson], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "web-book-config.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handlePreviewToggle = () => {
    setPreviewMode(!previewMode)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Web Book Configuration</h1>
          <p className="text-muted-foreground">Customize your web book's appearance, features, and behavior</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePreviewToggle}>
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? "Exit Preview" : "Preview"}
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Adjust your web book settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs orientation="vertical" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex flex-col h-auto w-full">
                <TabsTrigger value="general" className="justify-start">
                  <Book className="h-4 w-4 mr-2" />
                  General
                </TabsTrigger>
                <TabsTrigger value="layout" className="justify-start">
                  <Layout className="h-4 w-4 mr-2" />
                  Layout & Typography
                </TabsTrigger>
                <TabsTrigger value="features" className="justify-start">
                  <Layers className="h-4 w-4 mr-2" />
                  Features
                </TabsTrigger>
                <TabsTrigger value="advanced" className="justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardContent className="p-6">
            <TabsContent value="general" className="mt-0">
              <h3 className="text-lg font-semibold mb-4">General Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Book Title</Label>
                    <Input
                      id="title"
                      value={config.general.title}
                      onChange={(e) => updateConfig("general", "title", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={config.general.subtitle}
                      onChange={(e) => updateConfig("general", "subtitle", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={config.general.author}
                      onChange={(e) => updateConfig("general", "author", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={config.general.language}
                      onValueChange={(value) => updateConfig("general", "language", value)}
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={config.general.description}
                    onChange={(e) => updateConfig("general", "description", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image URL</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Input
                        id="coverImage"
                        value={config.general.coverImage}
                        onChange={(e) => updateConfig("general", "coverImage", e.target.value)}
                      />
                    </div>
                    <div className="flex justify-center items-center border rounded-md p-2">
                      <img
                        src={config.general.coverImage || "/placeholder.svg"}
                        alt="Cover preview"
                        className="max-h-32 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="layout" className="mt-0">
              <h3 className="text-lg font-semibold mb-4">Layout & Typography</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select
                      value={config.layout.theme}
                      onValueChange={(value) => updateConfig("layout", "theme", value)}
                    >
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="sepia">Sepia</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fontFamily">Font Family</Label>
                    <Select
                      value={config.layout.fontFamily}
                      onValueChange={(value) => updateConfig("layout", "fontFamily", value)}
                    >
                      <SelectTrigger id="fontFamily">
                        <SelectValue placeholder="Select font family" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sans">Sans-serif</SelectItem>
                        <SelectItem value="serif">Serif</SelectItem>
                        <SelectItem value="mono">Monospace</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fontSize">Font Size: {config.layout.fontSize}px</Label>
                  <Slider
                    id="fontSize"
                    min={12}
                    max={24}
                    step={1}
                    value={[config.layout.fontSize]}
                    onValueChange={(value) => updateConfig("layout", "fontSize", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lineHeight">Line Height: {config.layout.lineHeight}</Label>
                  <Slider
                    id="lineHeight"
                    min={1.0}
                    max={2.0}
                    step={0.1}
                    value={[config.layout.lineHeight]}
                    onValueChange={(value) => updateConfig("layout", "lineHeight", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pageWidth">Page Width</Label>
                  <RadioGroup
                    id="pageWidth"
                    value={config.layout.pageWidth}
                    onValueChange={(value) => updateConfig("layout", "pageWidth", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="narrow" id="narrow" />
                      <Label htmlFor="narrow">Narrow</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="wide" id="wide" />
                      <Label htmlFor="wide">Wide</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full" id="full" />
                      <Label htmlFor="full">Full Width</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="navigationStyle">Navigation Style</Label>
                  <Select
                    value={config.layout.navigationStyle}
                    onValueChange={(value) => updateConfig("layout", "navigationStyle", value)}
                  >
                    <SelectTrigger id="navigationStyle">
                      <SelectValue placeholder="Select navigation style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sidebar">Sidebar</SelectItem>
                      <SelectItem value="top">Top Navigation</SelectItem>
                      <SelectItem value="bottom">Bottom Navigation</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-0">
              <h3 className="text-lg font-semibold mb-4">Features & Functionality</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tableOfContents"
                      checked={config.features.tableOfContents}
                      onCheckedChange={(checked) => updateConfig("features", "tableOfContents", checked)}
                    />
                    <Label htmlFor="tableOfContents">Table of Contents</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pageNumbers"
                      checked={config.features.pageNumbers}
                      onCheckedChange={(checked) => updateConfig("features", "pageNumbers", checked)}
                    />
                    <Label htmlFor="pageNumbers">Page Numbers</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="searchEnabled"
                      checked={config.features.searchEnabled}
                      onCheckedChange={(checked) => updateConfig("features", "searchEnabled", checked)}
                    />
                    <Label htmlFor="searchEnabled">Search Functionality</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="highlightingEnabled"
                      checked={config.features.highlightingEnabled}
                      onCheckedChange={(checked) => updateConfig("features", "highlightingEnabled", checked)}
                    />
                    <Label htmlFor="highlightingEnabled">Text Highlighting</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notesEnabled"
                      checked={config.features.notesEnabled}
                      onCheckedChange={(checked) => updateConfig("features", "notesEnabled", checked)}
                    />
                    <Label htmlFor="notesEnabled">Reader Notes</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bookmarksEnabled"
                      checked={config.features.bookmarksEnabled}
                      onCheckedChange={(checked) => updateConfig("features", "bookmarksEnabled", checked)}
                    />
                    <Label htmlFor="bookmarksEnabled">Bookmarks</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="socialSharing"
                      checked={config.features.socialSharing}
                      onCheckedChange={(checked) => updateConfig("features", "socialSharing", checked)}
                    />
                    <Label htmlFor="socialSharing">Social Sharing</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="printEnabled"
                      checked={config.features.printEnabled}
                      onCheckedChange={(checked) => updateConfig("features", "printEnabled", checked)}
                    />
                    <Label htmlFor="printEnabled">Print Functionality</Label>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="mt-0">
              <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customCSS">Custom CSS</Label>
                  <Textarea
                    id="customCSS"
                    rows={4}
                    value={config.advanced.customCSS}
                    onChange={(e) => updateConfig("advanced", "customCSS", e.target.value)}
                    placeholder="/* Add your custom CSS here */"
                    className="font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customJS">Custom JavaScript</Label>
                  <Textarea
                    id="customJS"
                    rows={4}
                    value={config.advanced.customJS}
                    onChange={(e) => updateConfig("advanced", "customJS", e.target.value)}
                    placeholder="// Add your custom JavaScript here"
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="analyticsEnabled"
                    checked={config.advanced.analyticsEnabled}
                    onCheckedChange={(checked) => updateConfig("advanced", "analyticsEnabled", checked)}
                  />
                  <Label htmlFor="analyticsEnabled">Enable Analytics</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accessControl">Access Control</Label>
                  <Select
                    value={config.advanced.accessControl}
                    onValueChange={(value) => updateConfig("advanced", "accessControl", value)}
                  >
                    <SelectTrigger id="accessControl">
                      <SelectValue placeholder="Select access control" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public (Anyone can view)</SelectItem>
                      <SelectItem value="private">Private (Only you)</SelectItem>
                      <SelectItem value="password">Password Protected</SelectItem>
                      <SelectItem value="members">Members Only</SelectItem>
                      <SelectItem value="paid">Paid Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Reset to Defaults</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
