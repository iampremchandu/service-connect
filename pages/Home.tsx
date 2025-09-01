import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LocationSelector from "@/components/LocationSelector";
import ServiceCategories from "@/components/ServiceCategories";
import { Search, Menu } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState<{ city: string; pincode: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLocationSelector, setShowLocationSelector] = useState(true);

  const handleLocationSelect = (selectedLocation: { city: string; pincode: string; lat?: number; lng?: number }) => {
    setLocation(selectedLocation);
    setShowLocationSelector(false);
  };

  const handleCategorySelect = (categoryId: string, categoryName: string) => {
    navigate(`/providers/${categoryId}?category=${encodeURIComponent(categoryName)}&city=${location?.city}&pincode=${location?.pincode}`);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery)}&city=${location?.city}&pincode=${location?.pincode}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white shadow-floating">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">ServiceConnect</h1>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div 
          className="relative bg-cover bg-center py-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Find Trusted Service Providers
              <br />
              <span className="text-2xl md:text-3xl font-normal">Near You in India</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 drop-shadow">
              Connect with verified plumbers, carpenters, maids, tutors and more in your area
            </p>
            
            {location && (
              <div className="max-w-md mx-auto">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search for services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="bg-white/95 border-0 text-foreground placeholder:text-muted-foreground"
                  />
                  <Button 
                    onClick={handleSearch}
                    className="bg-white text-primary hover:bg-white/90 shadow-lg"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {showLocationSelector ? (
          <div className="max-w-md mx-auto">
            <LocationSelector
              onLocationSelect={handleLocationSelect}
              currentLocation={location}
            />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Location Display & Change */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Service area:</span>
                <span className="font-medium">{location?.city}, {location?.pincode}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLocationSelector(true)}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Change Location
              </Button>
            </div>

            {/* Service Categories */}
            <ServiceCategories
              onCategorySelect={handleCategorySelect}
              location={location}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Popular Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Plumbers near me</li>
                <li>House cleaning</li>
                <li>Carpentry work</li>
                <li>Home tutors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Top Cities</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Bangalore</li>
                <li>Mumbai</li>
                <li>Delhi</li>
                <li>Chennai</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Providers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>List your service</li>
                <li>Get verified</li>
                <li>Provider dashboard</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help center</li>
                <li>Contact us</li>
                <li>Terms of service</li>
                <li>Privacy policy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 ServiceConnect India. Payments are handled directly between customer and provider. 
              Platform is not liable for service quality or payment disputes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;