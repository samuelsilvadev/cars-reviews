export type Car = {
  createdAt: string;
  description: string;
  id: string;
  model: string;
  photos: [];
  reviews: [];
  published_at: string;
  slug: string;
  updatedAt: string;
};

export type MinimalCar = Pick<Car, "id" | "description" | "model" | "slug">;
