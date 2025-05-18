"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Check, Copy, Eye, EyeOff, Key, Loader2, Plus, RefreshCw, Trash2, BarChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { ApiTokenAnalytics } from "./api-token-analytics"
import type { ApiTokenWithUsage } from "@/types/api-analytics"
import { mockTokensWithUsage } from "@/lib/api-analytics-service"

// API token permissions
const tokenPermissions = [
  { id: "read_projects", label: "Read Projects", description: "View project data" },
  { id: "write_projects", label: '  label: "Read Projects', description: "View project data" },
  { id: "write_projects", label: "Write Projects", description: "Create and modify projects" },
  { id: "read_templates", label: "Read Templates", description: "View template data" },
  { id: "write_templates", label: "Write Templates", description: "Create and modify templates" },
  { id: "read_analytics", label: "Read Analytics", description: "View analytics data" },
  { id: "generate_content", label: "Generate Content", description: "Use AI to generate content" },
]

// Mock API tokens
const initialTokens = mockTokensWithUsage

export function ApiTokenSettings() {
  const { toast } = useToast()
  const [tokens, setTokens] = useState(initialTokens)
  const [isCreatingToken, setIsCreatingToken] = useState(false)
  const [newToken, setNewToken] = useState<string | null>(null)
  const [showToken, setShowToken] = useState(false)
  const [tokenName, setTokenName] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [selectedToken, setSelectedToken] = useState<ApiTokenWithUsage | null>(null)
  const [showAnalytics, setShowAnalytics] = useState(false)

  const handleCreateToken = () => {
    if (!tokenName) {
      toast({
        title: "Token name required",
        description: "Please provide a name for your API token.",
        variant: "destructive",
      })
      return
    }

    if (selectedPermissions.length === 0) {
      toast({
        title: "No permissions selected",
        description: "Please select at least one permission for your API token.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate token generation
    setTimeout(() => {
      const generatedToken = `creavibe_${Array.from({ length: 32 }, () =>
        Math.floor(Math.random() * 36).toString(36),
      ).join("")}`

      setNewToken(generatedToken)

      const newTokenObj = {
        id: `tok_${Math.floor(Math.random() * 10000000000)}`,
        name: tokenName,
        lastUsed: new Date(),
        createdAt: new Date(),
        permissions: selectedPermissions,
        usage: {
          tokenId: `tok_${Math.floor(Math.random() * 10000000000)}`,
          totalRequests: 0,
          successfulRequests: 0,
          failedRequests: 0,
          averageResponseTime: 0,
          totalDataTransferred: 0,
          requestsPerDay: [],
          topEndpoints: [],
          topIpAddresses: [],
          errorRates: [],
        },
      }

      setTokens((prev) => [newTokenObj, ...prev])
      setIsGenerating(false)
    }, 1500)
  }

  const handleCopyToken = () => {
    if (newToken) {
      navigator.clipboard.writeText(newToken)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  const handleCloseDialog = () => {
    setIsCreatingToken(false)
    setNewToken(null)
    setTokenName("")
    setSelectedPermissions([])
    setShowToken(false)
    setIsCopied(false)
  }

  const handleDeleteToken = (tokenId: string) => {
    setTokens((prev) => prev.filter((token) => token.id !== tokenId))
    toast({
      title: "Token revoked",
      description: "The API token has been successfully revoked.",
    })
  }

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId) ? prev.filter((id) => id !== permissionId) : [...prev, permissionId],
    )
  }

  const handleViewAnalytics = (token: ApiTokenWithUsage) => {
    setSelectedToken(token)
    setShowAnalytics(true)
  }

  return (
    <div className="space-y-8">
      {showAnalytics && selectedToken ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Token Analytics</h2>
            <Button variant="outline" onClick={() => setShowAnalytics(false)}>
              Back to Tokens
            </Button>
          </div>
          <ApiTokenAnalytics token={selectedToken} />
        </div>
      ) : (
        <>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>API Tokens</CardTitle>
                <CardDescription>Create and manage API tokens to access the Creavibe.pro API</CardDescription>
              </div>
              <Dialog open={isCreatingToken} onOpenChange={setIsCreatingToken}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Token
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{newToken ? "Save Your API Token" : "Create API Token"}</DialogTitle>
                    <DialogDescription>
                      {newToken
                        ? "This token will only be shown once. Make sure to copy it now."
                        : "Create a new API token to authenticate with the Creavibe.pro API."}
                    </DialogDescription>
                  </DialogHeader>

                  {newToken ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="token">API Token</Label>
                        <div className="flex">
                          <div className="relative flex-1">
                            <Input
                              id="token"
                              value={newToken}
                              readOnly
                              type={showToken ? "text" : "password"}
                              className="pr-10 font-mono text-sm"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2"
                              onClick={() => setShowToken(!showToken)}
                            >
                              {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              <span className="sr-only">{showToken ? "Hide" : "Show"} token</span>
                            </Button>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="ml-2"
                            onClick={handleCopyToken}
                          >
                            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            <span className="sr-only">Copy token</span>
                          </Button>
                        </div>
                      </div>
                      <Alert variant="warning">
                        <AlertTitle>Important</AlertTitle>
                        <AlertDescription>
                          This token will not be shown again. Please store it securely.
                        </AlertDescription>
                      </Alert>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Token Name</Label>
                        <Input
                          id="name"
                          placeholder="e.g., Dashboard Integration"
                          value={tokenName}
                          onChange={(e) => setTokenName(e.target.value)}
                        />
                      </div>

                      <div className="space-y-4">
                        <Label>Permissions</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {tokenPermissions.map((permission) => (
                            <div
                              key={permission.id}
                              className="flex items-start space-x-3 border rounded-md p-3 hover:bg-accent transition-colors"
                            >
                              <Checkbox
                                id={`permission-${permission.id}`}
                                checked={selectedPermissions.includes(permission.id)}
                                onCheckedChange={() => handlePermissionToggle(permission.id)}
                              />
                              <div className="space-y-1">
                                <Label htmlFor={`permission-${permission.id}`} className="cursor-pointer font-medium">
                                  {permission.label}
                                </Label>
                                <p className="text-xs text-muted-foreground">{permission.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <DialogFooter className="sm:justify-between">
                    {newToken ? (
                      <Button variant="outline" onClick={handleCloseDialog}>
                        Done
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" onClick={() => setIsCreatingToken(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateToken} disabled={isGenerating}>
                          {isGenerating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Key className="mr-2 h-4 w-4" />
                              Generate Token
                            </>
                          )}
                        </Button>
                      </>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {tokens.length > 0 ? (
                <div className="space-y-4">
                  {tokens.map((token) => (
                    <div
                      key={token.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between border rounded-md p-4 hover:bg-accent/50 transition-colors gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{token.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {token.permissions.length} {token.permissions.length === 1 ? "permission" : "permissions"}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {token.permissions.map((permission) => {
                            const permissionData = tokenPermissions.find((p) => p.id === permission)
                            return (
                              <Badge key={permission} variant="secondary" className="text-xs">
                                {permissionData?.label || permission}
                              </Badge>
                            )
                          })}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Created {format(token.createdAt, "PPP")} • Last used {format(token.lastUsed, "PPP")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <Button variant="outline" size="sm" onClick={() => handleViewAnalytics(token)}>
                          <BarChart className="h-3.5 w-3.5 mr-1" />
                          Analytics
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-3.5 w-3.5 mr-1" />
                          Refresh
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteToken(token.id)}>
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          Revoke
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-md">
                  <Key className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <h3 className="font-medium text-lg mb-1">No API Tokens</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first API token to get started with the Creavibe.pro API.
                  </p>
                  <Button onClick={() => setIsCreatingToken(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Token
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                API tokens are used to authenticate with the Creavibe.pro API. Keep your tokens secure.
              </p>
            </CardFooter>
          </Card>

          {/* API Documentation */}
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>
                Learn how to use the Creavibe.pro API to integrate with your applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  To authenticate with the Creavibe.pro API, include your API token in the Authorization header:
                </p>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
                  <code>Authorization: Bearer YOUR_API_TOKEN</code>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Base URL</h3>
                <p className="text-sm text-muted-foreground">All API requests should be made to:</p>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
                  <code>https://api.creavibe.pro/v1</code>
                </div>
              </div>

              <Button variant="outline" className="mt-2">
                View Full API Documentation
              </Button>
            </CardContent>
          </Card>

          {/* Rate Limits Info */}
          <Alert>
            <AlertTitle>API Rate Limits</AlertTitle>
            <AlertDescription>
              Free accounts are limited to 100 requests per minute. Upgrade to a premium plan for higher rate limits.
            </AlertDescription>
          </Alert>
        </>
      )}
    </div>
  )
}
