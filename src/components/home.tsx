import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BookOpen,
  Users,
  Shield,
  Zap,
  Globe,
  BarChart3,
  ArrowRight,
  Star,
  Building,
  GraduationCap,
  Home,
  Briefcase,
  Database,
  Cloud,
  Smartphone,
  Lock,
  Play,
} from "lucide-react"
import { Link } from "react-router"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 animate-in fade-in-0 duration-1000">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-medium">
              <BookOpen className="h-4 w-4" />
              Trusted by 10,000+ Libraries Worldwide
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              LibraNova
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The complete library management solution trusted by educational institutions, public libraries, and
              corporate organizations worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/books">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                <Link to="#demo">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              No credit card required • 30-day free trial • Setup in minutes
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Libraries Everywhere</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of libraries that have transformed their operations with LibraNova
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">10K+</div>
              <p className="text-muted-foreground">Active Libraries</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">2M+</div>
              <p className="text-muted-foreground">Books Managed</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">500K+</div>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">99.9%</div>
              <p className="text-muted-foreground">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How LibraNova Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get your library management system up and running in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Database className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">1. Import Your Data</h3>
                <p className="text-muted-foreground">
                  Easily import your existing book catalog and user data with our migration tools
                </p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">2. Set Up Users</h3>
                <p className="text-muted-foreground">
                  Configure user roles, permissions, and borrowing policies for your organization
                </p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">3. Manage Collection</h3>
                <p className="text-muted-foreground">
                  Add, edit, and organize your book collection with our intuitive interface
                </p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">4. Track & Analyze</h3>
                <p className="text-muted-foreground">
                  Monitor borrowing patterns and generate insights with comprehensive analytics
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Every Type of Library</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From small community libraries to large academic institutions, LibraNova scales to meet your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors">
                  <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg">Academic Libraries</CardTitle>
                <CardDescription>
                  Universities, colleges, and schools managing extensive research collections and student resources.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 delay-75">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-900/40 transition-colors">
                  <Building className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-lg">Public Libraries</CardTitle>
                <CardDescription>
                  Community libraries serving diverse populations with varied collections and programs.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 delay-150">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40 transition-colors">
                  <Briefcase className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-lg">Corporate Libraries</CardTitle>
                <CardDescription>
                  Business and legal libraries managing specialized resources and research materials.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 delay-200">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/40 transition-colors">
                  <Home className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-lg">Special Collections</CardTitle>
                <CardDescription>
                  Museums, archives, and specialized libraries with unique cataloging requirements.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Modern Libraries</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your library efficiently and provide excellent service to your patrons.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Smart Cataloging</CardTitle>
                </div>
                <CardDescription>
                  Advanced search, filtering, and categorization with ISBN lookup and automated metadata enrichment.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 delay-75">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">User Management</CardTitle>
                </div>
                <CardDescription>
                  Comprehensive patron management with role-based access, borrowing limits, and automated notifications.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 delay-150">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Analytics & Reports</CardTitle>
                </div>
                <CardDescription>
                  Detailed insights into collection usage, popular titles, and borrowing patterns with exportable
                  reports.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 delay-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Mobile Ready</CardTitle>
                </div>
                <CardDescription>
                  Fully responsive design works perfectly on all devices with native mobile app coming soon.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 delay-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Cloud className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Cloud Integration</CardTitle>
                </div>
                <CardDescription>
                  Seamless integration with popular cloud services, backup solutions, and third-party library systems.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 delay-400">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Enterprise Security</CardTitle>
                </div>
                <CardDescription>
                  Bank-level security with encryption, regular backups, and compliance with data protection regulations.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what library professionals are saying about LibraNova.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed">
                  "LibraNova transformed our library operations completely. The intuitive interface and powerful
                  features have made managing our 50,000+ book collection effortless."
                </CardDescription>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    SM
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Mitchell</p>
                    <p className="text-sm text-muted-foreground">Head Librarian, City University</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 delay-75">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed">
                  "The analytics and reporting features are outstanding. We can now make data-driven decisions about our
                  collection and better serve our community."
                </CardDescription>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                    MJ
                  </div>
                  <div>
                    <p className="font-semibold">Michael Johnson</p>
                    <p className="text-sm text-muted-foreground">Director, Metro Public Library</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 delay-150">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed">
                  "Implementation was seamless and the support team is exceptional. Our staff adapted quickly and our
                  patrons love the improved experience."
                </CardDescription>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    EC
                  </div>
                  <div>
                    <p className="font-semibold">Emily Chen</p>
                    <p className="text-sm text-muted-foreground">Library Manager, Tech Corp</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built with Modern Technology</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              LibraNova is built on cutting-edge technology stack ensuring reliability, security, and scalability.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            <div className="flex flex-col items-center space-y-3 group">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                <div className="w-8 h-8 bg-blue-500 rounded"></div>
              </div>
              <p className="text-sm font-medium">React</p>
            </div>

            <div className="flex flex-col items-center space-y-3 group">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                <div className="w-8 h-8 bg-black dark:bg-white rounded"></div>
              </div>
              <p className="text-sm font-medium">Redux</p>
            </div>

            <div className="flex flex-col items-center space-y-3 group">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                <div className="w-8 h-8 bg-blue-600 rounded"></div>
              </div>
              <p className="text-sm font-medium">TypeScript</p>
            </div>

            <div className="flex flex-col items-center space-y-3 group">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                <div className="w-8 h-8 bg-teal-500 rounded"></div>
              </div>
              <p className="text-sm font-medium">Tailwind</p>
            </div>

            <div className="flex flex-col items-center space-y-3 group">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                <div className="w-8 h-8 bg-green-500 rounded"></div>
              </div>
              <p className="text-sm font-medium">Node.js</p>
            </div>

            <div className="flex flex-col items-center space-y-3 group">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                <div className="w-8 h-8 bg-orange-500 rounded"></div>
              </div>
              <p className="text-sm font-medium">MongoDB</p>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <Shield className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Enterprise Security</h3>
              <p className="text-muted-foreground">
                SOC 2 compliant with end-to-end encryption and regular security audits.
              </p>
            </div>

            <div className="text-center space-y-3">
              <Zap className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
              <p className="text-muted-foreground">Optimized performance with CDN delivery and intelligent caching.</p>
            </div>

            <div className="text-center space-y-3">
              <Globe className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Global Scale</h3>
              <p className="text-muted-foreground">Multi-region deployment ensuring 99.9% uptime worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6 text-white">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Library?</h2>
            <p className="text-lg opacity-90">
              Join thousands of libraries worldwide who trust LibraNova to manage their collections efficiently. Start
              your free trial today and see the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link to="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-primary"
              >
                <Link to="#contact">Schedule Demo</Link>
              </Button>
            </div>
            <p className="text-sm opacity-75">30-day free trial • No setup fees • Cancel anytime</p>
          </div>
        </div>
      </section>
    </div>
  )
}
