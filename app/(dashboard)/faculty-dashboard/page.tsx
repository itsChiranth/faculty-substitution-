"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

type Subject = {
  id: number
  code: string
  name: string
  section: string
  dayOrder: number
  slot: string
}

export default function FacultyDashboard() {
  const { user } = useAuth()
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Simulate API call
    const fetchSubjects = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // In a real app, this would fetch data from an API
        // For now, we'll just set an empty array
        setSubjects([])
      } catch (err) {
        setError("Failed to load subjects. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchSubjects()
    }
  }, [user])

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-lg text-white shadow-md">
        <h2 className="text-2xl font-bold tracking-tight">Welcome, {user?.name}</h2>
        <p className="text-white/80">Faculty ID: {user?.id}</p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Subjects You Handle</h3>
          <Button size="sm" className="bg-secondary hover:bg-secondary/90">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Subject
          </Button>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden border-none shadow-md">
                <CardHeader className="p-4 bg-gray-50">
                  <Skeleton className="h-6 w-24" />
                </CardHeader>
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {error && (
          <Card className="p-4 border-destructive/50 bg-destructive/5">
            <p className="text-destructive">{error}</p>
          </Card>
        )}

        {!loading && !error && subjects.length === 0 && (
          <Card className="p-8 text-center border-none shadow-md bg-white">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-secondary/10 p-3 mb-4">
                <PlusCircle className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-lg font-medium mb-2">No subjects assigned yet</h3>
              <p className="text-gray-500 mb-4">
                You don't have any subjects assigned to you yet. Subjects will appear here once they are assigned.
              </p>
              <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                Request Subject Assignment
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
