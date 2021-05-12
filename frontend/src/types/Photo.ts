export type PhotoFormat = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: null;
  url: string;
};

export type Photo = {
  name: string;
  alternativeText: string;
  caption: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  width: number;
  height: number;
  url: string;
  formats: {
    thumbnail: PhotoFormat;
    medium: PhotoFormat;
    small: PhotoFormat;
  };
  provider: string;
  id: string;
};
