import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Hammer, Users, BookOpen, Building2, Car, Paintbrush, Zap } from "lucide-react";

const categories = [
  {
    id: "plumbing",
    name: "Plumbing",
    icon: Wrench,
    description: "Water repair, installation",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "carpentry",
    name: "Carpentry",
    icon: Hammer,
    description: "Wood work, furniture repair",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    id: "housekeeping",
    name: "House Help",
    icon: Users,
    description: "Maids, cooks, cleaners",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    id: "tutoring",
    name: "Tutoring",
    icon: BookOpen,
    description: "Home tutors, coaching",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "construction",
    name: "Construction",
    icon: Building2,
    description: "Contractors, suppliers",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: Car,
    description: "Car service, repair",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    id: "painting",
    name: "Painting",
    icon: Paintbrush,
    description: "House painting, decorating",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: Zap,
    description: "Wiring, appliance repair",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
];

interface ServiceCategoriesProps {
  onCategorySelect: (categoryId: string, categoryName: string) => void;
  location: { city: string; pincode: string } | null;
}

const ServiceCategories = ({ onCategorySelect, location }: ServiceCategoriesProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          Popular Services {location && `in ${location.city}`}
        </h2>
        <p className="text-muted-foreground">
          Choose from our wide range of verified service providers
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.id}
              className="cursor-pointer transition-all hover:shadow-provider hover:scale-105 border-0 shadow-card"
              onClick={() => onCategorySelect(category.id, category.name)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full ${category.bgColor} flex items-center justify-center`}>
                  <Icon className={`h-8 w-8 ${category.color}`} />
                </div>
                <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {location && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            📍 Showing services available in {location.city}, {location.pincode}
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceCategories;