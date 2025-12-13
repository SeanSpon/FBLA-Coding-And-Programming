import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold">
          Built for <span className="text-red-600">FBLA Coding & Programming</span>
        </h1>
        <p className="text-xl text-text-light">
          2025-2026 Competition
        </p>
      </div>

      {/* Challenge Section */}
      <Card className="border-2 border-red-200 rounded-2xl shadow-lg">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-heading font-bold mb-4 text-red-600">The Challenge</h2>
          <p className="text-text-light mb-4 leading-relaxed">
            Create a tool to help users discover and support small, local businesses in their community.
          </p>
          <div className="space-y-2">
            <p className="font-semibold mb-2">Requirements:</p>
            <div className="space-y-2">
              {[
                "Sort businesses by category",
                "Allow users to leave reviews/ratings",
                "Save/bookmark favorites",
                "Display special deals/coupons",
                "Implement bot verification"
              ].map((req, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Solution Section */}
      <section>
        <h2 className="text-3xl font-heading font-bold mb-6 text-red-600">Our Solution</h2>
        <p className="text-text-light mb-6 leading-relaxed">
          Big Red Bus addresses this challenge by creating a comprehensive platform for discovering 
          BOTH nonprofits AND community-focused local businesses. We believe that supporting local 
          organizations strengthens communities and creates positive social impact.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-red-200 hover:border-red-600 hover:shadow-lg transition-all rounded-2xl">
            <CardContent className="pt-6">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-heading font-bold text-lg mb-2 text-red-600">
                Searchable Directory
              </h3>
              <p className="text-sm text-text-light">
                Advanced filtering by category, location, and rating with full-text search capability
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 hover:border-red-600 hover:shadow-lg transition-all rounded-2xl">
            <CardContent className="pt-6">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-heading font-bold text-lg mb-2 text-red-600">
                User Reviews
              </h3>
              <p className="text-sm text-text-light">
                Community-driven reviews with bot verification to ensure authenticity
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 hover:border-red-600 hover:shadow-lg transition-all rounded-2xl">
            <CardContent className="pt-6">
              <div className="text-4xl mb-3">❤️</div>
              <h3 className="font-heading font-bold text-lg mb-2 text-red-600">
                Favorites System
              </h3>
              <p className="text-sm text-text-light">
                Save your favorite organizations using localStorage for persistent bookmarks
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 hover:border-red-600 hover:shadow-lg transition-all rounded-2xl">
            <CardContent className="pt-6">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-heading font-bold text-lg mb-2 text-red-600">
                Exclusive Deals
              </h3>
              <p className="text-sm text-text-light">
                Promotional codes and special offers with bot-verified claiming system
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 hover:border-red-600 hover:shadow-lg transition-all rounded-2xl">
            <CardContent className="pt-6">
              <div className="text-4xl mb-3">♿</div>
              <h3 className="font-heading font-bold text-lg mb-2 text-red-600">
                Accessible Design
              </h3>
              <p className="text-sm text-text-light">
                Clean, intuitive interface designed with accessibility and usability in mind
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 hover:border-red-600 hover:shadow-lg transition-all rounded-2xl">
            <CardContent className="pt-6">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-heading font-bold text-lg mb-2 text-red-600">
                Bot Verification
              </h3>
              <p className="text-sm text-text-light">
                Simple math CAPTCHA prevents spam while maintaining user-friendly experience
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-8 border-2 border-red-200 shadow-lg">
        <h2 className="text-3xl font-heading font-bold mb-6 text-red-600">Tech Stack</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2 text-red-600">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-red-600 text-white border-0 rounded-full">React 19</Badge>
              <Badge className="bg-red-600 text-white border-0 rounded-full">TypeScript</Badge>
              <Badge className="bg-red-600 text-white border-0 rounded-full">Vite</Badge>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-red-600">Styling</h3>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-red-600 text-white border-0 rounded-full">Tailwind CSS</Badge>
              <Badge className="bg-red-600 text-white border-0 rounded-full">shadcn/ui</Badge>
              <Badge className="bg-red-600 text-white border-0 rounded-full">Framer Motion</Badge>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-red-600">Routing</h3>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-red-600 text-white border-0 rounded-full">React Router v7</Badge>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-red-600">Data & Storage</h3>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-red-600 text-white border-0 rounded-full">JSON</Badge>
              <Badge className="bg-red-600 text-white border-0 rounded-full">localStorage</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section>
        <h2 className="text-3xl font-heading font-bold mb-6 text-red-600">Key Features</h2>
        <div className="space-y-4">
          <Card className="border-2 border-red-200 rounded-2xl">
            <CardContent className="pt-6">
              <h3 className="font-heading font-bold text-lg mb-2 text-red-600">
                ✅ Multi-criteria Filtering
              </h3>
              <p className="text-text-light">
                Users can filter by category, city, minimum rating, and toggle filters for favorites 
                and organizations with deals. All filters work together seamlessly with URL persistence.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 rounded-2xl">
            <CardContent className="pt-6">
              <h3 className="font-heading font-bold text-lg mb-2 text-red-600">
                ✅ Review System with Validation
              </h3>
              <p className="text-text-light">
                Bot verification ensures quality reviews. Users must verify they're human before 
                submitting reviews or claiming deals, preventing spam and maintaining data integrity.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 rounded-2xl">
            <CardContent className="pt-6">
              <h3 className="font-heading font-bold text-lg mb-2 text-red-600">
                ✅ Persistent User Preferences
              </h3>
              <p className="text-text-light">
                Favorites, reviews, and claimed deals are stored in localStorage, providing a 
                personalized experience without requiring user accounts or server-side storage.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 rounded-2xl">
            <CardContent className="pt-6">
              <h3 className="font-heading font-bold text-lg mb-2 text-red-600">
                ✅ Responsive Design
              </h3>
              <p className="text-text-light">
                Mobile-first design ensures the application works beautifully on all devices, 
                from phones to tablets to desktop computers.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-12 shadow-2xl border-2 border-red-800">
        <h2 className="text-2xl font-heading font-bold mb-4 text-white">
          Experience Big Red Bus
        </h2>
        <p className="text-red-100 mb-6">
          Explore our directory of community organizations
        </p>
        <Link to="/directory">
          <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 rounded-full px-8 shadow-lg">
            Browse Directory
          </Button>
        </Link>
      </div>
    </div>
  );
}
