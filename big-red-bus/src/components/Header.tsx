import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bus } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="mr-6 flex items-center space-x-2">
          <Bus className="h-6 w-6 text-primary-red" />
          <span className="font-bold">Big Red Bus</span>
        </NavLink>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/mission">Our Mission</NavLink>
          <NavLink to="/partners">Partners</NavLink>
          <NavLink to="/programs">Programs</NavLink>
          <NavLink to="/impact">Impact</NavLink>
          <NavLink to="/donate">Donate</NavLink>
          <NavLink to="/get-involved">Get Involved</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/stories">Stories</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button>Donate</Button>
          <Button variant="outline">Get Involved</Button>
        </div>
      </div>
    </header>
  );
}
