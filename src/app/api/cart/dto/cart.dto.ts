import { Product } from "../../product/dto/create-product.dto";

export interface CartItem {
  product_id: string;
  quantity: number;
  product?: Product;
}

export interface Cart {
  userId?: string;
  items: CartItem[];
  totalPrice: number;
  itemCount: number;
}
