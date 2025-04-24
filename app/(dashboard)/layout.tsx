"use client"

import type React from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { LogOut, BookOpen, Calendar, Users, Home } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const router = useRouter()

  // If no user is logged in, redirect to login page
  useEffect(() => {
    if (!user) {
      console.log("No user found, redirecting to login")
      router.push("/")
    }
  }, [user, router])

  // Show loading state while checking authentication
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-[#e6f7f5] to-[#f5e6f7]">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-lg font-medium text-gray-700">Checking authentication...</p>
          <Button variant="link" onClick={() => router.push("/")} className="mt-4 text-primary">
            <Home className="mr-2 h-4 w-4" />
            Return to Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-[#f8f9fa]">
        <Sidebar variant="inset" className="border-r">
          <SidebarHeader className="border-b p-4 bg-gradient-primary">
            <div className="flex flex-col space-y-1">
              <h2 className="font-semibold text-lg text-white">{user?.name || "User"}</h2>
              <p className="text-sm text-white/80">{user?.role || "Role"}</p>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {user?.role === "Faculty" ? (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/faculty-dashboard"}>
                      <Link href="/faculty-dashboard">
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>My Subjects</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/faculty-dashboard/free-faculty"}>
                      <Link href="/faculty-dashboard/free-faculty">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Check Free Faculty</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/faculty-dashboard/my-free-periods"}>
                      <Link href="/faculty-dashboard/my-free-periods">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>My Free Periods</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/hod-dashboard"}>
                    <Link href="/hod-dashboard">
                      <Users className="mr-2 h-4 w-4" />
                      <span>Faculty Availability</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <Button
              variant="outline"
              className="w-full hover:bg-destructive/10 hover:text-destructive"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex-1 overflow-auto">
          <header className="flex h-16 items-center px-6 border-b bg-white shadow-sm">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Faculty Substitution System
            </h1>
          </header>
          <main className="p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
