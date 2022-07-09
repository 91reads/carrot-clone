export interface MessageStructure {
  message: string;
  user: {
    id: number;
    name: string;
    avatar?: string;
  }
}