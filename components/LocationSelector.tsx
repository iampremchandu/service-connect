import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LocationSelectorProps {
  onLocationSelect: (location: { city: string; pincode: string; lat?: number; lng?: number }) => void;
  currentLocation: { city: string; pincode: string } | null;
}

const LocationSelector = ({ onLocationSelect, currentLocation }: LocationSelectorProps) => {
  const [city, setCity] = useState(currentLocation?.city || "");
  const [pincode, setPincode] = useState(currentLocation?.pincode || "");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Please enter your city and PIN code manually.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // In a real app, you'd use a geocoding API here
          // For now, we'll simulate with default values
          const mockLocation = {
            city: "Bangalore",
            pincode: "560001",
            lat: latitude,
            lng: longitude,
          };
          
          setCity(mockLocation.city);
          setPincode(mockLocation.pincode);
          onLocationSelect(mockLocation);
          
          toast({
            title: "Location detected",
            description: `Found you in ${mockLocation.city}`,
          });
        } catch (error) {
          toast({
            title: "Location detection failed",
            description: "Please enter your location manually.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        setIsLoading(false);
        toast({
          title: "Location access denied",
          description: "Please enter your city and PIN code manually.",
          variant: "destructive",
        });
      }
    );
  };

  const handleManualSubmit = () => {
    if (!city.trim() || !pincode.trim()) {
      toast({
        title: "Required fields",
        description: "Please enter both city and PIN code.",
        variant: "destructive",
      });
      return;
    }

    onLocationSelect({ city: city.trim(), pincode: pincode.trim() });
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-4">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-location mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Find Services Near You</h3>
          <p className="text-muted-foreground text-sm">
            Let us know your location to show nearby service providers
          </p>
        </div>

        <Button
          onClick={detectLocation}
          disabled={isLoading}
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Navigation className="h-4 w-4 mr-2" />
          {isLoading ? "Detecting..." : "Use Current Location"}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or enter manually</span>
          </div>
        </div>

        <div className="space-y-3">
          <Input
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border-input"
          />
          <Input
            placeholder="Enter your PIN code"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            pattern="[0-9]{6}"
            maxLength={6}
            className="border-input"
          />
          <Button
            onClick={handleManualSubmit}
            className="w-full bg-gradient-primary hover:bg-primary-dark"
          >
            Continue
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LocationSelector;