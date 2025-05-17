"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Camera, Pencil, Trash2, LogOut, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { DeleteAccountDialog } from "@/components/settings/delete-account-dialog"

// Mock user data - in a real app, this would come from your auth context or API
const user = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  role: "Admin",
  bio: "Product designer and AI enthusiast. I love creating content that inspires and engages audiences.",
  avatarUrl: "/abstract-profile.png",
  initials: "AJ",
}

export function ProfileSettings() {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
  })
  const [previewImage, setPreviewImage] = useState<string | null>(user.avatarUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogout = () => {
    // In a real app, this would call your auth service logout method
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    })

    // Redirect to login page
    setTimeout(() => {
      router.push("/login")
    }, 1500)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, GIF).",
        variant: "destructive",
      })
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      })
      return
    }

    // Create a preview URL
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setPreviewImage(event.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveAvatar = () => {
    setPreviewImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSaveAvatar = async () => {
    setIsUploading(true)

    // Simulate API call to upload avatar
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Profile picture updated",
      description: "Your profile picture has been updated successfully.",
    })

    setIsUploading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveProfile = async () => {
    setIsEditing(false)

    // Simulate API call to save profile data
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal information and profile picture</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture Upload */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative group">
              <Avatar className="h-24 w-24 border-2 border-border">
                {previewImage ? (
                  <AvatarImage
                    src={previewImage || "/placeholder.svg"}
                    alt={profileData.name}
                    className="object-cover"
                  />
                ) : (
                  <AvatarFallback className="text-2xl bg-muted">
                    <User className="h-12 w-12 text-muted-foreground" />
                  </AvatarFallback>
                )}
              </Avatar>
              <button
                type="button"
                onClick={handleUploadClick}
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1.5 shadow-sm"
                aria-label="Change profile picture"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload profile picture"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Profile Picture</h3>
              <p className="text-sm text-muted-foreground">
                Upload a profile picture to personalize your account. JPG, PNG or GIF, max 5MB.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Button size="sm" variant="outline" onClick={handleUploadClick}>
                  Upload New
                </Button>
                {previewImage && (
                  <>
                    <Button size="sm" variant="outline" onClick={handleRemoveAvatar}>
                      Remove
                    </Button>
                    <Button size="sm" onClick={handleSaveAvatar} disabled={isUploading}>
                      {isUploading ? "Saving..." : "Save Changes"}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Profile Information Form */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1"
              >
                <Pencil className="h-4 w-4" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      placeholder="Your email address"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself"
                    rows={4}
                  />
                </div>
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                    <p>{profileData.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                    <p>{profileData.email}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Bio</p>
                  <p className="text-sm">{profileData.bio}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-muted-foreground">Role:</p>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
                    {user.role}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6 flex justify-between">
          <p className="text-sm text-muted-foreground">Member since January 2023</p>
          <Button variant="destructive" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center text-destructive">
            <Trash2 className="h-5 w-5 mr-2" />
            <CardTitle>Delete Account</CardTitle>
          </div>
          <CardDescription>
            Permanently delete your account and all of your content. This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
            Delete Account
          </Button>
        </CardFooter>
      </Card>

      <DeleteAccountDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} />
    </div>
  )
}
