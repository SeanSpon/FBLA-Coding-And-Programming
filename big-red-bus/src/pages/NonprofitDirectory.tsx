import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Checkbox 
} from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { nonprofits, categories, serviceAreas, targetPopulations, states } from "@/lib/data/nonprofits";
import { Reveal } from "@/components/Reveal";
import { Search, MapPin, Phone, Globe, ChevronDown, Filter } from "lucide-react";

export default function NonprofitDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedServiceAreas, setSelectedServiceAreas] = useState<string[]>([]);
  const [selectedTargetPopulations, setSelectedTargetPopulations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "founded" | "recent">("name");
  const [showFilters, setShowFilters] = useState(false);

  const filteredNonprofits = useMemo(() => {
    const filtered = nonprofits.filter((nonprofit) => {
      // Search term filter
      const searchMatch = !searchTerm || 
        nonprofit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nonprofit.mission.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nonprofit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nonprofit.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // State filter
      const stateMatch = !selectedState || nonprofit.address.state === selectedState;

      // Category filter
      const categoryMatch = selectedCategories.length === 0 || 
        selectedCategories.some(cat => nonprofit.categories.includes(cat));

      // Service area filter
      const serviceMatch = selectedServiceAreas.length === 0 || 
        selectedServiceAreas.some(service => nonprofit.serviceAreas.includes(service));

      // Target population filter
      const populationMatch = selectedTargetPopulations.length === 0 || 
        selectedTargetPopulations.some(pop => nonprofit.targetPopulations.includes(pop));

      return searchMatch && stateMatch && categoryMatch && serviceMatch && populationMatch;
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "founded":
          return (b.foundedYear || 0) - (a.foundedYear || 0);
        case "recent":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedState, selectedCategories, selectedServiceAreas, selectedTargetPopulations, sortBy]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleServiceAreaChange = (serviceArea: string, checked: boolean) => {
    if (checked) {
      setSelectedServiceAreas([...selectedServiceAreas, serviceArea]);
    } else {
      setSelectedServiceAreas(selectedServiceAreas.filter(s => s !== serviceArea));
    }
  };

  const handleTargetPopulationChange = (population: string, checked: boolean) => {
    if (checked) {
      setSelectedTargetPopulations([...selectedTargetPopulations, population]);
    } else {
      setSelectedTargetPopulations(selectedTargetPopulations.filter(p => p !== population));
    }
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedState("");
    setSelectedCategories([]);
    setSelectedServiceAreas([]);
    setSelectedTargetPopulations([]);
  };

  return (
    <div className="space-y-8">
      <Reveal>
        <section className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Nonprofit Directory</h1>
          <p className="text-lg text-warm-gray max-w-3xl mx-auto">
            Discover and connect with nonprofit organizations making a difference in your community.
            Find organizations by location, services, and focus areas.
          </p>
        </section>
      </Reveal>

      {/* Search and Filter Controls */}
      <Reveal>
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-gray h-4 w-4" />
            <Input
              placeholder="Search organizations, services, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Quick Filters and Sort */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2 items-center">
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All States</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Advanced Filters
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>

              {(selectedCategories.length > 0 || selectedServiceAreas.length > 0 || selectedTargetPopulations.length > 0 || selectedState) && (
                <Button variant="ghost" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="sort" className="text-sm">Sort by:</Label>
              <Select value={sortBy} onValueChange={(value: "name" | "founded" | "recent") => setSortBy(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="founded">Founded (Recent)</SelectItem>
                  <SelectItem value="recent">Last Updated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Advanced Filters */}
          <Collapsible open={showFilters} onOpenChange={setShowFilters}>
            <CollapsibleContent className="space-y-6 pt-4 border-t">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked: boolean) => handleCategoryChange(category, checked)}
                        />
                        <Label htmlFor={`category-${category}`} className="text-sm">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Areas */}
                <div>
                  <h3 className="font-semibold mb-3">Service Areas</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {serviceAreas.map((serviceArea) => (
                      <div key={serviceArea} className="flex items-center space-x-2">
                        <Checkbox
                          id={`service-${serviceArea}`}
                          checked={selectedServiceAreas.includes(serviceArea)}
                          onCheckedChange={(checked: boolean) => handleServiceAreaChange(serviceArea, checked)}
                        />
                        <Label htmlFor={`service-${serviceArea}`} className="text-sm">
                          {serviceArea}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Populations */}
                <div>
                  <h3 className="font-semibold mb-3">Who They Serve</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {targetPopulations.map((population) => (
                      <div key={population} className="flex items-center space-x-2">
                        <Checkbox
                          id={`population-${population}`}
                          checked={selectedTargetPopulations.includes(population)}
                          onCheckedChange={(checked: boolean) => handleTargetPopulationChange(population, checked)}
                        />
                        <Label htmlFor={`population-${population}`} className="text-sm">
                          {population}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </Reveal>

      {/* Results Count */}
      <Reveal>
        <div className="flex items-center justify-between">
          <p className="text-warm-gray">
            Showing {filteredNonprofits.length} of {nonprofits.length} organizations
          </p>
          {(selectedCategories.length > 0 || selectedServiceAreas.length > 0 || selectedTargetPopulations.length > 0) && (
            <div className="flex flex-wrap gap-1">
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
              {selectedServiceAreas.map((service) => (
                <Badge key={service} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
              {selectedTargetPopulations.map((population) => (
                <Badge key={population} variant="outline" className="text-xs">
                  {population}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Reveal>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNonprofits.map((nonprofit, index) => (
          <Reveal key={nonprofit.id} delay={index * 0.1}>
            <Link to={`/nonprofits/${nonprofit.id}`}>
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">{nonprofit.name}</CardTitle>
                      <CardDescription className="mt-2 line-clamp-2">
                        {nonprofit.mission}
                      </CardDescription>
                    </div>
                    {nonprofit.logoUrl && (
                      <img 
                        src={nonprofit.logoUrl} 
                        alt={`${nonprofit.name} logo`} 
                        className="h-12 w-12 ml-4 flex-shrink-0 object-contain"
                      />
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-warm-gray">
                      <MapPin className="h-4 w-4 mr-1" />
                      {nonprofit.address.city}, {nonprofit.address.state}
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {nonprofit.categories.slice(0, 3).map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                      {nonprofit.categories.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{nonprofit.categories.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {nonprofit.isVerified && (
                      <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <div className="w-full space-y-2">
                    <div className="flex items-center gap-4 text-xs text-warm-gray">
                      {nonprofit.phone && (
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          <span>Phone</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Globe className="h-3 w-3 mr-1" />
                        <span>Website</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* No Results */}
      {filteredNonprofits.length === 0 && (
        <Reveal>
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No organizations found</h3>
            <p className="text-warm-gray mb-4">
              Try adjusting your search terms or filters to find more results.
            </p>
            <Button onClick={clearAllFilters}>Clear All Filters</Button>
          </div>
        </Reveal>
      )}
    </div>
  );
}