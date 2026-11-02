import { get, securedGet, securedPost } from "../fetch.api";
import { CreateProductDTO } from "./dto/create-product.dto";
import { ProductSearchParamsInterface } from "./dto/product-search.dto";
import {
  MOCK_PRODUCTS,
  mergeWithMockCatalog,
  filterMockProducts,
  EnhancedProduct,
} from "@/data/mockProducts";

export const getProducts = async (): Promise<EnhancedProduct[]> => {
  try {
    const dbRes = await get("/products");
    const dbProducts = Array.isArray(dbRes) ? dbRes : [];
    return mergeWithMockCatalog(dbProducts);
  } catch (error) {
    console.warn("Falling back to local mock catalog:", error);
    return MOCK_PRODUCTS;
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
): Promise<{ products: EnhancedProduct[]; totalCount: number }> => {
  let dbProducts: EnhancedProduct[] = [];

  try {
    const searchParams = new URLSearchParams();
    Object.entries(params as Record<string, unknown>).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
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

  // Filter in-memory mock products with matching criteria
  const filteredMocks = filterMockProducts({
    query: params.query,
    category: params.category,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    distance: params.distance,
    pickupAvailable: params.pickupAvailable,
    deliveryAvailable: params.deliveryAvailable,
  });

  const merged = mergeWithMockCatalog(dbProducts);

  // Apply in-memory filter to the merged set to guarantee exact query compliance
  const finalProducts = merged.filter((item) => {
    if (params.category && params.category.trim()) {
      if ((item.category ?? "").toLowerCase() !== params.category.trim().toLowerCase()) {
        return false;
      }
    }
    if (params.query && params.query.trim()) {
      const q = params.query.trim().toLowerCase();
      const match =
        (item.name ?? "").toLowerCase().includes(q) ||
        (item.description ?? "").toLowerCase().includes(q) ||
        (item.category ?? "").toLowerCase().includes(q);
      if (!match) return false;
    }
    const price = Number(item.price) || 0;
    if (params.minPrice !== undefined && price < params.minPrice) return false;
    if (params.maxPrice !== undefined && price > params.maxPrice) return false;
    return true;
  });

  return {
    products: finalProducts,
    totalCount: finalProducts.length,
  };
};
