import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogoBus } from "@/components/LogoBus";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Link } from "react-router-dom";
import organizationsData from "@/data/organizations.json";
import type { Organization } from "@/types/organization";

const organizations = organizationsData as Organization[];

// Get categories for category pills
const categories = Array.from(new Set(organizations.map(org => org.category)));

// Calculate stats
const totalOrgs = organizations.length;
const totalDeals = organizations.reduce((sum, org) => sum + org.deals.length, 0);
const cities = Array.from(new Set(organizations.map(org => org.city)));

export default function Home() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center py-12">
        <Reveal>
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-text leading-tight">
              Discover & Support <span className="text-red-600">Community Organizations</span>
            </h1>
            <p className="text-lg text-text-light leading-relaxed">
              Find nonprofits and local businesses making a difference in your community. 
              Search, discover exclusive deals, and leave reviews.
            </p>
            <div className="flex gap-4 flex-wrap justify-center md:justify-start">
              <Link to="/directory">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 shadow-lg hover:shadow-xl transition-all">
                  Browse Directory <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-2 border-red-600 text-red-600 hover:bg-red-50 rounded-full px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-12 flex items-center justify-center border-2 border-red-200 shadow-lg">
            <LogoBus className="w-full h-auto max-w-md" />
          </div>
        </Reveal>
      </section>

      {/* How It Works */}
      <Reveal>
        <section className="text-center">
          <h2 className="text-4xl font-heading font-bold mb-4 text-red-600">How Big Red Bus Works</h2>
          <p className="text-lg text-text-light mb-12 max-w-2xl mx-auto">
            Three simple steps to discover and support local organizations
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-red-200 hover:border-red-600 hover:shadow-xl transition-all bg-white rounded-2xl">
              <CardContent className="pt-8 pb-8">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-heading font-bold text-xl mb-3 text-red-600">Discover</h3>
                <p className="text-text-light">
                  Search through local nonprofits and community-focused businesses in your area
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-red-200 hover:border-red-600 hover:shadow-xl transition-all bg-white rounded-2xl">
              <CardContent className="pt-8 pb-8">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="font-heading font-bold text-xl mb-3 text-red-600">Support</h3>
                <p className="text-text-light">
                  Find exclusive deals and coupons from participating organizations
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-red-200 hover:border-red-600 hover:shadow-xl transition-all bg-white rounded-2xl">
              <CardContent className="pt-8 pb-8">
                <div className="text-6xl mb-4">⭐</div>
                <h3 className="font-heading font-bold text-xl mb-3 text-red-600">Connect</h3>
                <p className="text-text-light">
                  Leave reviews and save favorites to help others discover great organizations
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </Reveal>

      {/* Featured Categories */}
      <Reveal>
        <section className="text-center">
          <h2 className="text-4xl font-heading font-bold mb-4 text-red-600">Explore by Category</h2>
          <p className="text-lg text-text-light mb-8">
            Find organizations that match your interests
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Link 
                key={category} 
                to={`/directory?category=${encodeURIComponent(category)}`}
              >
                <Badge 
                  className="text-base py-2 px-6 cursor-pointer hover:scale-105 transition-transform rounded-full border-2 border-red-200 bg-white text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600"
                >
                  {category}
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Stats Section */}
      <Reveal>
        <section className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-12 shadow-2xl border-2 border-red-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-white mb-2">{totalOrgs}+</div>
              <div className="text-lg text-red-100">Organizations</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">{totalDeals}+</div>
              <div className="text-lg text-red-100">Active Deals</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">{cities.length}+</div>
              <div className="text-lg text-red-100">Communities</div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-red-50 to-white rounded-3xl py-16 text-center border-2 border-red-200 shadow-lg">
        <Reveal>
          <div className="max-w-2xl mx-auto space-y-6 px-4">
            <h2 className="text-4xl font-heading font-bold text-red-600">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-text-light">
              Start exploring community organizations today and discover how you can support your local community
            </p>
            <Link to="/directory">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 shadow-lg hover:shadow-xl transition-all">
                Browse Directory <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
