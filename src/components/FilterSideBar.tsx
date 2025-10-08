import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";

export function FilterSidebar() {
  const categories = [
    "Vegetables",
    "Fruits",
    "Dairy",
    "Meat",
    "Honey",
    "Flowers",
  ];

  return (
    <div className="bg-card rounded-3xl p-6 shadow-sm border border-border sticky top-24">
      <h3 className="text-foreground mb-6">Filters</h3>

      {/* Categories */}
      <div className="mb-8">
        <h4 className="text-foreground mb-4">Category</h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={category} />
              <Label
                htmlFor={category}
                className="text-foreground cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="text-foreground mb-4">Price Range</h4>
        <Slider defaultValue={[0, 100]} max={100} step={1} className="mb-2" />
        <div className="flex justify-between text-muted-foreground">
          <span>$0</span>
          <span>$100+</span>
        </div>
      </div>

      {/* Distance */}
      <div className="mb-8">
        <h4 className="text-foreground mb-4">Distance (miles)</h4>
        <Slider defaultValue={[10]} max={50} step={1} className="mb-2" />
        <div className="text-muted-foreground">Within 10 miles</div>
      </div>

      {/* Delivery Options */}
      <div className="mb-8">
        <h4 className="text-foreground mb-4">Delivery Options</h4>
        <div className="flex items-center justify-between mb-3">
          <Label htmlFor="pickup">Pickup Available</Label>
          <Switch id="pickup" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="delivery">Delivery Available</Label>
          <Switch id="delivery" />
        </div>
      </div>

      {/* Reset Button */}
      <Button variant="outline" className="w-full rounded-full">
        Reset Filters
      </Button>
    </div>
  );
}
