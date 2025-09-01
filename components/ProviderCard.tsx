import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, MessageCircle, MapPin, Star, Shield } from "lucide-react";

interface Provider {
  id: string;
  name: string;
  service: string;
  rating: number;
  reviewCount: number;
  distance: number;
  price: string;
  verified: boolean;
  avatar?: string;
  description: string;
  phone: string;
  responseTime: string;
}

interface ProviderCardProps {
  provider: Provider;
  onContact: (provider: Provider, method: 'call' | 'whatsapp' | 'quote') => void;
}

const ProviderCard = ({ provider, onContact }: ProviderCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const formatDistance = (distance: number) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m away`;
    }
    return `${distance.toFixed(1)}km away`;
  };

  return (
    <Card className="shadow-card hover:shadow-provider transition-all border-0">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={provider.avatar} alt={provider.name} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
              {getInitials(provider.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">{provider.name}</h3>
              {provider.verified && (
                <Badge variant="secondary" className="bg-verified text-verified-foreground">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-2">{provider.service}</p>
            
            <div className="flex items-center gap-4 mb-3 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{provider.rating}</span>
                <span className="text-muted-foreground">({provider.reviewCount})</span>
              </div>
              
              <div className="flex items-center gap-1 text-distance">
                <MapPin className="h-4 w-4" />
                <span>{formatDistance(provider.distance)}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {provider.description}
            </p>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-primary">{provider.price}</p>
                <p className="text-xs text-muted-foreground">Responds in {provider.responseTime}</p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onContact(provider, 'call')}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Phone className="h-4 w-4" />
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onContact(provider, 'whatsapp')}
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
                
                <Button
                  size="sm"
                  onClick={() => onContact(provider, 'quote')}
                  className="bg-gradient-primary hover:bg-primary-dark"
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderCard;