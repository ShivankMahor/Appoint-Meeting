"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

type Role = "ADMIN" | "USER" | "GUEST" | null

interface AuthContextType {
  role: Role
  setRole: (role: Role) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in
    const storedRole = localStorage.getItem("userRole") as Role
    setRole(storedRole)
    setIsLoading(false)

    // Redirect if not logged in and not on login page
    if (!storedRole && pathname !== "/sign-in") {
      router.push("/sign-in")
    }
  }, [pathname, router])

  const logout = () => {
    localStorage.removeItem("userRole")
    setRole(null)
    router.push("/sign-in")
  }

  return <AuthContext.Provider value={{ role, setRole, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

