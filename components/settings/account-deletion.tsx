"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { authService } from "@/lib/auth-service"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, AlertTriangle } from "lucide-react"

export function AccountDeletion() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmation, setConfirmation] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDeleteAccount = async () => {
    if (!user) return

    setIsDeleting(true)

    try {
      // First delete user data from profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", user.id)

      if (profileError) throw profileError

      // Delete user authentication data
      const { error: authError } = await authService.deleteAccount()

      if (authError) throw authError

      // Sign out the user
      await signOut()

      // Show success message
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
      })

      // Redirect to home page
      router.push("/")
    } catch (error: any) {
      console.error("Error deleting account:", error)
      toast({
        title: "Error deleting account",
        description: error.message || "Failed to delete account. Please try again or contact support.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setIsDialogOpen(false)
    }
  }

  const isDeleteButtonDisabled = confirmation !== "DELETE MY ACCOUNT"

  return (
    <Card className="border-destructive/50">
      <CardHeader className="border-b">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <CardTitle className="text-destructive">Delete Account</CardTitle>
        </div>
        <CardDescription>
          Permanently delete your account and all of your data. This action cannot be undone.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground mb-4">
          Before you proceed, please understand that deleting your account will:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-6">
          <li>Permanently delete your profile information</li>
          <li>Remove all your projects and content</li>
          <li>Cancel any active subscriptions</li>
          <li>Delete all your data from our servers</li>
        </ul>
      </CardContent>
      <CardFooter>
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove all your data from
                our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="confirmation">
                  Type <span className="font-semibold">DELETE MY ACCOUNT</span> to confirm
                </Label>
                <Input
                  id="confirmation"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  placeholder="DELETE MY ACCOUNT"
                  className="w-full"
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setConfirmation("")}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={isDeleteButtonDisabled || isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Account"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}
