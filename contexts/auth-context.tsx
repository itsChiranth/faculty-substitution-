"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  role: "Faculty" | "HOD"
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (err) {
      console.error("Error loading stored user:", err)
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Validate credentials (in a real app, this would be a server-side check)
      if (!email || !password || password !== "password") {
        throw new Error("Invalid credentials")
      }

      // In a real app, this would come from the server
      const isHOD = email.includes("hod") || email.includes("head")

      const userData: User = {
        id: isHOD ? "H12345" : "F12345",
        name: email.split("@")[0],
        email: email.toLowerCase(),
        role: isHOD ? "HOD" : "Faculty",
      }

      // Store user data
      setUser(userData)
      try {
        localStorage.setItem("user", JSON.stringify(userData))
      } catch (err) {
        console.error("Error storing user data:", err)
      }

      // Redirect based on role
      if (userData.role === "HOD") {
        router.push("/hod-dashboard")
      } else {
        router.push("/faculty-dashboard")
      }

      return Promise.resolve()
    } catch (error) {
      console.error("Login error details:", error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unknown error occurred")
      }
      return Promise.reject(error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem("user")
    } catch (err) {
      console.error("Error removing user data:", err)
    }
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
