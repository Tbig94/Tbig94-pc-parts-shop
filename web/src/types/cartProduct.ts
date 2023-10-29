export type CartProduct = {
  id: string;
  name: string;
  image: string;
  rating: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  quantity?: number;
  numberOfClicks: number;
};

export type CartProductItemProps = {
  product: CartProduct;
};
