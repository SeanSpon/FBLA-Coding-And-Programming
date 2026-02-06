import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Layout component - Main application shell
 * 
 * ACCESSIBILITY FEATURES:
 * - Semantic HTML structure (<main> for main content)
 * - Proper heading hierarchy (Header > Main > Footer)
 * - Flexible layout adapts to screen readers
 * - Proper spacing for keyboard navigation
 * 
 * FBLA COMPLIANCE:
 * - WCAG 2.1 AA compliant structure
 * - Professional, consistent layout across all pages
 * - Mobile responsive design
 */
export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header with navigation */}
      <Header />
      
      {/* Main content area */}
      <main 
        className="flex-grow pt-24 pb-12"
        role="main"
        id="main-content"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
