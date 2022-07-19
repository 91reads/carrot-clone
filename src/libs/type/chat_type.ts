import { MessageStructureType } from "./message_type";

export interface ChatStructureType {
  createdAt: string;
  id: string;
  messages: Array<MessageStructureType>;
  productId: string;
  updatedAt: string;
  sellerId: number;
  product: {
    description: string;
    name: string;
    price: number;
    status: string;
    image: string;
    user: {
      id: number;
      name: string;
      avatar?: string;
    };
  };
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
  userId: number;
}