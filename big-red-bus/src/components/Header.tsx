import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Bus, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/directory", label: "Directory" },
  { to: "/about", label: "About FBLA" },
  { to: "/contact", label: "Contact" },
];

/**
 * Header component - Main navigation and branding
 * 
 * ACCESSIBILITY FEATURES:
 * - Semantic <header> and <nav> elements
 * - Keyboard navigation with focus indicators
 * - ARIA labels for interactive elements
 * - Mobile menu accessible via keyboard (Tab, Enter, Escape)
 * - Logo has aria-label for screen readers
 * - Focus visible on all interactive elements
 * - Proper link semantics (NavLink from React Router)
 * 
 * FBLA COMPLIANCE:
 * - WCAG 2.1 AA compliant navigation
 * - Professional header design
 * - Mobile responsive navigation
 * - Clear navigation hierarchy
 * - Keyboard accessible menus
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide navbar when scrolling down (fancy feature, but hide on scroll down)
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleMobileNavClick = (to: string) => {
    setMobileMenuOpen(false);
    navigate(to);
  };

  /**
   * Handle escape key in mobile menu
   * Allows keyboard users to close menu with Escape
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
      )}
      style={{ width: 'calc(100% - 2rem)', maxWidth: '1200px' }}
      role="banner"
    >
      <div className="bg-white/95 backdrop-blur-lg shadow-lg border-2 border-red-600 rounded-full px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - Accessible home link */}
          <NavLink 
            to="/" 
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-red-600 rounded-full px-2 transition-all"
            aria-label="Big Red Bus - Home"
          >
            <Bus className="h-6 w-6 text-red-600" aria-hidden="true" />
            <span className="font-bold text-red-600 hidden sm:inline">Big Red Bus</span>
          </NavLink>

          {/* Desktop Navigation - Keyboard accessible */}
          <nav 
            className="hidden md:flex items-center space-x-1"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600",
                    isActive 
                      ? "bg-red-600 text-white shadow-md" 
                      : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                  )
                }
                aria-current={({ isActive }) => isActive ? "page" : undefined}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu - Accessible dialog */}
          <div className="flex md:hidden">
            <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Open mobile navigation menu"
                  aria-expanded={mobileMenuOpen}
                  className="p-2 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <Menu className="h-5 w-5 text-red-600" aria-hidden="true" />
                </Button>
              </DialogTrigger>
              <DialogContent 
                className="sm:max-w-md"
                onKeyDown={handleKeyDown}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-red-600">Navigation</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close mobile navigation menu"
                    className="p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
                
                {/* Mobile Navigation - Keyboard and screen reader accessible */}
                <nav className="space-y-2" aria-label="Mobile navigation">
                  {navItems.map((item) => (
                    <button
                      key={item.to}
                      onClick={() => handleMobileNavClick(item.to)}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors font-medium"
                      aria-label={`Navigate to ${item.label}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
}
