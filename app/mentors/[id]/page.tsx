"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ResponsiveHeader } from "@/components/responsive-header"
import Link from "next/link"
import { Star, MapPin, Calendar, Clock, BookOpen, ArrowLeft, MessageCircle, Users, CheckCircle } from "lucide-react"
import { BookingModal } from "@/components/booking-modal"

interface Mentor {
  id: string
  name: string
  title: string
  company: string
  expertise: string[]
  bio: string
  rating: number
  reviewCount: number
  price: number
  location: string
  experience: string
  avatar: string
  category: string
  fullBio: string
  achievements: string[]
  languages: string[]
  sessionTypes: string[]
  availability: string
}

interface Review {
  id: string
  studentName: string
  rating: number
  comment: string
  date: string
  avatar: string
}

export default function MentorProfilePage({ params }: { params: { id: string } }) {
  const [mentor, setMentor] = useState<Mentor | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  // Mock data
  const mockMentors: Record<string, Mentor> = {
    "1": {
      id: "1",
      name: "Sarah Johnson",
      title: "Senior Software Engineer",
      company: "Google",
      expertise: ["React", "Node.js", "System Design", "Career Growth", "JavaScript", "TypeScript"],
      bio: "10+ years of experience in full-stack development. Helped 100+ engineers advance their careers.",
      rating: 4.9,
      reviewCount: 127,
      price: 2500,
      location: "San Francisco, CA",
      experience: "10+ years",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      category: "Technology",
      fullBio:
        "I'm a Senior Software Engineer at Google with over 10 years of experience in full-stack development. I've worked on large-scale systems serving millions of users and have led multiple engineering teams. My passion lies in helping aspiring developers and engineers navigate their career paths and develop the technical skills needed to succeed in the tech industry. I've mentored over 100 engineers, helping them land jobs at top tech companies and advance in their careers.",
      achievements: [
        "Led development of Google's core search infrastructure",
        "Mentored 100+ engineers to career success",
        "Speaker at 15+ tech conferences",
        "Published 20+ technical articles",
      ],
      languages: ["English", "Spanish"],
      sessionTypes: ["Career Guidance", "Technical Interview Prep", "Code Review", "System Design"],
      availability: "Weekdays 6-9 PM PST, Weekends 10 AM - 4 PM PST",
    },
    "2": {
      id: "2",
      name: "Michael Chen",
      title: "Product Manager",
      company: "Meta",
      expertise: ["Product Strategy", "User Research", "Analytics", "Leadership"],
      bio: "Led product teams at top tech companies. Expert in product strategy and user-centered design.",
      rating: 4.8,
      reviewCount: 89,
      price: 3000,
      location: "Seattle, WA",
      experience: "8+ years",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      category: "Product",
      fullBio:
        "As a Product Manager at Meta, I've led cross-functional teams to build products used by millions of users worldwide. My expertise spans the entire product lifecycle from ideation to launch and optimization. I'm passionate about data-driven decision making and user-centered design principles.",
      achievements: [
        "Launched 5+ successful products at Meta",
        "Increased user engagement by 40% across key metrics",
        "Led teams of 15+ engineers and designers",
        "Expert in product analytics and growth strategies",
      ],
      languages: ["English", "Mandarin"],
      sessionTypes: ["Product Strategy", "Career Transition", "Leadership Development", "Analytics"],
      availability: "Weekdays 7-10 PM PST, Weekends 9 AM - 12 PM PST",
    },
    "3": {
      id: "3",
      name: "Emily Rodriguez",
      title: "UX Design Director",
      company: "Adobe",
      expertise: ["UI/UX Design", "Design Systems", "User Research", "Prototyping"],
      bio: "Award-winning designer with expertise in creating user-centered digital experiences.",
      rating: 4.9,
      reviewCount: 156,
      price: 2800,
      location: "Austin, TX",
      experience: "12+ years",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      category: "Design",
      fullBio:
        "I'm a UX Design Director at Adobe with over 12 years of experience creating exceptional digital experiences. I've led design teams for major product launches and have a track record of improving user satisfaction scores by 50%+ through thoughtful design solutions.",
      achievements: [
        "Led design for Adobe's flagship Creative Cloud products",
        "Improved user satisfaction by 50%+ across products",
        "Built and scaled design systems used by 100M+ users",
        "Mentored 50+ designers in their career growth",
      ],
      languages: ["English", "Spanish", "Portuguese"],
      sessionTypes: ["Design Portfolio Review", "Career Guidance", "Design Systems", "User Research"],
      availability: "Weekdays 6-8 PM CST, Weekends 10 AM - 2 PM CST",
    },
  }

  const mockReviews: Review[] = [
    {
      id: "1",
      studentName: "Alex Chen",
      rating: 5,
      comment:
        "Sarah provided excellent guidance on system design concepts. Her explanations were clear and practical. Highly recommend!",
      date: "2024-01-15",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: "2",
      studentName: "Maria Garcia",
      rating: 5,
      comment: "Amazing mentor! Helped me prepare for my Google interview. I got the job thanks to her guidance.",
      date: "2024-01-10",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: "3",
      studentName: "David Kim",
      rating: 4,
      comment: "Very knowledgeable and patient. Great insights into career growth in tech.",
      date: "2024-01-05",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
  ]

  useEffect(() => {
    const mentorData = mockMentors[params.id]
    if (mentorData) {
      setMentor(mentorData)
      setReviews(mockReviews)
    }
  }, [params.id])

  if (!mentor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mentor not found</h2>
          <p className="text-gray-600 mb-4">The mentor you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/mentors">Back to Mentors</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <ResponsiveHeader currentPage="mentors" />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-4 sm:mb-6">
          <Link href="/mentors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Back to Mentors</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Profile Header */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <img
                    src={mentor.avatar || "/placeholder.svg"}
                    alt={mentor.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mx-auto sm:mx-0"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <div className="mb-4">
                      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{mentor.name}</h1>
                      <p className="text-lg sm:text-xl text-blue-600 dark:text-blue-400 font-medium mb-1">{mentor.title}</p>
                      <p className="text-muted-foreground mb-2">{mentor.company}</p>
                      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{mentor.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{mentor.experience}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-6 mb-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                        <span className="font-bold text-lg text-foreground">{mentor.rating}</span>
                        <span className="text-muted-foreground ml-1">({mentor.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-5 w-5 mr-1" />
                        <span>100+ mentees</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{mentor.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed">{mentor.fullBio}</p>
              </CardContent>
            </Card>

            {/* Expertise */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Key Achievements</h2>
                <ul className="space-y-3">
                  {mentor.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">Reviews</h2>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.studentName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-foreground">{review.studentName}</h4>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-muted-foreground"}`}
                                />
                              ))}
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="border-0 shadow-md sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-foreground mb-2">₹{mentor.price.toLocaleString()}</div>
                  <p className="text-muted-foreground">per session (60 minutes)</p>
                </div>

                <Button className="w-full mb-4" size="lg" onClick={() => setIsBookingModalOpen(true)}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Book a Session
                </Button>

                <Button variant="outline" className="w-full mb-6">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>

                <Separator className="my-4" />

                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Session Types</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      {mentor.sessionTypes.map((type, index) => (
                        <li key={index}>• {type}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Languages</h4>
                    <p className="text-muted-foreground">{mentor.languages.join(", ")}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Availability</h4>
                    <p className="text-muted-foreground">{mentor.availability}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-medium text-foreground">&lt; 2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sessions Completed</span>
                    <span className="font-medium text-foreground">150+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="font-medium text-foreground">98%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} mentor={mentor} />
    </div>
  )
}
