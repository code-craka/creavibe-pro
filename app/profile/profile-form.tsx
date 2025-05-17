"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2 } from "lucide-react"

const profileSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }).optional(),
  full_name: z.string().min(2, { message: "Full name must be at least 2 characters" }).optional(),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  bio: z.string().max(160, { message: "Bio must not exceed 160 characters" }).optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      full_name: "",
      website: "",
      bio: "",
    },
  })

  useEffect(() => {
    async function getProfile() {
      if (!user) return

      try {
        setIsLoading(true)
        const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        if (error) {
          throw error
        }

        if (data) {
          form.reset({
            username: data.username || "",
            full_name: data.full_name || "",
            website: data.website || "",
            bio: data.bio || "",
          })
          setAvatarUrl(data.avatar_url)
        }
      } catch (error) {
        console.error("Error loading profile:", error)
        toast({
          title: "Error loading profile",
          description: "Failed to load profile data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    getProfile()
  }, [user, form, toast])

  async function onSubmit(data: ProfileFormValues) {
    if (!user) return

    try {
      setIsLoading(true)
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        username: data.username,
        full_name: data.full_name,
        website: data.website,
        bio: data.bio,
        updated_at: new Date().toISOString(),
      })

      if (error) {
        throw error
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error updating profile",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.")
      }

      const file = event.target.files[0]
      const fileExt = file.name.split(".").pop()
      const filePath = `${user?.id}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath)

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        avatar_url: data.publicUrl,
        updated_at: new Date().toISOString(),
      })

      if (error) {
        throw error
      }

      setAvatarUrl(data.publicUrl)
      toast({
        title: "Avatar updated",
        description: "Your avatar has been updated successfully.",
      })
    } catch (error) {
      console.error("Error uploading avatar:", error)
      toast({
        title: "Error uploading avatar",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">Profile Picture</h3>
        <p className="text-sm text-muted-foreground">
          This is your public profile picture. It will be shown on your profile and in your posts.
        </p>
        <div className="mt-4 flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatarUrl || ""} alt={form.getValues().username || "User"} />
            <AvatarFallback>
              {form.getValues().username?.substring(0, 2).toUpperCase() ||
                user?.email?.substring(0, 2).toUpperCase() ||
                "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <label htmlFor="avatar" className="cursor-pointer">
              <div className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                {uploading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Uploading...</span>
                  </div>
                ) : (
                  "Change Avatar"
                )}
              </div>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
                className="sr-only"
              />
            </label>
          </div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name. It can be your real name or a pseudonym.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription>
                  This is your full name. It will be used for billing and official communications.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormDescription>Your personal or company website.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
                </FormControl>
                <FormDescription>Brief description for your profile. Max 160 characters.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
