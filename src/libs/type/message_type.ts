export interface MessageStructureType {
  chatId: number;
  createdAt: string;
  id: number;
  message: string;
  productId: number;
  updatedAt: string;
  userId: number;
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
}