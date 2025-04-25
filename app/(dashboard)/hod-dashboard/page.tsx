"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/contexts/auth-context"
import { Search } from "lucide-react"

type FacultyStatus = {
  id: string
  name: string
  status: "FREE" | "BUSY"
  subject: string | null
  section: string | null
}

export default function HodDashboard() {
  const { user } = useAuth()
  const [dayOrder, setDayOrder] = useState("")
  const [slot, setSlot] = useState("")
  const [batch, setBatch] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<FacultyStatus[] | null>(null)
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)

  const handleSearch = async () => {
    if (!dayOrder || !slot || !batch) return

    setLoading(true)
    setError("")
    setSearched(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, this would fetch data from an API
      // For now, we'll just set an empty array
      setResults([])
    } catch (err) {
      setError("Failed to load faculty data. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-lg text-white shadow-md">
        <h2 className="text-2xl font-bold tracking-tight">Faculty Availability</h2>
        <p className="text-white/80">Manage faculty substitutions and view availability</p>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader className="bg-gray-50 rounded-t-lg">
          <CardTitle className="text-lg">Search Parameters</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dayOrder">Day Order</Label>
              <Select value={dayOrder} onValueChange={setDayOrder}>
                <SelectTrigger id="dayOrder" className="border-gray-300 focus:ring-primary">
                  <SelectValue placeholder="Select Day Order" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((day) => (
                    <SelectItem key={day} value={day.toString()}>
                      Day {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slot">Slot</Label>
              <Select value={slot} onValueChange={setSlot}>
                <SelectTrigger id="slot" className="border-gray-300 focus:ring-primary">
                  <SelectValue placeholder="Select Slot" />
                </SelectTrigger>
                <SelectContent>
                  {["A", "B", "C", "D", "E", "F", "G", "P1", "P2", "P3", "P4", "P5"].map((s) => (
                    <SelectItem key={s} value={s}>
                      Slot {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="batch">Batch</Label>
              <Select value={batch} onValueChange={setBatch}>
                <SelectTrigger id="batch" className="border-gray-300 focus:ring-primary">
                  <SelectValue placeholder="Select Batch" />
                </SelectTrigger>
                <SelectContent>
                  {["CSE-A", "CSE-B", "CSE-C", "CSE-D"].map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                disabled={!dayOrder || !slot || !batch || loading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading && (
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="p-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {!loading && !error && searched && results && results.length === 0 && (
        <Card className="border-none shadow-md">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-secondary/10 p-3 mb-4">
                <Search className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-lg font-medium mb-2">No faculty data available</h3>
              <p className="text-gray-500 mb-4">
                No faculty data is available for the selected criteria. Try different search parameters.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {!searched && !loading && (
        <Card className="border-none shadow-md bg-white">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Search for faculty availability</h3>
              <p className="text-gray-500 mb-4">
                Select a day order, slot, and batch above to check faculty availability.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
