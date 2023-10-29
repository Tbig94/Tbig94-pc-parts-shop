export type Product = {
  id: string;
  name: string;
  image: string;
  rating: string;
  minPrice: number;
  maxPrice: number;
  description: string;
  numberOfClicks: number;
};

export type ProductItemProps = {
  product: Product;
};
