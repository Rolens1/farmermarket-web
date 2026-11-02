/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ChevronRight,
  MapPin,
  Star,
  Minus,
  Plus,
  ShoppingBag,
  CheckCircle2,
  Heart,
  MessageSquarePlus,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/helper/ImageWithFallback";
import { ProductCard } from "@/components/ProductCard";
import { useRouter } from "next/navigation";
import { getProductBySlug } from "@/app/api/product/products";
import { useEffect, useState, useMemo } from "react";
import { Product } from "@/app/api/product/dto/create-product.dto";
import { useCart } from "@/context/CartContext";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { toast } from "sonner";
import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: PageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("/default-product.jpg");
  const [slug, setSlug] = useState<string>("");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);
  const router = useRouter();
  const { addToCart, loading: cartLoading } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Review submission state
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [newReviewer, setNewReviewer] = useState("Jane Doe");
  const [newComment, setNewComment] = useState("");

  const [reviewsList, setReviewsList] = useState([
    {
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Amazing quality! So fresh, vibrant and fragrant. Will definitely buy from this farm again.",
      date: "2 days ago",
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment:
        "Best local harvest I've had in years. The farm producer is very friendly and passionate.",
      date: "1 week ago",
    },
    {
      name: "Emily Davis",
      rating: 4,
      comment:
        "Great natural flavour and eco-friendly paper packaging. Very happy with my harvest box.",
      date: "2 weeks ago",
    },
  ]);

  const handleAddToCart = async () => {
    if (!product) return;
    const targetId = product.slug || String(product.id);
    await addToCart(targetId, product, selectedQuantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
    toast.success(`Added ${selectedQuantity} ${product.name} to cart!`);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error("Please enter a short comment for your review.");
      return;
    }

    const reviewObj = {
      name: newReviewer.trim() || "Verified Buyer",
      rating: newRating,
      comment: newComment.trim(),
      date: "Just now",
    };

    setReviewsList((prev) => [reviewObj, ...prev]);
    setNewComment("");
    setWriteReviewOpen(false);
    toast.success("Review submitted! Thank you for supporting our local farm.");
  };

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
        setMainImage(imageUrl);

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

  const handleThumbnailClick = (imageUrl: string) => {
    setMainImage(imageUrl);
  };

  const thumbnails = [
    "https://images.unsplash.com/photo-1757332334678-e76d258c49c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNoJTIwb3JnYW5pY3xlbnwxfHx8fDE3NTk4MDgzNDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1604337214275-86010944959d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdmVnZXRhYmxlcyUyMGNvbG9yZnVsfGVufDF8fHx8MTc1OTgwODM0MXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1603403887668-a23fbcd4d8be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGJhc2tldHxlbnwxfHx8fDE3NTk4MDgzNDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  ];

  const productThumbnails = product?.image
    ? Array.isArray(product.image)
      ? product.image
      : [product.image]
    : thumbnails;

  const relatedProducts = useMemo(() => {
    const list = MOCK_PRODUCTS.filter(
      (p) =>
        p.slug !== slug &&
        String(p.id) !== slug &&
        (!product?.category ||
          (p.category ?? "").toLowerCase() ===
            (product.category ?? "").toLowerCase())
    );
    if (list.length >= 3) return list.slice(0, 3);
    const otherProducts = MOCK_PRODUCTS.filter(
      (p) => p.slug !== slug && !list.some((l) => l.slug === p.slug)
    );
    return [...list, ...otherProducts].slice(0, 3);
  }, [product, slug]);

  const sellerOtherProducts = useMemo(() => {
    if (!product) return [];
    const sellerId = (product as any).sellerId;
    if (!sellerId) return [];
    return MOCK_PRODUCTS.filter(
      (p) => p.sellerId === sellerId && p.slug !== slug && String(p.id) !== slug
    ).slice(0, 3);
  }, [product, slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-muted-foreground text-sm">Loading harvest produce...</p>
        </div>
      </div>
    );
  }

  const isFav = isFavorite(product.id || product.slug);
  const sellerSlug = (product as any)?.sellerSlug || "ferme-maraichere-st-laurent";
  const tags: string[] = (product as any)?.tags || ["Certified Organic", "Locally Grown", "Pesticide-Free"];

  return (
    <div className="min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
          <button
            onClick={() => router.push("/")}
            className="hover:text-foreground transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-4 h-4" />
          <button
            onClick={() => router.push("/browse")}
            className="hover:text-foreground transition-colors"
          >
            Browse
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="truncate max-w-[140px] sm:max-w-xs text-foreground font-medium">
            {product?.name}
          </span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-10 lg:mb-16">
          {/* Left - Images */}
          <div className="lg:col-span-2 mb-8 lg:mb-0">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden mb-4 shadow-lg border border-border">
              <ImageWithFallback
                src={mainImage}
                alt={product?.name || "Product Image"}
                className="w-full h-56 sm:h-80 md:h-[400px] lg:h-[600px] object-cover"
              />
            </div>

            {/* Thumbnail Slider */}
            {productThumbnails.length > 1 && (
              <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2">
                {productThumbnails.map((thumb, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(thumb)}
                    className={`rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      mainImage === thumb
                        ? "border-primary shadow-sm scale-102"
                        : "border-transparent opacity-75 hover:opacity-100"
                    }`}
                  >
                    <ImageWithFallback
                      src={thumb}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-foreground font-bold leading-tight">
                  {product?.name}
                </h1>
                {/* 1-Click Wishlist Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id || product.slug, product.name)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${
                    isFav
                      ? "bg-rose-50 text-rose-600 ring-2 ring-rose-300 shadow-md scale-105"
                      : "bg-secondary/40 text-muted-foreground hover:text-rose-500 hover:bg-rose-50"
                  }`}
                  title={isFav ? "Remove from favorites" : "Save to favorites"}
                  aria-label="Wishlist Favorite"
                >
                  <Heart
                    className={`w-5 h-5 transition-transform ${
                      isFav ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Dietary & Farming Badges */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Reviews Summary */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-xs sm:text-sm">
                  {reviewsList.length} Verified Reviews
                </span>
              </div>

              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">
                ${product?.price}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  /{ (product as any)?.unit || "lb" }
                </span>
              </p>
            </div>

            <div className="bg-secondary/30 rounded-2xl p-3 sm:p-4 border border-border">
              <p className="text-muted-foreground text-xs sm:text-sm">Available Harvest Quantity</p>
              <p className="text-foreground text-base sm:text-lg font-bold">
                {product?.quantity} { (product as any)?.unit || "lbs" } in stock
              </p>
            </div>

            {/* Farm & Producer Card with Link */}
            <div className="p-4 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                  Farm & Producer
                </h4>
                <Link
                  href={`/seller/${sellerSlug}`}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  View Farm Profile ➔
                </Link>
              </div>
              <p className="text-foreground text-base sm:text-lg font-bold">
                <Link href={`/seller/${sellerSlug}`} className="hover:text-primary transition-colors">
                  {(product as any)?.farmName || (product as any)?.sellerName || "Local Verified Farm"}
                </Link>
              </p>
              <div className="flex items-center gap-1 text-muted-foreground mt-1 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>
                  {(product as any)?.distance ? `${(product as any).distance} mi away` : "Nearby Farmstead"} • Direct Producer
                </span>
              </div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between gap-4 bg-secondary/30 rounded-2xl p-3 border border-border">
                <span className="text-sm font-medium text-foreground">Quantity</span>
                <div className="flex items-center gap-2 bg-background rounded-full border border-border px-2 py-1 shadow-sm">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-foreground hover:bg-secondary"
                    onClick={() =>
                      setSelectedQuantity((prev) => Math.max(1, prev - 1))
                    }
                    disabled={selectedQuantity <= 1 || cartLoading}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-10 text-center font-semibold text-foreground text-sm">
                    {selectedQuantity}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-foreground hover:bg-secondary"
                    onClick={() =>
                      setSelectedQuantity((prev) =>
                        Math.min(product?.quantity || 99, prev + 1)
                      )
                    }
                    disabled={
                      selectedQuantity >= (product?.quantity || 99) ||
                      cartLoading
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={cartLoading || (product?.quantity ?? 0) <= 0}
                className={`w-full rounded-full py-5 sm:py-6 text-base sm:text-lg font-semibold shadow-md flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${
                  justAdded
                    ? "bg-emerald-700 hover:bg-emerald-800 text-white scale-[1.02] ring-2 ring-emerald-300/60"
                    : "bg-primary hover:bg-primary/90 text-white"
                }`}
              >
                {justAdded ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                    <span>Added to Cart!</span>
                  </>
                ) : cartLoading ? (
                  "Adding to Cart..."
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>
                      Add to Cart • $
                      {(
                        Number(product?.price || 0) * selectedQuantity
                      ).toFixed(2)}
                    </span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm border border-border mb-10 lg:mb-16">
          <h3 className="text-foreground mb-2 sm:mb-4 text-lg sm:text-xl font-bold">
            Product Description
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            {product?.description}
          </p>
        </div>

        {/* Customer Reviews & Write a Review */}
        <div>
          <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm border border-border mb-10 lg:mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 pb-4 border-b border-border">
              <div>
                <h3 className="text-foreground text-lg sm:text-xl font-bold">
                  Customer Reviews
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    4.9 out of 5 stars ({reviewsList.length} reviews)
                  </span>
                </div>
              </div>

              {/* Write a Review Button */}
              <Button
                onClick={() => setWriteReviewOpen(true)}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 rounded-full flex items-center gap-1.5 text-xs sm:text-sm"
              >
                <MessageSquarePlus className="w-4 h-4" />
                Write a Review
              </Button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {reviewsList.map((review, index) => (
                <div
                  key={index}
                  className="border-b border-border pb-4 sm:pb-6 last:border-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 sm:mb-2 gap-1 sm:gap-0">
                    <h4 className="text-foreground text-sm sm:text-base font-semibold flex items-center gap-1.5">
                      {review.name}
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded-full border border-emerald-200 font-normal">
                        Verified Purchase
                      </span>
                    </h4>
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      {review.date}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-base leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* More from this Farm */}
          {sellerOtherProducts.length > 0 && (
            <div className="mb-10 lg:mb-16">
              <div className="mb-4 sm:mb-6 flex justify-between items-end">
                <div>
                  <h2 className="text-foreground text-lg sm:text-xl font-bold">
                    More from {(product as any)?.farmName || "this Producer"}
                  </h2>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">
                    Fresh natural items grown & prepared by the same farm
                  </p>
                </div>
                <Link
                  href={`/seller/${sellerSlug}`}
                  className="text-xs sm:text-sm font-semibold text-primary hover:underline"
                >
                  See all producer goods ➔
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {sellerOtherProducts.map((p) => (
                  <ProductCard
                    key={p.slug || p.id}
                    product={p as any}
                    onClick={() =>
                      router.push(`/product/${p.slug || p.id}`)
                    }
                    onAddToCart={(prod) => addToCart(prod.id, prod)}
                    loading={cartLoading}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          <div>
            <div className="mb-4 sm:mb-6">
              <h2 className="text-foreground text-lg sm:text-xl font-bold">
                Related Fresh Produce
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">
                Similar harvest items in the same category
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.slug || p.id}
                  product={p as any}
                  onClick={() =>
                    router.push(`/product/${p.slug || p.id}`)
                  }
                  onAddToCart={(prod) => addToCart(prod.id, prod)}
                  loading={cartLoading}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Write a Review Modal */}
      {writeReviewOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 text-lg">
                Write a Product Review
              </h3>
              <button
                onClick={() => setWriteReviewOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-5">
              Share your thoughts on <span className="font-semibold text-slate-700">{product.name}</span> with other local food lovers.
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Overall Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewRating(star)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          (hoverRating || newRating) >= star
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    {hoverRating || newRating} / 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={newReviewer}
                  onChange={(e) => setNewReviewer(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  placeholder="e.g. Marie Tremblay"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Review
                </label>
                <textarea
                  required
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
                  placeholder="How was the freshness, taste, and packaging?"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setWriteReviewOpen(false)}
                  className="rounded-full text-xs text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full text-xs font-semibold px-5"
                >
                  Submit Review
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
