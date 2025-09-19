import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { nonprofits } from "@/lib/data/nonprofits";
import { Reveal } from "@/components/Reveal";
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar,
  Users,
  DollarSign,
  CheckCircle,
  ExternalLink
} from "lucide-react";

export default function NonprofitDetail() {
  const { id } = useParams();
  const nonprofit = nonprofits.find((org) => org.id === Number(id));

  if (!nonprofit) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Organization Not Found</h1>
        <p className="text-warm-gray mb-8">
          Sorry, we couldn't find the organization you're looking for.
        </p>
        <Link to="/nonprofits">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Directory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Navigation */}
      <Reveal>
        <Link to="/nonprofits" className="inline-flex items-center text-primary-red hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Directory
        </Link>
      </Reveal>

      {/* Header Section */}
      <Reveal>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1">
            <div className="flex items-start gap-4 mb-4">
              {nonprofit.logoUrl && (
                <img 
                  src={nonprofit.logoUrl} 
                  alt={`${nonprofit.name} logo`} 
                  className="h-16 w-16 object-contain"
                />
              )}
              <div>
                <h1 className="text-3xl font-heading font-bold mb-2">{nonprofit.name}</h1>
                {nonprofit.isVerified && (
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Verified Organization
                    </Badge>
                  </div>
                )}
                <p className="text-lg text-warm-gray italic">"{nonprofit.mission}"</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {nonprofit.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button size="lg" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Donate to This Organization
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Users className="h-4 w-4" />
              Get Involved
            </Button>
          </div>
        </div>
      </Reveal>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <Reveal>
            <Card>
              <CardHeader>
                <CardTitle>About This Organization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-warm-gray leading-relaxed">{nonprofit.description}</p>
              </CardContent>
            </Card>
          </Reveal>

          {/* Services */}
          <Reveal>
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
                <CardDescription>
                  Programs and services provided by this organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {nonprofit.serviceAreas.map((service) => (
                    <div key={service} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Who They Serve */}
          <Reveal>
            <Card>
              <CardHeader>
                <CardTitle>Who They Serve</CardTitle>
                <CardDescription>
                  Target populations and communities served
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {nonprofit.targetPopulations.map((population) => (
                    <Badge key={population} variant="outline">
                      {population}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Contact Information */}
          <Reveal>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary-red mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-warm-gray">
                        {nonprofit.address.street}<br />
                        {nonprofit.address.city}, {nonprofit.address.state} {nonprofit.address.zipCode}
                        {nonprofit.address.county && <><br />{nonprofit.address.county} County</>}
                      </p>
                    </div>
                  </div>

                  {nonprofit.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary-red mt-0.5" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a 
                          href={`tel:${nonprofit.phone}`}
                          className="text-sm text-primary-red hover:underline"
                        >
                          {nonprofit.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary-red mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a 
                        href={`mailto:${nonprofit.email}`}
                        className="text-sm text-primary-red hover:underline"
                      >
                        {nonprofit.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-primary-red mt-0.5" />
                    <div>
                      <p className="font-medium">Website</p>
                      <a 
                        href={nonprofit.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-red hover:underline inline-flex items-center gap-1"
                      >
                        Visit Website
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Reveal>
            <Card>
              <CardHeader>
                <CardTitle>Organization Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {nonprofit.foundedYear && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-warm-gray" />
                    <div>
                      <p className="text-sm font-medium">Founded</p>
                      <p className="text-sm text-warm-gray">{nonprofit.foundedYear}</p>
                    </div>
                  </div>
                )}

                {nonprofit.staffSize && (
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-warm-gray" />
                    <div>
                      <p className="text-sm font-medium">Staff Size</p>
                      <p className="text-sm text-warm-gray">{nonprofit.staffSize} employees</p>
                    </div>
                  </div>
                )}

                {nonprofit.annualBudget && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-4 w-4 text-warm-gray" />
                    <div>
                      <p className="text-sm font-medium">Annual Budget</p>
                      <p className="text-sm text-warm-gray">{nonprofit.annualBudget}</p>
                    </div>
                  </div>
                )}

                <Separator />

                <div>
                  <p className="text-xs text-warm-gray">
                    Last updated: {new Date(nonprofit.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Action Cards */}
          <Reveal>
            <Card>
              <CardHeader>
                <CardTitle>Get Involved</CardTitle>
                <CardDescription>
                  Ways you can support this organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start gap-2">
                  <DollarSign className="h-4 w-4" />
                  Make a Donation
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  Volunteer Opportunities
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Organization
                </Button>
              </CardContent>
            </Card>
          </Reveal>

          {/* Tags */}
          {nonprofit.tags.length > 0 && (
            <Reveal>
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {nonprofit.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}