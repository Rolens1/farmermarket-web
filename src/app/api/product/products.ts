import { get, securedPost } from "../fetch.api";
import { CreateProductDTO } from "./dto/create-product.dto";

export const getProducts = async () => {
  const res = await get("/api/products");

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
