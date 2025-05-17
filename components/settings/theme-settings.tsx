"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import { Check, Moon, Sun, Monitor } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

// Color palettes
const colorPalettes = [
  { id: "purple", name: "Purple (Default)", primary: "#8b5cf6", secondary: "#c4b5fd" },
  { id: "blue", name: "Ocean Blue", primary: "#3b82f6", secondary: "#93c5fd" },
  { id: "green", name: "Forest Green", primary: "#10b981", secondary: "#6ee7b7" },
  { id: "red", name: "Ruby Red", primary: "#ef4444", secondary: "#fca5a5" },
  { id: "orange", name: "Sunset Orange", primary: "#f97316", secondary: "#fdba74" },
  { id: "pink", name: "Vibrant Pink", primary: "#ec4899", secondary: "#f9a8d4" },
  { id: "custom", name: "Custom", primary: "#8b5cf6", secondary: "#c4b5fd" },
]

// Font options
const fontOptions = [
  { value: "inter", label: "Inter (Default)" },
  { value: "roboto", label: "Roboto" },
  { value: "poppins", label: "Poppins" },
  { value: "montserrat", label: "Montserrat" },
  { value: "opensans", label: "Open Sans" },
]

export function ThemeSettings() {
  const { toast } = useToast()
  const [themeMode, setThemeMode] = useState("system")
  const [selectedPalette, setSelectedPalette] = useState("purple")
  const [customColors, setCustomColors] = useState({
    primary: "#8b5cf6",
    secondary: "#c4b5fd",
  })
  const [fontSize, setFontSize] = useState(16)
  const [fontFamily, setFontFamily] = useState("inter")
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)

  const handleSaveTheme = async () => {
    // Simulate API call to save theme settings
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Theme settings saved",
      description: "Your theme preferences have been updated successfully.",
    })
  }

  const handleResetTheme = () => {
    setThemeMode("system")
    setSelectedPalette("purple")
    setCustomColors({
      primary: "#8b5cf6",
      secondary: "#c4b5fd",
    })
    setFontSize(16)
    setFontFamily("inter")
    setReducedMotion(false)
    setHighContrast(false)

    toast({
      title: "Theme reset",
      description: "Your theme settings have been reset to default.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme Preferences</CardTitle>
          <CardDescription>Customize the appearance of the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Mode Selection */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Theme Mode</h3>
              <p className="text-sm text-muted-foreground">Choose between light, dark, or system theme</p>
            </div>
            <RadioGroup
              defaultValue={themeMode}
              value={themeMode}
              onValueChange={setThemeMode}
              className="grid grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem value="light" id="theme-light" className="peer sr-only" />
                <Label
                  htmlFor="theme-light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Sun className="mb-3 h-6 w-6" />
                  Light
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" />
                <Label
                  htmlFor="theme-dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Moon className="mb-3 h-6 w-6" />
                  Dark
                </Label>
              </div>
              <div>
                <RadioGroupItem value="system" id="theme-system" className="peer sr-only" />
                <Label
                  htmlFor="theme-system"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Monitor className="mb-3 h-6 w-6" />
                  System
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Color Palette Selection */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Color Palette</h3>
              <p className="text-sm text-muted-foreground">Choose a color scheme for the application</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {colorPalettes.map((palette) => (
                <button
                  key={palette.id}
                  type="button"
                  onClick={() => setSelectedPalette(palette.id)}
                  className={`relative rounded-md p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                    selectedPalette === palette.id ? "ring-2 ring-primary ring-offset-2" : "ring-1 ring-border"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-2">
                      <div
                        className="h-6 w-6 rounded-full"
                        style={{ backgroundColor: palette.primary }}
                        aria-hidden="true"
                      />
                      <div
                        className="h-6 w-6 rounded-full"
                        style={{ backgroundColor: palette.secondary }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-xs font-medium">{palette.name}</span>
                  </div>
                  {selectedPalette === palette.id && (
                    <div className="absolute top-1 right-1 h-4 w-4 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {selectedPalette === "custom" && (
              <div className="space-y-4 p-4 border rounded-md">
                <h4 className="font-medium">Custom Colors</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: customColors.primary }} />
                      <Input
                        id="primary-color"
                        type="text"
                        value={customColors.primary}
                        onChange={(e) => setCustomColors((prev) => ({ ...prev, primary: e.target.value }))}
                        className="font-mono"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex gap-2">
                      <div
                        className="h-10 w-10 rounded-md border"
                        style={{ backgroundColor: customColors.secondary }}
                      />
                      <Input
                        id="secondary-color"
                        type="text"
                        value={customColors.secondary}
                        onChange={(e) => setCustomColors((prev) => ({ ...prev, secondary: e.target.value }))}
                        className="font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Typography Settings */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Typography</h3>
              <p className="text-sm text-muted-foreground">Customize the font and text size</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="font-family">Font Family</Label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger id="font-family">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                </div>
                <Slider
                  id="font-size"
                  min={12}
                  max={24}
                  step={1}
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                />
              </div>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-medium mb-2">Preview</h4>
              <div
                style={{
                  fontFamily:
                    fontFamily === "inter"
                      ? "Inter, sans-serif"
                      : fontFamily === "roboto"
                        ? "Roboto, sans-serif"
                        : fontFamily === "poppins"
                          ? "Poppins, sans-serif"
                          : fontFamily === "montserrat"
                            ? "Montserrat, sans-serif"
                            : fontFamily === "opensans"
                              ? "Open Sans, sans-serif"
                              : "Inter, sans-serif",
                  fontSize: `${fontSize}px`,
                }}
              >
                <p className="mb-2">This is how your text will appear throughout the application.</p>
                <p className="text-sm">This is smaller text for captions and labels.</p>
              </div>
            </div>
          </div>

          {/* Accessibility Options */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Accessibility</h3>
              <p className="text-sm text-muted-foreground">Adjust settings to improve accessibility</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduced-motion">Reduced Motion</Label>
                  <p className="text-sm text-muted-foreground">Minimize animations throughout the interface</p>
                </div>
                <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast">High Contrast</Label>
                  <p className="text-sm text-muted-foreground">Increase contrast for better readability</p>
                </div>
                <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={handleResetTheme}>
            Reset to Default
          </Button>
          <Button onClick={handleSaveTheme}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
