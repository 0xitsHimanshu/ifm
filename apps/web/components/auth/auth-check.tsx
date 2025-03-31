"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export function AuthCheck() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const isAuthPage = pathname === "/"
    const isDashboardPage = pathname.startsWith("/dashboard")

    if (isDashboardPage && !token) {
      router.push("/")
    }

    if (isAuthPage && token) {
      router.push("/dashboard")
    }
  }, [pathname, router])

  return null
} 