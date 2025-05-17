"use client"

import { useState } from "react"
import { AlertCircle, Check, ExternalLink, Link2, Unlink } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock connected accounts data
const initialAccounts = [
  {
    id: "google",
    name: "Google",
    icon: "/icons/google.png",
    connected: true,
    email: "alex.johnson@gmail.com",
    lastUsed: "2 days ago",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "/icons/facebook.png",
    connected: false,
    email: null,
    lastUsed: null,
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: "/icons/twitter.png",
    connected: true,
    email: "alexjohnson",
    lastUsed: "1 week ago",
  },
  {
    id: "github",
    name: "GitHub",
    icon: "/icons/github.png",
    connected: false,
    email: null,
    lastUsed: null,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "/icons/linkedin.png",
    connected: false,
    email: null,
    lastUsed: null,
  },
]

export function ConnectedAccountsSettings() {
  const { toast } = useToast()
  const [accounts, setAccounts] = useState(initialAccounts)
  const [disconnectAccount, setDisconnectAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState<string | null>(null)

  const handleConnect = async (accountId: string) => {
    setIsConnecting(accountId)

    // Simulate OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Update accounts state
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === accountId
          ? {
              ...account,
              connected: true,
              email:
                account.id === "google"
                  ? "alex.johnson@gmail.com"
                  : account.id === "facebook"
                    ? "alex.johnson"
                    : account.id === "github"
                      ? "alexjohnson"
                      : account.id === "linkedin"
                        ? "alex-johnson"
                        : account.id === "twitter"
                          ? "alexjohnson"
                          : null,
              lastUsed: "Just now",
            }
          : account,
      ),
    )

    toast({
      title: "Account connected",
      description: `Your ${accounts.find((a) => a.id === accountId)?.name} account has been connected successfully.`,
    })

    setIsConnecting(null)
  }

  const confirmDisconnect = (accountId: string) => {
    setDisconnectAccount(accountId)
  }

  const handleDisconnect = async () => {
    if (!disconnectAccount) return

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update accounts state
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === disconnectAccount
          ? {
              ...account,
              connected: false,
              email: null,
              lastUsed: null,
            }
          : account,
      ),
    )

    toast({
      title: "Account disconnected",
      description: `Your ${accounts.find((a) => a.id === disconnectAccount)?.name} account has been disconnected.`,
    })

    setDisconnectAccount(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>Connect your accounts to enable single sign-on and data synchronization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Privacy Notice</AlertTitle>
            <AlertDescription>
              We only access the information needed to create and secure your account. We don't post without your
              permission.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-0">
                  <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-full">
                    {/* Placeholder for icon - in a real app, use actual SVG icons */}
                    <Link2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">{account.name}</h4>
                    {account.connected ? (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Check className="h-3 w-3 text-green-500" />
                        <span>Connected</span>
                        {account.email && <span className="text-xs">({account.email})</span>}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {account.connected ? (
                    <>
                      {account.lastUsed && (
                        <span className="text-xs text-muted-foreground mr-2">Last used: {account.lastUsed}</span>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => confirmDisconnect(account.id)}
                        className="gap-1"
                      >
                        <Unlink className="h-4 w-4" />
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleConnect(account.id)}
                      disabled={isConnecting === account.id}
                      className="gap-1"
                    >
                      {isConnecting === account.id ? (
                        "Connecting..."
                      ) : (
                        <>
                          <ExternalLink className="h-4 w-4" />
                          Connect
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <p className="text-sm text-muted-foreground">
            Connected accounts can be used for login and data synchronization. You can disconnect an account at any
            time.
          </p>
        </CardFooter>
      </Card>

      {/* Disconnect Confirmation Dialog */}
      <Dialog open={!!disconnectAccount} onOpenChange={(open) => !open && setDisconnectAccount(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disconnect Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to disconnect your {accounts.find((a) => a.id === disconnectAccount)?.name} account?
              You will no longer be able to use it for login or data synchronization.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDisconnectAccount(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDisconnect}>
              Disconnect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
