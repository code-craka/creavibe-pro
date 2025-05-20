import type { Metadata } from "next"
import { UserSettingsPage } from "@/components/settings/user-settings-page"
import { ProtectedRoute } from "@/components/auth/protected-route"

export const metadata: Metadata = {
  title: "User Settings | CreaVibe",
  description: "Manage your account settings, data exports, and API tokens",
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <UserSettingsPage />
    </ProtectedRoute>
  )
}
