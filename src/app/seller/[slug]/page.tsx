/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  Star,
  ShieldCheck,
  Award,
  Sparkles,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/helper/ImageWithFallback";
import { ProductCard } from "@/components/ProductCard";
import { MOCK_SELLERS, SellerProfile } from "@/data/mockSellers";
import { MOCK_PRODUCTS, EnhancedProduct } from "@/data/mockProducts";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function SellerProfilePage({ params }: PageProps) {
  const [slug, setSlug] = useState<string>("");
  const router = useRouter();
  const { addToCart, loading: cartLoading } = useCart();

  useEffect(() => {
    async function unwrapParams() {
      const unwrapped = await params;
      setSlug(unwrapped.slug);
    }
    unwrapParams();
  }, [params]);

  // Find seller profile
  const seller = useMemo<SellerProfile>(() => {
    if (!slug) return MOCK_SELLERS[0];
    const found = MOCK_SELLERS.find(
      (s) => s.slug === slug || s.id === slug
    );
    return found || MOCK_SELLERS[0];
  }, [slug]);

  // Find all products by this seller
  const sellerProducts = useMemo<EnhancedProduct[]>(() => {
    if (!seller) return [];
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.sellerId === seller.id ||
        p.sellerSlug === seller.slug ||
        (p as any).farmName === seller.name
    );
  }, [seller]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Farm profile link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Farm Banner */}
      <div className="relative h-48 sm:h-72 md:h-80 w-full overflow-hidden bg-slate-200">
        <ImageWithFallback
          src={seller.banner}
          alt={seller.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>

        {/* Back and Share buttons */}
        <div className="absolute top-4 left-4 right-4 max-w-[1440px] mx-auto flex justify-between items-center z-10">
          <button
            onClick={() => router.back()}
            className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-xs text-xs font-semibold text-slate-800 flex items-center gap-1.5 shadow-md transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-xs text-slate-800 shadow-md transition-all"
            title="Share Farm"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Farm Info Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 -mt-16 sm:-mt-20 relative z-20">
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-md border border-slate-200 mb-8 sm:mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
            {/* Avatar & Title */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-slate-100 shrink-0">
                <ImageWithFallback
                  src={seller.avatar}
                  alt={seller.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900">
                    {seller.name}
                  </h1>
                  {seller.isVerified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Producer
                    </span>
                  )}
                </div>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
                  {seller.tagline}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {seller.location} ({seller.distance} mi away)
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Est. {seller.establishedYear}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-600 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {seller.rating} ({seller.reviewsCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Farm Highlights Badges */}
            <div className="flex flex-wrap md:flex-col gap-2 w-full md:w-auto">
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Certified Organic</span>
              </div>
              <div className="bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Harvested Same-Day</span>
              </div>
            </div>
          </div>

          {/* Farm Story / Bio */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              About the Farm & Harvest Philosophy
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {seller.bio}
            </p>

            {/* Specialties */}
            {seller.specialties?.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-xs text-slate-500 font-medium">Farm Specialties:</span>
                {seller.specialties.map((spec, i) => (
                  <span
                    key={i}
                    className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-medium"
                  >
                    🌱 {spec}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Breadcrumb nav */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/browse" className="hover:text-slate-900">Browse</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-slate-900">{seller.name}</span>
        </div>

        {/* Harvest Product Catalog */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Fresh Harvest from {seller.name}
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                Browse all {sellerProducts.length} seasonal goods grown and harvested directly on this farm
              </p>
            </div>
          </div>

          {sellerProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {sellerProducts.map((p) => (
                <ProductCard
                  key={p.slug || p.id}
                  product={p as any}
                  onClick={() => router.push(`/product/${p.slug || p.id}`)}
                  onAddToCart={(prod) => addToCart(prod.id, prod)}
                  loading={cartLoading}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <p className="text-slate-500 text-sm">
                No active listings currently available for this producer. Check back soon for the next morning harvest!
              </p>
              <Link
                href="/browse"
                className="mt-4 inline-flex items-center text-xs font-bold text-primary hover:underline"
              >
                Browse other local farms ➔
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

