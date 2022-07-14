import { MessageStructure } from './message_type';

export interface ChatStructure {
  createdAt: string;
  id: number;
  messages: Array<MessageStructure>;
  productId: number;
  updatedAt: string;
  product: {
    name: string;
    price: number;
    image: string;
    description: string;
    status: string;
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
