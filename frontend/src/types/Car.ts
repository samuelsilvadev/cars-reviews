import { Photo } from "./Photo";

export type Car = {
  createdAt: string;
  description: string;
  id: string;
  model: string;
  photos: Photo[];
  reviews: [];
  published_at: string;
  slug: string;
  updatedAt: string;
};

export type MinimalCar = Pick<Car, "id" | "description" | "model" | "slug">;
