"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { Star, MapPin, Filter, Search, BookOpen, Users } from "lucide-react"

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
}

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")

  // Mock data
  const mockMentors: Mentor[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      title: "Senior Software Engineer",
      company: "Google",
      expertise: ["React", "Node.js", "System Design", "Career Growth"],
      bio: "10+ years of experience in full-stack development. Helped 100+ engineers advance their careers.",
      rating: 4.9,
      reviewCount: 127,
      price: 2500,
      location: "San Francisco, CA",
      experience: "10+ years",
      avatar: "/placeholder.svg?height=100&width=100&text=SJ",
      category: "Technology",
    },
    {
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
      avatar: "/placeholder.svg?height=100&width=100&text=MC",
      category: "Product",
    },
    {
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
      avatar: "/placeholder.svg?height=100&width=100&text=ER",
      category: "Design",
    },
    {
      id: "4",
      name: "David Kim",
      title: "Data Science Manager",
      company: "Netflix",
      expertise: ["Machine Learning", "Python", "Data Analytics", "AI Strategy"],
      bio: "Leading data science initiatives at scale. Passionate about mentoring the next generation of data scientists.",
      rating: 4.7,
      reviewCount: 94,
      price: 3200,
      location: "Los Angeles, CA",
      experience: "9+ years",
      avatar: "/placeholder.svg?height=100&width=100&text=DK",
      category: "Data Science",
    },
    {
      id: "5",
      name: "Lisa Patel",
      title: "Marketing Director",
      company: "Spotify",
      expertise: ["Digital Marketing", "Brand Strategy", "Growth Hacking", "Analytics"],
      bio: "Growth marketing expert who has scaled multiple startups. Specializes in data-driven marketing strategies.",
      rating: 4.8,
      reviewCount: 112,
      price: 2200,
      location: "New York, NY",
      experience: "7+ years",
      avatar: "/placeholder.svg?height=100&width=100&text=LP",
      category: "Marketing",
    },
    {
      id: "6",
      name: "James Wilson",
      title: "Startup Founder & CEO",
      company: "TechVenture Inc",
      expertise: ["Entrepreneurship", "Fundraising", "Business Strategy", "Leadership"],
      bio: "Serial entrepreneur with 2 successful exits. Mentor to 50+ startup founders and business leaders.",
      rating: 4.9,
      reviewCount: 203,
      price: 4000,
      location: "San Francisco, CA",
      experience: "15+ years",
      avatar: "/placeholder.svg?height=100&width=100&text=JW",
      category: "Business",
    },
  ]

  useEffect(() => {
    setMentors(mockMentors)
    setFilteredMentors(mockMentors)
  }, [])

  useEffect(() => {
    let filtered = mentors

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (mentor) =>
          mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentor.expertise.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
          mentor.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((mentor) => mentor.category === categoryFilter)
    }

    // Rating filter
    if (ratingFilter !== "all") {
      const minRating = Number.parseFloat(ratingFilter)
      filtered = filtered.filter((mentor) => mentor.rating >= minRating)
    }

    // Price filter
    if (priceFilter !== "all") {
      if (priceFilter === "low") {
        filtered = filtered.filter((mentor) => mentor.price < 2500)
      } else if (priceFilter === "medium") {
        filtered = filtered.filter((mentor) => mentor.price >= 2500 && mentor.price < 3500)
      } else if (priceFilter === "high") {
        filtered = filtered.filter((mentor) => mentor.price >= 3500)
      }
    }

    setFilteredMentors(filtered)
  }, [searchTerm, categoryFilter, ratingFilter, priceFilter, mentors])

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
            <Link href="/mentors" className="text-blue-600 font-medium">
              Find Mentors
            </Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Mentor</h1>
          <p className="text-gray-600">Connect with industry experts and accelerate your growth</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="font-medium text-gray-900">Filter Mentors</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search mentors, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
              </SelectContent>
            </Select>

            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                <SelectItem value="4.0">4.0+ Stars</SelectItem>
                <SelectItem value="3.5">3.5+ Stars</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">Under ₹2,500</SelectItem>
                <SelectItem value="medium">₹2,500 - ₹3,500</SelectItem>
                <SelectItem value="high">Above ₹3,500</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredMentors.length} of {mentors.length} mentors
          </p>
        </div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={mentor.avatar || "/placeholder.svg"}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{mentor.name}</h3>
                    <p className="text-blue-600 font-medium">{mentor.title}</p>
                    <p className="text-gray-500 text-sm">{mentor.company}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">{mentor.rating}</span>
                    <span className="ml-1">({mentor.reviewCount})</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{mentor.location}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{mentor.bio}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.expertise.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {mentor.expertise.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{mentor.expertise.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900">₹{mentor.price.toLocaleString()}/session</div>
                  <Button asChild size="sm">
                    <Link href={`/mentors/${mentor.id}`}>View Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  )
}
