import { get, securedGet, securedPost } from "../fetch.api";
import { CreateProductDTO } from "./dto/create-product.dto";
import { ProductSearchParamsInterface } from "./dto/product-search.dto";

export const getProducts = async () => {
  // get() already returns parsed JSON — just return it directly
  return await get("/products");
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
  return await get(`/products/i/${productId}`);
};

export const getProductBySlug = async (slug: string) => {
  return await get(`/products/slug/${slug}`);
};

export const searchProducts = async (params: ProductSearchParamsInterface) => {
  // Build a proper query string from the params object
  const searchParams = new URLSearchParams();
  Object.entries(params as Record<string, unknown>).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });
  return await get(`/products/s?${searchParams.toString()}`);
};
