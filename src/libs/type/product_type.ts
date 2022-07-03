
export interface ProductStructure {
  title: string;
  id: number;
  price: number;
  comments: number;
  hearts: number;
  image: string;
  onClick?: () => void;
}