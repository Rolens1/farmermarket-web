export interface CartItem {
  productId: string;
  quantity: number;
  product?: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    slug: string;
  };
}

export interface Cart {
  userId?: string;
  items: CartItem[];
  totalPrice: number;
  itemCount: number;
}
