import { NavLink } from "react-router-dom";
import { Bus, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t-2 border-red-600 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2 mb-4">
              <Bus className="h-6 w-6 text-red-600" />
              <h3 className="font-heading font-bold text-red-600">Big Red Bus</h3>
            </div>
            <p className="text-sm text-text-light">
              Discover and support community organizations making a difference in Kentucky.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-heading font-bold mb-4 text-red-600">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink 
                  to="/" 
                  className="text-text-light hover:text-red-600 transition-colors"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/directory" 
                  className="text-text-light hover:text-red-600 transition-colors"
                >
                  Directory
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className="text-text-light hover:text-red-600 transition-colors"
                >
                  About FBLA
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact" 
                  className="text-text-light hover:text-red-600 transition-colors"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-heading font-bold mb-4 text-red-600">Contact</h3>
            <div className="space-y-2 text-sm text-text-light">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-600" />
                <span>Louisville, KY</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-red-600" />
                <a href="tel:+1-555-0123" className="hover:text-red-600 transition-colors">
                  (555) 012-3456
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-red-600" />
                <a href="mailto:info@bigredbus.org" className="hover:text-red-600 transition-colors">
                  info@bigredbus.org
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-red-200 text-center text-sm text-text-light">
          <p>&copy; {new Date().getFullYear()} Big Red Bus. Built for FBLA Coding & Programming 2025-2026.</p>
        </div>
      </div>
    </footer>
  );
}
