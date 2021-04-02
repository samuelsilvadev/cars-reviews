export type Body = {
  review: string;
  author: string;
  slug: string;
};

export type ErrorBody = {
  message: string;
  meta?: {
    errors?: Record<string, string[]>;
  };
  statusCode: number;
};

export type State = {
  isLoading?: boolean;
  err?: ErrorBody;
  created?: boolean;
};

export type Action = {
  type: string;
  err?: ErrorBody;
};

export type SaveReviewTuple = [State, (body: Body) => Promise<void>];
