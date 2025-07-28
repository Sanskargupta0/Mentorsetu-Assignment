"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import {
  Calendar,
  Clock,
  User,
  BookOpen,
  Star,
  MessageCircle,
  Video,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { toast } from "sonner"

interface Booking {
  id: string
  mentorId: string
  mentorName: string
  studentName: string
  email: string
  date: Date
  time: string
  reason: string
  sessionType: string
  status: "confirmed" | "completed" | "cancelled"
  amount: number
  createdAt: string
}

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [activeTab, setActiveTab] = useState("upcoming")

  useEffect(() => {
    // Load bookings from localStorage (mock database)
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    const parsedBookings = storedBookings.map((booking: any) => ({
      ...booking,
      date: new Date(booking.date),
    }))
    setBookings(parsedBookings)
  }, [])

  const handleCancelBooking = async (bookingId: string) => {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update booking status
      const updatedBookings = bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: "cancelled" as const } : booking,
      )

      setBookings(updatedBookings)
      localStorage.setItem("bookings", JSON.stringify(updatedBookings))

      toast.success("Session cancelled successfully")
    } catch (error) {
      toast.error("Failed to cancel session. Please try again.")
    }
  }

  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "confirmed" && new Date(booking.date) >= new Date(),
  )

  const pastBookings = bookings.filter(
    (booking) => booking.status === "completed" || new Date(booking.date) < new Date(),
  )

  const cancelledBookings = bookings.filter((booking) => booking.status === "cancelled")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">MentorSetu.ai</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/mentors" className="text-muted-foreground hover:text-foreground">
              Find Mentors
            </Link>
            <Link href="/dashboard" className="text-blue-600 font-medium">
              Dashboard
            </Link>
            <Button variant="outline">Become a Mentor</Button>
            <ThemeToggle />
          </nav>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Manage your mentorship sessions and track your progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">{upcomingBookings.length}</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{pastBookings.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Mentors</p>
                  <p className="text-2xl font-bold text-gray-900">{new Set(bookings.map((b) => b.mentorId)).size}</p>
                </div>
                <User className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions Tabs */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>My Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
                <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled ({cancelledBookings.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-6">
                {upcomingBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming sessions</h3>
                    <p className="text-gray-600 mb-4">Book a session with a mentor to get started</p>
                    <Button asChild>
                      <Link href="/mentors">Find a Mentor</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <Card key={booking.id} className="border border-gray-200">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{booking.mentorName}</h3>
                                <Badge className={getStatusColor(booking.status)}>
                                  {getStatusIcon(booking.status)}
                                  <span className="ml-1 capitalize">{booking.status}</span>
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>{formatDate(booking.date)}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span>{booking.time}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <span className="font-medium">₹{booking.amount.toLocaleString()}</span>
                                </div>
                              </div>

                              <p className="text-gray-700 mb-4">{booking.reason}</p>

                              {booking.sessionType && (
                                <Badge variant="outline" className="mb-4">
                                  {booking.sessionType}
                                </Badge>
                              )}
                            </div>

                            <div className="flex flex-col space-y-2 ml-4">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <Video className="h-4 w-4 mr-2" />
                                Join Session
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Message
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleCancelBooking(booking.id)}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past" className="mt-6">
                {pastBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No past sessions</h3>
                    <p className="text-gray-600">Your completed sessions will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pastBookings.map((booking) => (
                      <Card key={booking.id} className="border border-gray-200">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{booking.mentorName}</h3>
                                <Badge className={getStatusColor("completed")}>
                                  {getStatusIcon("completed")}
                                  <span className="ml-1">Completed</span>
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>{formatDate(booking.date)}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span>{booking.time}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <span className="font-medium">₹{booking.amount.toLocaleString()}</span>
                                </div>
                              </div>

                              <p className="text-gray-700 mb-4">{booking.reason}</p>

                              {booking.sessionType && (
                                <Badge variant="outline" className="mb-4">
                                  {booking.sessionType}
                                </Badge>
                              )}
                            </div>

                            <div className="flex flex-col space-y-2 ml-4">
                              <Button size="sm" variant="outline">
                                <Star className="h-4 w-4 mr-2" />
                                Rate Session
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="cancelled" className="mt-6">
                {cancelledBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No cancelled sessions</h3>
                    <p className="text-gray-600">Your cancelled sessions will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cancelledBookings.map((booking) => (
                      <Card key={booking.id} className="border border-gray-200 opacity-75">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{booking.mentorName}</h3>
                                <Badge className={getStatusColor("cancelled")}>
                                  {getStatusIcon("cancelled")}
                                  <span className="ml-1">Cancelled</span>
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>{formatDate(booking.date)}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span>{booking.time}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <span className="font-medium">₹{booking.amount.toLocaleString()}</span>
                                </div>
                              </div>

                              <p className="text-gray-700 mb-4">{booking.reason}</p>

                              {booking.sessionType && (
                                <Badge variant="outline" className="mb-4">
                                  {booking.sessionType}
                                </Badge>
                              )}
                            </div>

                            <div className="flex flex-col space-y-2 ml-4">
                              <Button size="sm" variant="outline">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
