import { UserStructure } from "./profile_type";

export interface ProductStructure {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  image: string;
  name: string;
  price: number;
  status: string;
  buyer: number | null;
  description: string;
}

interface ProductWithUser extends ProductStructure {
  user: UserStructure;
}

export interface ProductDetailStructure {
  product: ProductWithUser;
  isLiked: boolean;
  relatedProducts: Array<ProductStructure>;
}
