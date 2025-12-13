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
        // Hide navbar when scrolling down
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

  return (
    <header 
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
      )}
      style={{ width: 'calc(100% - 2rem)', maxWidth: '1200px' }}
    >
      <div className="bg-white/95 backdrop-blur-lg shadow-lg border-2 border-red-600 rounded-full px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-red-600 rounded-full px-2">
            <Bus className="h-6 w-6 text-red-600" />
            <span className="font-bold text-red-600 hidden sm:inline">Big Red Bus</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-red-600 text-white shadow-md" 
                      : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu */}
          <div className="flex md:hidden">
            <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Open mobile menu"
                  className="p-2 rounded-full hover:bg-red-50"
                >
                  <Menu className="h-5 w-5 text-red-600" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-red-600">Navigation</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close mobile menu"
                    className="p-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.to}
                      onClick={() => handleMobileNavClick(item.to)}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors font-medium"
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
