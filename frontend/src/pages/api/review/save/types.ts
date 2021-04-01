export type Review = {
  author: string;
  description: string;
  car: string;
};

export type RequestBody = {
  author?: string;
  review?: string;
  slug?: string;
};
