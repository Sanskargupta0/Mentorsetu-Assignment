"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ResponsiveHeader } from "@/components/responsive-header"
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
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
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
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
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
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
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
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
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
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
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
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
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
      <ResponsiveHeader currentPage="mentors" />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">Find Your Perfect Mentor</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Connect with industry experts and accelerate your growth</p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg shadow-sm border p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Filter Mentors</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative sm:col-span-2 lg:col-span-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
        <div className="mb-4 sm:mb-6">
          <p className="text-muted-foreground text-sm sm:text-base">
            Showing {filteredMentors.length} of {mentors.length} mentors
          </p>
        </div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start space-x-3 sm:space-x-4 mb-4">
                  <img
                    src={mentor.avatar || "/placeholder.svg"}
                    alt={mentor.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-base sm:text-lg truncate">{mentor.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium text-sm sm:text-base truncate">{mentor.title}</p>
                    <p className="text-muted-foreground text-xs sm:text-sm truncate">{mentor.company}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">{mentor.rating}</span>
                    <span className="ml-1">({mentor.reviewCount})</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span className="truncate">{mentor.location}</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-xs sm:text-sm mb-4 line-clamp-2">{mentor.bio}</p>

                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
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

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                  <div className="text-base sm:text-lg font-bold text-foreground">₹{mentor.price.toLocaleString()}/session</div>
                  <Button asChild size="sm" className="w-full sm:w-auto">
                    <Link href={`/mentors/${mentor.id}`}>View Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <Users className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">No mentors found</h3>
            <p className="text-muted-foreground text-sm sm:text-base">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  )
}
