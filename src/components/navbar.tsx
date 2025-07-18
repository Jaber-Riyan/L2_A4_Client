import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Menu, X, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mood-toggle";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "All Books", path: "/books" },
  { name: "Add Book", path: "/create-book", protected: true },
  { name: "Borrow Summary", path: "/borrow-summary" },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };


  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              LibraNova
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                asChild
                variant={isActive(link.path) ? "default" : "ghost"}
              >
                <Link to={link.path}>{link.name}</Link>
              </Button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <ModeToggle />
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user.name}
                </Button>
                <Button className="cursor-pointer" variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "max-h-72 pb-4" : "max-h-0"
          )}
        >
          <div className="space-y-2 pt-4">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                asChild
                variant={isActive(link.path) ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link to={link.path}>{link.name}</Link>
              </Button>
            ))}

            {/* Mobile Auth Section */}
            {user ? (
              <>
                <div className="px-3 py-2 text-sm text-muted-foreground border-t">
                  Signed in as {user.name}
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  asChild
                  className="w-full justify-start"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="w-full justify-start"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
