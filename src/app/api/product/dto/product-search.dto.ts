import { Product } from "./create-product.dto";

export interface ProductSearchParamsInterface {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  distance?: number;
  pickupAvailable?: boolean;
  deliveryAvailable?: boolean;
  cursor?: string;
  take?: number;
}

export interface ProductSearchResultInterface {
  products: Product[];
  totalCount: number;
  hasMore: boolean;
  nextCursor?: string;
}
