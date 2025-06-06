export type PostsDTO = {
  description: string;
  url: string;
};

export type Posts = {
  description: string;
  url: string;
  userId: number;
  dataDescription: string;
  dataImage: string;
  dataTitle: string;
  likes: number[];
};