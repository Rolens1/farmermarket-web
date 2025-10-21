export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  image?: string;
}
export interface ProductWithSeller extends Product {
  seller: {
    id: string;
    // name: string;
    // email: string;
  };
}
