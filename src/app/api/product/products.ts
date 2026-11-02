import { get, securedGet, securedPost } from "../fetch.api";
import { CreateProductDTO } from "./dto/create-product.dto";
import { ProductSearchParamsInterface } from "./dto/product-search.dto";
import {
  MOCK_PRODUCTS,
  mergeWithMockCatalog,
  filterMockProducts,
  EnhancedProduct,
} from "@/data/mockProducts";
import { resolveLocation, calculateDistanceMiles } from "@/utils/location";

export interface SearchProductsResponse {
  products: EnhancedProduct[];
  totalCount: number;
  isEurope?: boolean;
  locationName?: string;
}

export const getProducts = async (locationQuery?: string): Promise<EnhancedProduct[]> => {
  const loc = resolveLocation(locationQuery);
  if (loc.isEurope) {
    return [];
  }
  const userCoord =
    loc.lat !== undefined && loc.lng !== undefined
      ? { lat: loc.lat, lng: loc.lng }
      : { lat: 45.5017, lng: -73.5673 };

  try {
    const dbRes = await get("/products");
    const dbProducts = Array.isArray(dbRes) ? dbRes : [];
    return mergeWithMockCatalog(dbProducts, userCoord);
  } catch (error) {
    console.warn("Falling back to local mock catalog:", error);
    return mergeWithMockCatalog([], userCoord);
  }
};

export const createProduct = async (productData: CreateProductDTO) => {
  const res = await securedPost("/products/create", productData);

  if (!res.ok) {
    throw new Error("Failed to create product");
  }
};

export const getUserProducts = async () => {
  return await securedGet(`/products/user`);
};

export const updateProduct = async (
  productId: string,
  productData: Partial<CreateProductDTO>
) => {
  return await securedPost(`/products/update/${productId}`, productData);
};

export const deleteProduct = async (productId: string) => {
  return await securedPost(`/products/delete/${productId}`, {});
};

export const getProductById = async (productId: string) => {
  try {
    const res = await get(`/products/i/${productId}`);
    if (res && !res.statusCode) {
      return res;
    }
  } catch {
    // Fall back to mock
  }
  return MOCK_PRODUCTS.find((p) => String(p.id) === String(productId)) || null;
};

export const getProductBySlug = async (slug: string) => {
  try {
    const res = await get(`/products/slug/${slug}`);
    if (res && !res.statusCode && res.name) {
      return res;
    }
  } catch {
    // Fall back to mock
  }
  const cleanSlug = slug.toLowerCase();
  return (
    MOCK_PRODUCTS.find(
      (p) =>
        (p.slug && p.slug.toLowerCase() === cleanSlug) ||
        String(p.id) === cleanSlug
    ) || null
  );
};

export const searchProducts = async (
  params: ProductSearchParamsInterface
): Promise<SearchProductsResponse> => {
  // Check location query or general query for location resolution
  const locationParam = params.location || (params.query && resolveLocation(params.query).query !== "" ? params.query : undefined);
  const loc = resolveLocation(locationParam || params.location);

  // If a location in Europe was searched, return zero products and European flag
  if (loc.isEurope) {
    return {
      products: [],
      totalCount: 0,
      isEurope: true,
      locationName: loc.locationName,
    };
  }

  const userCoord =
    params.lat !== undefined && params.lng !== undefined
      ? { lat: params.lat, lng: params.lng }
      : loc.lat !== undefined && loc.lng !== undefined
      ? { lat: loc.lat, lng: loc.lng }
      : { lat: 45.5017, lng: -73.5673 }; // Montreal default

  let dbProducts: EnhancedProduct[] = [];

  try {
    const searchParams = new URLSearchParams();
    Object.entries(params as Record<string, unknown>).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        key !== "location" &&
        key !== "lat" &&
        key !== "lng"
      ) {
        searchParams.append(key, String(value));
      }
    });

    const res = await get(`/products/s?${searchParams.toString()}`);
    if (res && Array.isArray(res.products)) {
      dbProducts = res.products;
    } else if (Array.isArray(res)) {
      dbProducts = res;
    }
  } catch {
    // Use purely mock if network/api is down
  }

  const merged = mergeWithMockCatalog(dbProducts, userCoord);

  // Apply in memory filters with exact query compliance and distance radius
  const finalProducts = merged.filter((item) => {
    if (params.category && params.category.trim()) {
      if ((item.category ?? "").toLowerCase() !== params.category.trim().toLowerCase()) {
        return false;
      }
    }

    if (params.query && params.query.trim()) {
      const q = params.query.trim().toLowerCase();
      // If query was literally a city name (e.g. Seattle) and we already resolved it as location, don't filter out products based on name
      const isCitySearch = loc.locationName.toLowerCase().includes(q) || q.includes(loc.locationName.toLowerCase().split(",")[0]);

      if (!isCitySearch) {
        const matchName = (item.name ?? "").toLowerCase().includes(q);
        const matchDesc = (item.description ?? "").toLowerCase().includes(q);
        const matchCategory = (item.category ?? "").toLowerCase().includes(q);
        const matchFarm = (item.farmName ?? "").toLowerCase().includes(q);
        const matchLocation = (item.location ?? "").toLowerCase().includes(q);
        const matchRegion = (item.region ?? "").toLowerCase().includes(q);
        const matchTags = (item.tags ?? []).some((t) => t.toLowerCase().includes(q));

        if (
          !matchName &&
          !matchDesc &&
          !matchCategory &&
          !matchFarm &&
          !matchLocation &&
          !matchRegion &&
          !matchTags
        ) {
          return false;
        }
      }
    }

    const price = Number(item.price) || 0;
    if (params.minPrice !== undefined && price < params.minPrice) return false;
    if (params.maxPrice !== undefined && price > params.maxPrice) return false;

    if (params.pickupAvailable && !item.pickupAvailable) return false;
    if (params.deliveryAvailable && !item.deliveryAvailable) return false;

    if (params.distance !== undefined && params.distance > 0 && item.distance !== undefined) {
      if (item.distance > params.distance) return false;
    }

    return true;
  });

  // Sort by closest distance first
  finalProducts.sort((a, b) => (a.distance ?? 9999) - (b.distance ?? 9999));

  return {
    products: finalProducts,
    totalCount: finalProducts.length,
    isEurope: false,
    locationName: loc.locationName,
  };
};
