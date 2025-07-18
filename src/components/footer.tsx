import { BookOpen, Github, Twitter } from "lucide-react"
import { Link } from "react-router"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                LibraNova
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Modern library management system designed for efficiency and ease of use.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link to="/books" className="block text-muted-foreground hover:text-foreground transition-colors">
                All Books
              </Link>
              <Link to="/create-book" className="block text-muted-foreground hover:text-foreground transition-colors">
                Add Book
              </Link>
              <Link
                to="/borrow-summary"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Borrow Summary
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold">Features</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Book Management</p>
              <p>Borrowing System</p>
              <p>Real-time Updates</p>
              <p>Responsive Design</p>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex space-x-2">
              <Link to="#" className="p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <Github className="h-4 w-4" />
              </Link>
              <Link to="#" className="p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <Twitter className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 LibraNova. All rights reserved. Built with ❤️ for libraries everywhere.</p>
        </div>
      </div>
    </footer>
  )
}
