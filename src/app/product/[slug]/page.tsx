/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronRight, MapPin, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/helper/ImageWithFallback";
import { ProductCard } from "@/components/ProductCard";
import { useRouter } from "next/navigation";
import { getProductBySlug } from "@/app/api/product/products";
import { useEffect, useState } from "react";
import { Product } from "@/app/api/product/dto/create-product.dto";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: PageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("/default-product.jpg");
  const [slug, setSlug] = useState<string>("");
  const router = useRouter();

  // Unwrap the params promise
  useEffect(() => {
    async function unwrapParams() {
      const unwrappedParams = await params;
      setSlug(unwrappedParams.slug);
    }
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    async function fetchProduct() {
      const product = await getProductBySlug(slug);
      // console.log removed

      if (!product) {
        router.push("/not-found");
        return;
      }

      setProduct(product);

      // Set the main image
      if (product?.image) {
        const imageUrl = Array.isArray(product.image)
          ? product.image[0]
          : product.image;
        // console.log removed
        setMainImage(imageUrl);

        // Test if image loads
        const img = new Image();
        img.onload = () => {};
        img.onerror = () => {
          setMainImage("/default-product.jpg");
        };
        img.src = imageUrl;
      }
    }
    fetchProduct();
  }, [slug, router]);

  // Alternative approach using React.use() (if you prefer)
  // You'll need to add "use client" and import { use } from "react"
  /*
  import { use } from "react";
  
  export default function ProductPage({ params }: PageProps) {
    const unwrappedParams = use(params);
    const slug = unwrappedParams.slug;
    // ... rest of your component
  }
  */

  const handleThumbnailClick = (imageUrl: string) => {
    setMainImage(imageUrl);
  };

  const thumbnails = [
    "https://images.unsplash.com/photo-1757332334678-e76d258c49c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNoJTIwb3JnYW5pY3xlbnwxfHx8fDE3NTk4MDgzNDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1604337214275-86010944959d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdmVnZXRhYmxlcyUyMGNvbG9yZnVsfGVufDF8fHx8MTc1OTgwODM0MXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1603403887668-a23fbcd4d8be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGJhc2tldHxlbnwxfHx8fDE3NTk4MDgzNDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  ];

  // Use actual product image for thumbnails if available
  const productThumbnails = product?.image
    ? Array.isArray(product.image)
      ? product.image
      : [product.image]
    : thumbnails;

  const relatedProducts = [
    {
      image:
        "https://images.unsplash.com/photo-1604337214275-86010944959d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdmVnZXRhYmxlcyUyMGNvbG9yZnVsfGVufDF8fHx8MTc1OTgwODM0MXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Mixed Vegetables",
      price: "$6.50/lb",
      seller: "Harvest Hills",
      distance: "3.1 mi",
    },
    {
      image:
        "https://images.unsplash.com/photo-1603403887668-a23fbcd4d8be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGJhc2tldHxlbnwxfHx8fDE3NTk4MDgzNDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Fresh Fruit Basket",
      price: "$12.99",
      seller: "Orchard Delight",
      distance: "4.5 mi",
    },
    {
      image:
        "https://images.unsplash.com/photo-1655169947079-5b2a38815147?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25leSUyMGphciUyMG5hdHVyYWx8ZW58MXx8fHwxNzU5NzYzMDI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Raw Wildflower Honey",
      price: "$8.99/jar",
      seller: "Bee Happy Farm",
      distance: "5.2 mi",
    },
  ];
  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Amazing quality tomatoes! So fresh and flavorful. Will definitely buy again.",
      date: "2 days ago",
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment:
        "Best tomatoes I've had in years. The farmer is very responsive and friendly.",
      date: "1 week ago",
    },
    {
      name: "Emily Davis",
      rating: 4,
      comment:
        "Great product, though delivery took a bit longer than expected.",
      date: "2 weeks ago",
    },
  ];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
          <button
            onClick={() => router.push("/")}
            className="hover:text-foreground"
          >
            Home
          </button>
          <ChevronRight className="w-4 h-4" />
          <button
            onClick={() => router.push("/browse")}
            className="hover:text-foreground"
          >
            Browse
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="truncate max-w-[120px] sm:max-w-xs text-muted-foreground">{product?.name}</span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-10 lg:mb-16">
          {/* Left - Images */}
          <div className="lg:col-span-2 mb-8 lg:mb-0">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden mb-4 shadow-lg">
              <ImageWithFallback
                src={mainImage}
                alt={product?.name || "Product Image"}
                className="w-full h-56 sm:h-80 md:h-[400px] lg:h-[600px] object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {productThumbnails.map((thumb, index) => (
                <div
                  key={index}
                  className="rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                  onClick={() => handleThumbnailClick(thumb)}
                >
                  <ImageWithFallback
                    src={thumb}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-20 sm:h-28 md:h-32 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right - Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-foreground mb-2">{product?.name}</h1>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-xs sm:text-sm">5 Reviews</span>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl text-primary">${product?.price}/lb</p>
            </div>

            <div className="bg-secondary/30 rounded-2xl p-3 sm:p-4">
              <p className="text-muted-foreground text-xs sm:text-sm">Available Quantity</p>
              <p className="text-foreground text-base sm:text-lg">
                {product?.quantity} lbs in stock
              </p>
            </div>

            <div>
              <h4 className="text-foreground mb-1 sm:mb-2 text-base sm:text-lg">Farm</h4>
              <p className="text-foreground text-sm sm:text-base">Green Valley Farm</p>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <MapPin className="w-4 h-4" />
                <span className="text-muted-foreground text-xs sm:text-sm">2.3 mi away</span>
              </div>
            </div>

            <div className="bg-card rounded-2xl overflow-hidden border border-border">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1564085007988-8566e9f276cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwbGFuZHNjYXBlJTIwc3Vubnl8ZW58MXx8fHwxNzU5ODA4MzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Farm location"
                className="w-full h-32 sm:h-48 object-cover"
              />
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Button className="w-full rounded-full bg-primary hover:bg-primary/90 py-4 sm:py-6 text-base sm:text-lg">
                Reserve Now
              </Button>
              <Button variant="outline" className="w-full rounded-full py-4 sm:py-6 text-base sm:text-lg">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message Seller
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm border border-border mb-10 lg:mb-16">
          <h3 className="text-foreground mb-2 sm:mb-4 text-lg sm:text-xl">Product Description</h3>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            {product?.description}
          </p>
        </div>

        {/* Reviews */}
        <div>
          <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm border border-border mb-10 lg:mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
              <h3 className="text-foreground text-lg sm:text-xl">Customer Reviews</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-foreground text-xs sm:text-base">
                  4.9 out of 5 stars from {reviews.length} reviews
                </span>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b border-border pb-4 sm:pb-6 last:border-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 sm:mb-2 gap-1 sm:gap-0">
                    <h4 className="text-foreground text-sm sm:text-base">{review.name}</h4>
                    <span className="text-muted-foreground text-xs sm:text-sm">{review.date}</span>
                  </div>
                  <div className="flex items-center mb-1 sm:mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-base">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products */}
          <div>
            <h2 className="text-foreground mb-4 sm:mb-8 text-lg sm:text-xl">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={index} product={product as any} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
