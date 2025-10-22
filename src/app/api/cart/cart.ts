import {
  securedDelete,
  securedGet,
  securedPost,
  securedPut,
} from "../fetch.api";

export const getCart = async () => {
  const response = await securedGet(`/cart`);

  return response;
};

export const clearCart = async () => {
  const response = await securedDelete(`/cart/clear`);
  return response;
};

export const updateCartItem = async (productId: string, quantity: number) => {
  const response = await securedPut(`/cart`, {
    product_id: productId,
    quantity: quantity,
  });

  return response;
};

export const removeCartItem = async (productId: string) => {
  return await securedDelete(`/cart`, { product_id: productId });
};
