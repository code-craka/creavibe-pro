"use client"

import { motion } from "framer-motion"

interface NotificationBadgeProps {
  count: number
}

export function NotificationBadge({ count }: NotificationBadgeProps) {
  return (
    <motion.div
      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      aria-hidden="true"
    >
      {count > 9 ? "9+" : count}
    </motion.div>
  )
}
