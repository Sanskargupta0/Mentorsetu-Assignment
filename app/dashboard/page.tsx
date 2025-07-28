"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveHeader } from "@/components/responsive-header"
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
        return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
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
      <ResponsiveHeader currentPage="dashboard" />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">My Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Manage your mentorship sessions and track your progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Sessions</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{bookings.length}</p>
                </div>
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Upcoming</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{upcomingBookings.length}</p>
                </div>
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{pastBookings.length}</p>
                </div>
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Mentors</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{new Set(bookings.map((b) => b.mentorId)).size}</p>
                </div>
                <User className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions Tabs */}
        <Card className="border-0 shadow-md">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">My Sessions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 h-auto">
                <TabsTrigger value="upcoming" className="text-xs sm:text-sm px-2 py-2">
                  <span className="hidden sm:inline">Upcoming</span>
                  <span className="sm:hidden">Up</span>
                  <span className="ml-1">({upcomingBookings.length})</span>
                </TabsTrigger>
                <TabsTrigger value="past" className="text-xs sm:text-sm px-2 py-2">
                  <span className="hidden sm:inline">Past</span>
                  <span className="sm:hidden">Past</span>
                  <span className="ml-1">({pastBookings.length})</span>
                </TabsTrigger>
                <TabsTrigger value="cancelled" className="text-xs sm:text-sm px-2 py-2">
                  <span className="hidden sm:inline">Cancelled</span>
                  <span className="sm:hidden">Cancel</span>
                  <span className="ml-1">({cancelledBookings.length})</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-4 sm:mt-6">
                {upcomingBookings.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <Calendar className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">No upcoming sessions</h3>
                    <p className="text-muted-foreground text-sm sm:text-base mb-4">Book a session with a mentor to get started</p>
                    <Button asChild className="w-full sm:w-auto">
                      <Link href="/mentors">Find a Mentor</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <Card key={booking.id} className="border">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                                <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">{booking.mentorName}</h3>
                                <Badge className={getStatusColor(booking.status)}>
                                  {getStatusIcon(booking.status)}
                                  <span className="ml-1 capitalize">{booking.status}</span>
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
                                <div className="flex items-center text-muted-foreground text-sm">
                                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span className="truncate">{formatDate(booking.date)}</span>
                                </div>
                                <div className="flex items-center text-muted-foreground text-sm">
                                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span>{booking.time}</span>
                                </div>
                                <div className="flex items-center text-muted-foreground text-sm">
                                  <span className="font-medium">₹{booking.amount.toLocaleString()}</span>
                                </div>
                              </div>

                              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{booking.reason}</p>

                              {booking.sessionType && (
                                <Badge variant="outline" className="mb-4">
                                  {booking.sessionType}
                                </Badge>
                              )}
                            </div>

                            <div className="flex flex-row lg:flex-col gap-2 lg:ml-4">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 flex-1 lg:flex-none">
                                <Video className="h-4 w-4 mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Join Session</span>
                                <span className="sm:hidden">Join</span>
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 lg:flex-none">
                                <MessageCircle className="h-4 w-4 mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Message</span>
                                <span className="sm:hidden">Msg</span>
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleCancelBooking(booking.id)} className="flex-1 lg:flex-none">
                                <span className="hidden sm:inline">Cancel</span>
                                <span className="sm:hidden">Cancel</span>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past" className="mt-4 sm:mt-6">
                {pastBookings.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">No past sessions</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">Your completed sessions will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pastBookings.map((booking) => (
                      <Card key={booking.id} className="border">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                                <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">{booking.mentorName}</h3>
                                <Badge className={getStatusColor("completed")}>
                                  {getStatusIcon("completed")}
                                  <span className="ml-1">Completed</span>
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
                                <div className="flex items-center text-muted-foreground text-sm">
                                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span className="truncate">{formatDate(booking.date)}</span>
                                </div>
                                <div className="flex items-center text-muted-foreground text-sm">
                                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span>{booking.time}</span>
                                </div>
                                <div className="flex items-center text-muted-foreground text-sm">
                                  <span className="font-medium">₹{booking.amount.toLocaleString()}</span>
                                </div>
                              </div>

                              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{booking.reason}</p>

                              {booking.sessionType && (
                                <Badge variant="outline" className="mb-4">
                                  {booking.sessionType}
                                </Badge>
                              )}
                            </div>

                            <div className="flex flex-row lg:flex-col gap-2 lg:ml-4">
                              <Button size="sm" variant="outline" className="flex-1 lg:flex-none">
                                <Star className="h-4 w-4 mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Rate Session</span>
                                <span className="sm:hidden">Rate</span>
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 lg:flex-none">
                                <MessageCircle className="h-4 w-4 mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Message</span>
                                <span className="sm:hidden">Msg</span>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="cancelled" className="mt-4 sm:mt-6">
                {cancelledBookings.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <XCircle className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">No cancelled sessions</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">Your cancelled sessions will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cancelledBookings.map((booking) => (
                      <Card key={booking.id} className="border opacity-75">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                                <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">{booking.mentorName}</h3>
                                <Badge className={getStatusColor("cancelled")}>
                                  {getStatusIcon("cancelled")}
                                  <span className="ml-1">Cancelled</span>
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
                                <div className="flex items-center text-muted-foreground text-sm">
                                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span className="truncate">{formatDate(booking.date)}</span>
                                </div>
                                <div className="flex items-center text-muted-foreground text-sm">
                                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span>{booking.time}</span>
                                </div>
                                <div className="flex items-center text-muted-foreground text-sm">
                                  <span className="font-medium">₹{booking.amount.toLocaleString()}</span>
                                </div>
                              </div>

                              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{booking.reason}</p>

                              {booking.sessionType && (
                                <Badge variant="outline" className="mb-4">
                                  {booking.sessionType}
                                </Badge>
                              )}
                            </div>

                            <div className="flex flex-row lg:flex-col gap-2 lg:ml-4">
                              <Button size="sm" variant="outline" className="flex-1 lg:flex-none">
                                <MessageCircle className="h-4 w-4 mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Message</span>
                                <span className="sm:hidden">Msg</span>
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
