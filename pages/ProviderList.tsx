import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProviderCard from "@/components/ProviderCard";
import { ArrowLeft, Filter, MapPin, Star, Shield, SlidersHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - in real app this would come from API
const mockProviders = [
  {
    id: "1",
    name: "Rajesh Kumar",
    service: "Plumbing & Water Solutions",
    rating: 4.8,
    reviewCount: 156,
    distance: 0.8,
    price: "₹200-500/visit",
    verified: true,
    description: "Expert plumber with 10+ years experience. Specializes in pipe repairs, bathroom fittings, and emergency services.",
    phone: "+91 98765 43210",
    responseTime: "30 mins",
  },
  {
    id: "2", 
    name: "Priya Sharma",
    service: "House Cleaning & Maintenance",
    rating: 4.9,
    reviewCount: 203,
    distance: 1.2,
    price: "₹300-600/day",
    verified: true,
    description: "Professional house cleaning services with eco-friendly products. Available for daily, weekly or monthly schedules.",
    phone: "+91 87654 32109",
    responseTime: "1 hour",
  },
  {
    id: "3",
    name: "Murugan",
    service: "Carpentry & Furniture Repair",
    rating: 4.6,
    reviewCount: 89,
    distance: 2.1,
    price: "₹400-1200/job",
    verified: false,
    description: "Skilled carpenter for furniture repair, door/window installation, and custom woodwork.",
    phone: "+91 76543 21098",
    responseTime: "2 hours",
  },
];

const ProviderList = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [providers, setProviders] = useState(mockProviders);
  const [filteredProviders, setFilteredProviders] = useState(mockProviders);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    distance: "all",
    rating: "all",
    verified: false,
  });

  const category = searchParams.get("category") || "Services";
  const city = searchParams.get("city") || "Your City";
  const pincode = searchParams.get("pincode") || "";

  useEffect(() => {
    // Apply filters
    let filtered = [...providers];
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(provider =>
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.service.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filters.distance !== "all") {
      const maxDistance = parseFloat(filters.distance);
      filtered = filtered.filter(provider => provider.distance <= maxDistance);
    }
    
    if (filters.rating !== "all") {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(provider => provider.rating >= minRating);
    }
    
    if (filters.verified) {
      filtered = filtered.filter(provider => provider.verified);
    }
    
    // Sort by distance (nearest first)
    filtered.sort((a, b) => a.distance - b.distance);
    
    setFilteredProviders(filtered);
  }, [providers, searchQuery, filters]);

  const handleContact = (provider: any, method: 'call' | 'whatsapp' | 'quote') => {
    if (method === 'call') {
      window.open(`tel:${provider.phone}`);
    } else if (method === 'whatsapp') {
      const message = `Hi ${provider.name}, I found you on ServiceConnect. I need help with ${provider.service}.`;
      window.open(`https://wa.me/${provider.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`);
    } else if (method === 'quote') {
      toast({
        title: "Quote Request",
        description: "Lead form feature will be available soon. Please call or WhatsApp for now.",
      });
    }
  };

  const clearFilters = () => {
    setFilters({
      distance: "all",
      rating: "all", 
      verified: false,
    });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground shadow-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold">{category}</h1>
              <div className="flex items-center gap-1 text-sm opacity-90">
                <MapPin className="h-3 w-3" />
                <span>{city}, {pincode}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <Input
            placeholder={`Search ${category.toLowerCase()} providers...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-input"
          />
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="mb-6 shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Distance</label>
                  <select
                    value={filters.distance}
                    onChange={(e) => setFilters(prev => ({ ...prev, distance: e.target.value }))}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="all">Any distance</option>
                    <option value="2">Within 2km</option>
                    <option value="5">Within 5km</option>
                    <option value="10">Within 10km</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="all">Any rating</option>
                    <option value="4">4+ stars</option>
                    <option value="4.5">4.5+ stars</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="verified"
                    checked={filters.verified}
                    onChange={(e) => setFilters(prev => ({ ...prev, verified: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="verified" className="text-sm font-medium">Verified only</label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''} found
            </h2>
            <p className="text-sm text-muted-foreground">Sorted by nearest distance</p>
          </div>
          
          {filteredProviders.length === 0 && providers.length > 0 && (
            <Badge variant="outline">No results - try adjusting filters</Badge>
          )}
        </div>

        {/* Provider List */}
        <div className="space-y-4">
          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onContact={handleContact}
              />
            ))
          ) : (
            <Card className="text-center py-12 shadow-card">
              <CardContent>
                <div className="text-muted-foreground mb-4">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  {providers.length === 0 ? (
                    <>
                      <h3 className="text-lg font-medium mb-2">No providers found in your area</h3>
                      <p>Be the first provider in {city} for {category.toLowerCase()}!</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-medium mb-2">No results match your search</h3>
                      <p>Try adjusting your search terms or filters</p>
                    </>
                  )}
                </div>
                <Button onClick={clearFilters} className="bg-gradient-primary">
                  {providers.length === 0 ? 'Become a Provider' : 'Clear Filters'}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderList;