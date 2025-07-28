import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ResponsiveHeader } from "@/components/responsive-header"
import Link from "next/link"
import { Users, Calendar, MessageCircle, ArrowRight, BookOpen, Target, Award } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Expert Mentors",
      description: "Connect with industry professionals and experienced mentors",
    },
    {
      icon: <Calendar className="h-8 w-8 text-green-600" />,
      title: "Flexible Scheduling",
      description: "Book sessions at your convenience with easy scheduling",
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-purple-600" />,
      title: "1-on-1 Sessions",
      description: "Personalized mentorship sessions tailored to your goals",
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      title: "Verified Profiles",
      description: "All mentors are verified professionals with proven expertise",
    },
  ]

  const stats = [
    { number: "500+", label: "Expert Mentors" },
    { number: "10K+", label: "Sessions Completed" },
    { number: "95%", label: "Success Rate" },
    { number: "50+", label: "Industries Covered" },
  ]

  return (
    <div className="min-h-screen">
      <ResponsiveHeader currentPage="home" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-background to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-200 text-xs sm:text-sm">
            🚀 Launch Your Career with Expert Guidance
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Connect with
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Expert Mentors
            </span>
            <br />
            Accelerate Your Growth
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Get personalized guidance from industry experts. Book 1-on-1 sessions, learn from the best, and achieve your
            career goals faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              <Link href="/mentors">
                Find a Mentor <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="#become-mentor">Become a Mentor</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 px-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.number}</div>
                <div className="text-sm sm:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">Why Choose MentorSetu.ai?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              We connect ambitious learners with experienced professionals to accelerate career growth and skill
              development.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg sm:text-xl text-muted-foreground">Simple steps to get started with mentorship</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Browse Mentors",
                description: "Explore our curated list of expert mentors across various industries and skills.",
                icon: <Users className="h-6 w-6 sm:h-8 sm:w-8" />,
              },
              {
                step: "02",
                title: "Book a Session",
                description: "Schedule a 1-on-1 session at your convenience with your chosen mentor.",
                icon: <Calendar className="h-6 w-6 sm:h-8 sm:w-8" />,
              },
              {
                step: "03",
                title: "Learn & Grow",
                description: "Get personalized guidance, feedback, and actionable insights to accelerate your growth.",
                icon: <Target className="h-6 w-6 sm:h-8 sm:w-8" />,
              },
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg sm:text-xl font-bold">
                  {step.step}
                </div>
                <div className="mb-4 flex justify-center text-blue-600">{step.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground px-2">{step.description}</p>
                {index < 2 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-6 h-6 w-6 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Ready to Accelerate Your Growth?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto px-4">
            Join thousands of learners who are already growing with expert mentorship.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link href="/mentors">
                Find Your Mentor <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent w-full sm:w-auto"
            >
              <Link href="#become-mentor">Start Mentoring</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold">MentorSetu.ai</span>
              </div>
              <p className="text-sm sm:text-base text-gray-400">
                Connecting ambitious learners with expert mentors to accelerate growth and success.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">For Students</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/mentors" className="hover:text-white transition-colors text-sm sm:text-base">
                    Find Mentors
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors text-sm sm:text-base">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                    How it Works
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">For Mentors</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                    Become a Mentor
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                    Mentor Resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="text-sm sm:text-base">&copy; 2024 MentorSetu.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
