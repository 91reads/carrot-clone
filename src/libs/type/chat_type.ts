import { MessageStructure } from "./message_type";

export interface ChatStructure {
  createdAt: string;
  id: number;
  messages: Array<MessageStructure>;
  productId: number;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    avatar?: string;
  }
  userId: number;
}