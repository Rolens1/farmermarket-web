import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Upload, X, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { createProduct } from "@/app/api/product/products";
import { CreateProductDTO } from "@/app/api/product/dto/create-product.dto";

interface Listing {
  id?: number;
  name: string;
  description?: string;
  category: string;
  price: string;
  unit: string;
  stock: string;
  status: string;
  images?: string[];
}

interface MyListingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing?: Listing | null;
  onSave: (listing: Listing) => void;
}

export function MyListingDialog({
  open,
  onOpenChange,
  listing,
  onSave,
}: MyListingDialogProps) {
  const isEditing = !!listing;

  const [formData, setFormData] = useState<Listing>({
    name: listing?.name || "",
    description: listing?.description || "",
    category: listing?.category || "",
    price: listing?.price || "",
    unit: listing?.unit || "lb",
    stock: listing?.stock || "",
    status: listing?.status || "active",
    images: listing?.images || [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }

    if (!formData.stock.trim()) {
      newErrors.stock = "Stock quantity is required";
    } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = "Please enter a valid quantity";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    // Prepare DTO for backend
    const createProductDto = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      price: Number(formData.price),
      quantity: Number(formData.stock),
      image:
        formData.images && formData.images.length > 0
          ? formData.images[0]
          : undefined,
    };

    onSave({
      ...formData,
      id: listing?.id,
    });

    createProduct(createProductDto as CreateProductDTO);

    toast.success(
      isEditing
        ? "Listing updated successfully!"
        : "Listing created successfully!"
    );

    onOpenChange(false);

    // Reset form
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      unit: "lb",
      stock: "",
      status: "active",
      images: [],
    });
    setErrors({});
  };

  const handleCancel = () => {
    onOpenChange(false);
    setErrors({});
  };

  console.log("MyListingDialog open state:", open); // Debug log

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-slate-900">
            {isEditing ? "Edit Listing" : "Create New Listing"}
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            {isEditing
              ? "Update your product details below"
              : "Add a new product to your farm inventory"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-700">
              Product Name *
            </Label>
            <Input
              id="title"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g., Organic Tomatoes"
              className={`border-slate-200 ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe your product, growing methods, harvest date, etc."
              rows={4}
              className="border-slate-200 resize-none"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-slate-700">
              Category *
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleChange("category", value)}
            >
              <SelectTrigger
                className={`border-slate-200 ${
                  errors.category ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="dairy">Dairy & Eggs</SelectItem>
                <SelectItem value="meat">Meat & Poultry</SelectItem>
                <SelectItem value="grains">Grains & Beans</SelectItem>
                <SelectItem value="herbs">Herbs & Spices</SelectItem>
                <SelectItem value="honey">Honey & Preserves</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-600 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Price and Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-slate-700">
                Price *
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  placeholder="0.00"
                  className={`pl-7 border-slate-200 ${
                    errors.price ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.price && (
                <p className="text-red-600 text-sm">{errors.price}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit" className="text-slate-700">
                Unit
              </Label>
              <Select
                value={formData.unit}
                onValueChange={(value) => handleChange("unit", value)}
              >
                <SelectTrigger className="border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lb">per lb</SelectItem>
                  <SelectItem value="kg">per kg</SelectItem>
                  <SelectItem value="dozen">per dozen</SelectItem>
                  <SelectItem value="piece">per piece</SelectItem>
                  <SelectItem value="bunch">per bunch</SelectItem>
                  <SelectItem value="jar">per jar</SelectItem>
                  <SelectItem value="bottle">per bottle</SelectItem>
                  <SelectItem value="bag">per bag</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <Label htmlFor="stock" className="text-slate-700">
              Available Stock *
            </Label>
            <Input
              id="stock"
              type="number"
              step="0.1"
              value={formData.stock}
              onChange={(e) => handleChange("stock", e.target.value)}
              placeholder="e.g., 50"
              className={`border-slate-200 ${
                errors.stock ? "border-red-500" : ""
              }`}
            />
            {errors.stock && (
              <p className="text-red-600 text-sm">{errors.stock}</p>
            )}
            <p className="text-slate-500 text-sm">
              Enter quantity in the unit selected above
            </p>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status" className="text-slate-700">
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger className="border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload Placeholder */}
          <div className="space-y-2">
            <Label className="text-slate-700">Product Images</Label>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:border-slate-300 transition-colors cursor-pointer">
              <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-slate-400 text-sm">
                PNG, JPG or WEBP (max. 5MB)
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isEditing ? "Update Listing" : "Create Listing"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
