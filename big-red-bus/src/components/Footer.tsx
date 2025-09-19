export default function Footer() {
  return (
    <footer className="bg-cream border-t">
      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">About</h3>
            <p className="text-sm text-warm-gray">
              The Big Red Bus is a nonprofit organization dedicated to raising awareness and support for mental health and autism.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/mission">Our Mission</a></li>
              <li><a href="/partners">Partners</a></li>
              <li><a href="/get-involved">Get Involved</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Partners</h3>
            {/* Partner badges would go here */}
          </div>
          <div>
            <h3 className="font-bold mb-4">Newsletter</h3>
            <p className="text-sm text-warm-gray mb-2">Stay up to date with our latest news and events.</p>
            {/* Newsletter form would go here */}
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-warm-gray">
          <p>&copy; {new Date().getFullYear()} Big Red Bus. A 501(c)(3) nonprofit organization.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Social icons would go here */}
            <a href="/privacy">Privacy Policy</a>
            <a href="/accessibility">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
