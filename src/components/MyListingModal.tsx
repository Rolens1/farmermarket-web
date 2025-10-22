/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
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
import { ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { createProduct, updateProduct } from "@/app/api/product/products";
import { CreateProductDTO } from "@/app/api/product/dto/create-product.dto";
import { ImageUpload } from "./ImageUpload"; // Import the ImageUpload component
import { useAuth } from "@/context/AuthContext"; // Import auth context

interface Listing {
  id?: number;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  status: string;
  images?: string[];
}

interface MyListingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing?: Listing | null;
  onSave: (listing: Listing) => void;
  editing?: boolean;
}

export function MyListingDialog({
  open,
  onOpenChange,
  listing,
  onSave,
}: MyListingDialogProps) {
  const isEditing = !!listing;
  const { user } = useAuth(); // Get user for image upload

  const [formData, setFormData] = useState<Listing>({
    name: listing?.name || "",
    description: listing?.description || "",
    category: listing?.category || "",
    price: listing?.price || 0,
    unit: listing?.unit || "lb",
    stock: listing?.stock || 0,
    status: listing?.status || "active",
    images: listing?.images || [],
  });

  const [imageUrl, setImageUrl] = useState<string[] | null>(
    listing?.images || null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (listing) {
      setFormData({
        name: listing.name || "",
        description: listing.description || "",
        category: listing.category || "",
        price: listing.price || 0,
        unit: listing.unit || "lb",
        stock: listing.stock || 0,
        status: listing.status || "active",
        images: listing.images || [],
      });
      setImageUrl(listing.images || null);
    } else {
      setFormData({
        name: "",
        description: "",
        category: "",
        price: 0,
        unit: "lb",
        stock: 0,
        status: "active",
        images: [],
      });
      setImageUrl(null);
    }
  }, [listing]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageChange = (url: string | null) => {
    // console.log removed
    setImageUrl([url] as string[] | null);

    // Update formData images array
    setFormData((prev) => ({
      ...prev,
      images: url ? [url] : [],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }

    if (formData.stock < 0) {
      newErrors.stock = "Stock quantity is required";
    } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = "Please enter a valid quantity";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      setIsSubmitting(false);
      return;
    }

    try {
      // console.log removed

      // Prepare DTO for backend
      const createProductDto: CreateProductDTO = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        quantity: Number(formData.stock),
        image: imageUrl || undefined, // Use the imageUrl state directly
      };

      // console.log removed

      let result;
      if (isEditing) {
        result = await updateProduct(
          listing.id as unknown as string,
          createProductDto
        );
      } else {
        result = await createProduct(createProductDto);
      }

      // console.log removed

      // Update local state with the saved listing
      const savedListing: Listing = {
        ...formData,
        id: listing?.id || Date.now(), // Use actual ID from backend if available
        images: imageUrl ? imageUrl : [],
      };

      onSave(savedListing);

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
        price: 0,
        unit: "lb",
        stock: 0,
        status: "active",
        images: [],
      });
      setImageUrl(null);
      setErrors({});
    } catch (error: any) {
      // console.error removed
      toast.error(error.message || "Failed to save listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    setErrors({});
  };

  // console.log removed

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white p-2 sm:p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-slate-900 text-lg sm:text-2xl">
            {isEditing ? "Edit Listing" : "Create New Listing"}
          </DialogTitle>
          <DialogDescription className="text-slate-600 text-xs sm:text-base">
            {isEditing
              ? "Update your product details below"
              : "Add a new product to your farm inventory"}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6 py-2 sm:py-4"
        >
          {/* Product Name */}
          <div className="space-y-1 sm:space-y-2">
            <Label
              htmlFor="title"
              className="text-slate-700 text-xs sm:text-base"
            >
              Product Name *
            </Label>
            <Input
              id="title"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g., Organic Tomatoes"
              className={`border-slate-200 ${
                errors.name ? "border-red-500" : ""
              } text-xs sm:text-base`}
            />
            {errors.name && (
              <p className="text-red-600 text-xs sm:text-sm">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1 sm:space-y-2">
            <Label
              htmlFor="description"
              className="text-slate-700 text-xs sm:text-base"
            >
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe your product, growing methods, harvest date, etc."
              rows={4}
              className="border-slate-200 resize-none text-xs sm:text-base"
            />
          </div>

          {/* Category */}
          <div className="space-y-1 sm:space-y-2">
            <Label
              htmlFor="category"
              className="text-slate-700 text-xs sm:text-base"
            >
              Category *
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleChange("category", value)}
            >
              <SelectTrigger
                className={`border-slate-200 ${
                  errors.category ? "border-red-500" : ""
                } text-xs sm:text-base`}
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
              <p className="text-red-600 text-xs sm:text-sm">
                {errors.category}
              </p>
            )}
          </div>

          {/* Price and Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <div className="space-y-1 sm:space-y-2">
              <Label
                htmlFor="price"
                className="text-slate-700 text-xs sm:text-base"
              >
                Price *
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs sm:text-base">
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
                  } text-xs sm:text-base`}
                />
              </div>
              {errors.price && (
                <p className="text-red-600 text-xs sm:text-sm">
                  {errors.price}
                </p>
              )}
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label
                htmlFor="unit"
                className="text-slate-700 text-xs sm:text-base"
              >
                Unit
              </Label>
              <Select
                value={formData.unit}
                onValueChange={(value) => handleChange("unit", value)}
              >
                <SelectTrigger className="border-slate-200 text-xs sm:text-base">
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
          <div className="space-y-1 sm:space-y-2">
            <Label
              htmlFor="stock"
              className="text-slate-700 text-xs sm:text-base"
            >
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
              } text-xs sm:text-base`}
            />
            {errors.stock && (
              <p className="text-red-600 text-xs sm:text-sm">{errors.stock}</p>
            )}
            <p className="text-slate-500 text-xs sm:text-sm">
              Enter quantity in the unit selected above
            </p>
          </div>

          {/* Status */}
          <div className="space-y-1 sm:space-y-2">
            <Label
              htmlFor="status"
              className="text-slate-700 text-xs sm:text-base"
            >
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger className="border-slate-200 text-xs sm:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="space-y-1 sm:space-y-2">
            <Label className="text-slate-700 text-xs sm:text-base">
              Product Image
            </Label>
            {user ? (
              <ImageUpload
                onImageChange={handleImageChange}
                existingImage={imageUrl?.[0] || undefined}
                userId={user.id}
              />
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 sm:p-8 text-center">
                <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 mx-auto mb-2 sm:mb-3" />
                <p className="text-slate-600 mb-1 text-xs sm:text-base">
                  Please log in to upload images
                </p>
              </div>
            )}
            {imageUrl && (
              <p className="text-xs text-slate-500 break-all">
                Image URL: {imageUrl}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 flex-col sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-slate-200 text-slate-700 hover:bg-slate-50 w-full sm:w-auto text-xs sm:text-base"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto text-xs sm:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Update Listing"
                : "Create Listing"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
