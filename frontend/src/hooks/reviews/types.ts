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
