import { get, securedGet, securedPost } from "../fetch.api";
import { CreateProductDTO } from "./dto/create-product.dto";
import { ProductSearchParamsInterface } from "./dto/product-search.dto";

export const getProducts = async () => {
  const res = await get("/products");
  console.log("Get products response:", res);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

export const createProduct = async (productData: CreateProductDTO) => {
  const res = await securedPost("/products/create", productData);

  if (!res.ok) {
    throw new Error("Failed to create product");
  }
  console.log("Create product response:", res);
};

export const getUserProducts = async () => {
  const res = await securedGet(`/products/user`);

  return res;
};

export const updateProduct = async (
  productId: string,
  productData: Partial<CreateProductDTO>
) => {
  const res = await securedPost(`/products/update/${productId}`, productData);
  return res;
};

export const deleteProduct = async (productId: string) => {
  const res = await securedPost(`/products/delete/${productId}`, {});
  return res;
};

export const getProductById = async (productId: string) => {
  const res = await get(`/products/i/${productId}`);
  return res;
};

export const getProductBySlug = async (slug: string) => {
  const res = await get(`/products/slug/${slug}`);
  return res;
};

export const searchProducts = async (params: ProductSearchParamsInterface) => {
  // const searchParams = new URLSearchParams();
  // Object.entries(params).forEach(([key, value]) => {
  //   if (value !== undefined) {
  //     searchParams.append(key, value.toString());
  //   }
  // });
  const res = await get(`/products/s?${params}`);
  console.log("Search products response:", res);
  return res;
};
