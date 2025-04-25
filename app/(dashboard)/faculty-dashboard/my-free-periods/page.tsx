"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/contexts/auth-context"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

type FreePeriod = {
  dayOrder: number
  slots: string[]
}

export default function MyFreePeriods() {
  const { user } = useAuth()
  const [freePeriods, setFreePeriods] = useState<FreePeriod[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchFreePeriods = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // In a real app, this would fetch data from an API
        // For now, we'll just set an empty array
        setFreePeriods([])
      } catch (err) {
        setError("Failed to load free periods. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchFreePeriods()
    }
  }, [user])

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-lg text-white shadow-md">
        <h2 className="text-2xl font-bold tracking-tight">My Free Periods</h2>
        <p className="text-white/80">View and manage your available time slots</p>
      </div>

      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      )}

      {error && (
        <Card className="p-4 border-destructive/50 bg-destructive/5">
          <p className="text-destructive">{error}</p>
        </Card>
      )}

      {!loading && !error && freePeriods.length === 0 && (
        <Card className="p-8 text-center border-none shadow-md bg-white">
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-secondary/10 p-3 mb-4">
              <Calendar className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No free periods data available</h3>
            <p className="text-gray-500 mb-4">
              Your free periods information has not been set up yet. Please update your schedule.
            </p>
            <Button className="bg-secondary hover:bg-secondary/90">Update Schedule</Button>
          </div>
        </Card>
      )}
    </div>
  )
}
