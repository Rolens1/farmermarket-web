/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronRight, MapPin, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/helper/ImageWithFallback";
import { ProductCard } from "@/components/ProductCard";
import { useRouter } from "next/navigation";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { getProductBySlug, getProducts } from "@/app/api/product/products";
import { useEffect, useState } from "react";
import { Product } from "@/app/api/product/dto/create-product.dto";

// async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const product = await getProductBySlug(params.slug);

//   if (!product) {
//     return {
//       title: "Product Not Found",
//     };
//   }

//   return {
//     title: `${product.name} | Farmers Market`,
//     description: product.description,
//     openGraph: {
//       title: product.name,
//       description: product.description,
//       images: [product.image || "/default-product.jpg"],
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: product.name,
//       description: product.description,
//       images: [product.image || "/default-product.jpg"],
//     },
//     keywords: [
//       product.category,
//       "farmers market",
//       "local produce",
//       product.name,
//     ],
//   };
// }
// async function generateStaticParams() {
//   const products = await getProducts(); // Your API call to get all products

//   return products.map((product: any) => ({
//     slug: product.slug,
//   }));
// }

export default function ProductPage({ params }: any) {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      const product = await getProductBySlug(params.slug);

      console.log("Fetched product:", product);
      // Fetch product data here if needed
      if (!product) {
        router.push("/not-found");
      }
      setProduct(product);
    }

    fetchProduct();
  }, []);

  const handleProductClick = (productId: string) => {
    console.log(params.slug);
    // router.push(`/product/${productId}`);
  };

  const thumbnails = [
    "https://images.unsplash.com/photo-1757332334678-e76d258c49c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNoJTIwb3JnYW5pY3xlbnwxfHx8fDE3NTk4MDgzNDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1604337214275-86010944959d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdmVnZXRhYmxlcyUyMGNvbG9yZnVsfGVufDF8fHx8MTc1OTgwODM0MXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1603403887668-a23fbcd4d8be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGJhc2tldHxlbnwxfHx8fDE3NTk4MDgzNDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  ];
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

  return (
    <div className="min-h-screen">
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-muted-foreground mb-8">
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
          <span className="text-muted-foreground">{product?.name}</span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-12 mb-16">
          {/* Left - Images */}
          <div className="col-span-2">
            <div className="rounded-3xl overflow-hidden mb-4 shadow-lg">
              <ImageWithFallback
                src={product?.image || "/default-product.jpg"}
                alt={product?.name || "Product Image"}
                className="w-full h-[600px] object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {thumbnails.map((thumb, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                >
                  <ImageWithFallback
                    src={thumb}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Right - Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl text-foreground mb-2">{product?.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">5 Reviews</span>
              </div>
              <p className="text-3xl text-primary">${product?.price}/lb</p>
            </div>

            <div className="bg-secondary/30 rounded-2xl p-4">
              <p className="text-muted-foreground">Available Quantity</p>
              <p className="text-foreground">
                {product?.quantity} lbs in stock
              </p>
            </div>

            <div>
              <h4 className="text-foreground mb-2">Farm</h4>
              <p className="text-foreground">Green Valley Farm</p>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <MapPin className="w-4 h-4" />
                <span className="text-muted-foreground">2.3 mi away</span>
              </div>
            </div>

            <div className="bg-card rounded-2xl overflow-hidden border border-border">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1564085007988-8566e9f276cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwbGFuZHNjYXBlJTIwc3Vubnl8ZW58MXx8fHwxNzU5ODA4MzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Farm location"
                className="w-full h-48 object-cover"
              />
            </div>

            <div className="space-y-3">
              <Button className="w-full rounded-full bg-primary hover:bg-primary/90 py-6">
                Reserve Now
              </Button>
              <Button variant="outline" className="w-full rounded-full py-6">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message Seller
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card rounded-3xl p-8 shadow-sm border border-border mb-16">
          <h3 className="text-foreground mb-4">Product Description</h3>
          <p className="text-muted-foreground leading-relaxed">
            {product?.description}
          </p>
        </div>

        {/* Reviews */}
        <div>
          <div className="bg-card rounded-3xl p-8 shadow-sm border border-border mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-foreground">Customer Reviews</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-foreground">
                  4.9 out of 5 stars from {reviews.length} reviews
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b border-border pb-6 last:border-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-foreground">{review.name}</h4>
                    <span className="text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products */}
          <div>
            <h2 className="text-foreground mb-8">Related Products</h2>
            <div className="grid grid-cols-3 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  onClick={() => handleProductClick(product.name)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
