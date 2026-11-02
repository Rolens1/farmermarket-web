import { Product } from "./create-product.dto";

export interface ProductSearchParamsInterface {
  query?: string;
  location?: string;
  lat?: number;
  lng?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  distance?: number;
  pickupAvailable?: boolean;
  deliveryAvailable?: boolean;
  favoritesOnly?: boolean;
  cursor?: string;
  take?: number;
}

export interface ProductSearchResultInterface {
  products: Product[];
  totalCount: number;
  hasMore: boolean;
  nextCursor?: string;
}
