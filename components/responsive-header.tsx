"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { Menu, BookOpen } from "lucide-react"

interface MobileNavProps {
  currentPage?: string
}

export function MobileNav({ currentPage }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  const navigation = [
    { name: "Find Mentors", href: "/mentors", current: currentPage === "mentors" },
    { name: "Dashboard", href: "/dashboard", current: currentPage === "dashboard" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col space-y-4 mt-6">
          <div className="flex items-center space-x-2 pb-4 border-b">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">MentorSetu.ai</span>
          </div>
          
          <nav className="flex flex-col space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.current
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Become a Mentor
            </Button>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface ResponsiveHeaderProps {
  currentPage?: string
}

export function ResponsiveHeader({ currentPage }: ResponsiveHeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg sm:text-xl font-bold text-foreground">MentorSetu.ai</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/mentors" 
            className={`text-sm font-medium transition-colors ${
              currentPage === "mentors"
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Find Mentors
          </Link>
          <Link 
            href="/dashboard" 
            className={`text-sm font-medium transition-colors ${
              currentPage === "dashboard"
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Dashboard
          </Link>
          <Button variant="outline" size="sm">Become a Mentor</Button>
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <MobileNav currentPage={currentPage} />
        </div>
      </div>
    </header>
  )
}
