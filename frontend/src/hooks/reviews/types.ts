export type Body = {
  review: string;
  author: string;
  slug: string;
};

export type State = {
  isLoading?: boolean;
  err?: unknown;
  created?: boolean;
};

export type Action = {
  type: string;
  err?:
    | Error
    | {
        message: string;
        meta: Record<string, any>;
        statusCode: number;
      };
};

export type SaveReviewTuple = [State, (body: Body) => Promise<void>];
