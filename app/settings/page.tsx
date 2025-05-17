import type { Metadata } from "next"
import { UserSettingsPage } from "@/components/settings/user-settings-page"

export const metadata: Metadata = {
  title: "User Settings | Creavibe.pro",
  description: "Manage your account settings, data exports, and API tokens",
}

export default function SettingsPage() {
  return <UserSettingsPage />
}
