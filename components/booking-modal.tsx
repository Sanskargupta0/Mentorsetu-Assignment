"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Clock, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface Mentor {
  id: string
  name: string
  price: number
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  mentor: Mentor
}

export function BookingModal({ isOpen, onClose, mentor }: BookingModalProps) {
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    date: undefined as Date | undefined,
    time: "",
    reason: "",
    sessionType: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
  ]

  const sessionTypes = [
    "Career Guidance",
    "Technical Interview Prep",
    "Code Review",
    "System Design",
    "General Mentorship",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.studentName || !formData.email || !formData.date || !formData.time || !formData.reason) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate payment flow
      setShowPayment(true)

      // Mock payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock booking creation
      const bookingData = {
        id: Math.random().toString(36).substr(2, 9),
        mentorId: mentor.id,
        mentorName: mentor.name,
        studentName: formData.studentName,
        email: formData.email,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        sessionType: formData.sessionType,
        status: "confirmed",
        amount: mentor.price,
        createdAt: new Date().toISOString(),
      }

      // Store in localStorage (mock database)
      const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
      existingBookings.push(bookingData)
      localStorage.setItem("bookings", JSON.stringify(existingBookings))

      toast.success("Session booked successfully! Check your email for confirmation.")

      // Reset form
      setFormData({
        studentName: "",
        email: "",
        date: undefined,
        time: "",
        reason: "",
        sessionType: "",
      })

      onClose()
    } catch (error) {
      toast.error("Failed to book session. Please try again.")
    } finally {
      setIsSubmitting(false)
      setShowPayment(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book a Session with {mentor.name}</DialogTitle>
        </DialogHeader>

        {showPayment ? (
          <div className="text-center py-8">
            <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Processing Payment...</h3>
            <p className="text-gray-600 mb-4">
              Please wait while we process your payment of ₹{mentor.price.toLocaleString()}
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentName">Full Name *</Label>
                <Input
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Select Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => setFormData({ ...formData, date })}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="time">Select Time *</Label>
                <Select value={formData.time} onValueChange={(time) => setFormData({ ...formData, time })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {slot}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="sessionType">Session Type</Label>
              <Select
                value={formData.sessionType}
                onValueChange={(sessionType) => setFormData({ ...formData, sessionType })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select session type" />
                </SelectTrigger>
                <SelectContent>
                  {sessionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="reason">What would you like to discuss? *</Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Briefly describe what you'd like to discuss in this session..."
                rows={3}
                required
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Session Duration:</span>
                <span>60 minutes</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Session Fee:</span>
                <span>₹{mentor.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                <span>Total Amount:</span>
                <span>₹{mentor.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Processing..." : "Book & Pay"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
