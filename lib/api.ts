import type { AuditLog } from "@/types/audit-logs"

// Mock data for audit logs
const mockAuditLogs: AuditLog[] = [
  {
    id: "log-1",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    user: {
      id: "user-1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    actionType: "Login",
    details: "User logged in successfully",
    ipAddress: "192.168.1.1",
  },
  {
    id: "log-2",
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
    user: {
      id: "user-2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    actionType: "Create",
    details: "Created new project 'Marketing Campaign Q2'",
    ipAddress: "192.168.1.2",
  },
  {
    id: "log-3",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    user: {
      id: "user-1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    actionType: "Update",
    details: "Updated user profile settings - changed notification preferences",
    ipAddress: "192.168.1.1",
  },
  {
    id: "log-4",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    user: {
      id: "user-3",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
    },
    actionType: "Delete",
    details: "Deleted draft 'Product Launch Email'",
    ipAddress: "192.168.1.3",
  },
  {
    id: "log-5",
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
    user: {
      id: "user-2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    actionType: "Share",
    details: "Shared project 'Website Redesign' with team members",
    ipAddress: "192.168.1.2",
  },
  {
    id: "log-6",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
    user: {
      id: "user-4",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
    },
    actionType: "Login",
    details: "User logged in successfully",
    ipAddress: "192.168.1.4",
  },
  {
    id: "log-7",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    user: {
      id: "user-3",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
    },
    actionType: "Publish",
    details: "Published blog post 'AI Trends 2023'",
    ipAddress: "192.168.1.3",
  },
  {
    id: "log-8",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    user: {
      id: "user-1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    actionType: "Export",
    details: "Exported analytics report for Q1 2023",
    ipAddress: "192.168.1.1",
  },
  {
    id: "log-9",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    user: {
      id: "user-5",
      name: "Michael Brown",
      email: "michael.brown@example.com",
    },
    actionType: "Create",
    details: "Created new team 'Product Development'",
    ipAddress: "192.168.1.5",
  },
  {
    id: "log-10",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    user: {
      id: "user-2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    actionType: "Update",
    details: "Updated project settings for 'Marketing Campaign Q2'",
    ipAddress: "192.168.1.2",
  },
  {
    id: "log-11",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    user: {
      id: "user-4",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
    },
    actionType: "Delete",
    details: "Deleted unused template 'Newsletter Template 3'",
    ipAddress: "192.168.1.4",
  },
  {
    id: "log-12",
    timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), // 7 hours ago
    user: {
      id: "user-3",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
    },
    actionType: "Logout",
    details: "User logged out",
    ipAddress: "192.168.1.3",
  },
  {
    id: "log-13",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    user: {
      id: "user-5",
      name: "Michael Brown",
      email: "michael.brown@example.com",
    },
    actionType: "Import",
    details: "Imported contacts from CSV file",
    ipAddress: "192.168.1.5",
  },
  {
    id: "log-14",
    timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), // 9 hours ago
    user: {
      id: "user-1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    actionType: "Share",
    details: "Shared document 'Q2 Strategy' with external collaborator",
    ipAddress: "192.168.1.1",
  },
  {
    id: "log-15",
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), // 10 hours ago
    user: {
      id: "user-2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    actionType: "Unpublish",
    details: "Unpublished page 'Upcoming Events'",
    ipAddress: "192.168.1.2",
  },
  {
    id: "log-16",
    timestamp: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(), // 11 hours ago
    user: {
      id: "user-4",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
    },
    actionType: "Login",
    details: "User logged in successfully",
    ipAddress: "192.168.1.4",
  },
  {
    id: "log-17",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    user: {
      id: "user-3",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
    },
    actionType: "Create",
    details: "Created new automation rule 'Lead Nurturing Sequence'",
    ipAddress: "192.168.1.3",
  },
  {
    id: "log-18",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    user: {
      id: "user-5",
      name: "Michael Brown",
      email: "michael.brown@example.com",
    },
    actionType: "Update",
    details: "Updated user role from 'Editor' to 'Admin'",
    ipAddress: "192.168.1.5",
  },
  {
    id: "log-19",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    user: {
      id: "user-1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    actionType: "Publish",
    details: "Published landing page 'Summer Promotion'",
    ipAddress: "192.168.1.1",
  },
  {
    id: "log-20",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    user: {
      id: "user-2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    actionType: "Export",
    details: "Exported user data for compliance report",
    ipAddress: "192.168.1.2",
  },
  {
    id: "log-21",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    user: {
      id: "user-6",
      name: "Emily Davis",
      email: "emily.davis@example.com",
    },
    actionType: "Login",
    details: "User logged in successfully",
    ipAddress: "192.168.1.6",
  },
  {
    id: "log-22",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    user: {
      id: "user-6",
      name: "Emily Davis",
      email: "emily.davis@example.com",
    },
    actionType: "Create",
    details: "Created new AI template 'Product Description Generator'",
    ipAddress: "192.168.1.6",
  },
  {
    id: "log-23",
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    user: {
      id: "user-3",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
    },
    actionType: "Delete",
    details: "Deleted user account 'test.user@example.com'",
    ipAddress: "192.168.1.3",
  },
  {
    id: "log-24",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    user: {
      id: "user-5",
      name: "Michael Brown",
      email: "michael.brown@example.com",
    },
    actionType: "Share",
    details: "Shared folder 'Brand Assets' with marketing team",
    ipAddress: "192.168.1.5",
  },
  {
    id: "log-25",
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    user: {
      id: "user-6",
      name: "Emily Davis",
      email: "emily.davis@example.com",
    },
    actionType: "Update",
    details: "Updated company profile information",
    ipAddress: "192.168.1.6",
  },
]

// Function to fetch audit logs
export async function fetchAuditLogs(): Promise<AuditLog[]> {
  // In a real application, this would be an API call
  // For demo purposes, we'll simulate an API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAuditLogs)
    }, 800)
  })
}
