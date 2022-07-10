import { UserStructure } from "./profile_type";

export interface ProductStructure {
  name: string;
  price: number;
  image: string;
  id: number;
  description: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: UserStructure;
}

export interface ProductDetailStructure {
  isLiked: boolean;
  product: ProductStructure;
  relatedProducts: Array<ProductStructure>;
}