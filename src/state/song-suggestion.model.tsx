export interface Song {
  id: number;
  userId: string;
  imageId: string;
  name: string;
  artist: string;
  tags: string[];
  youtubeVideoId: string;
}

export interface GenerateResult {
  songs: Song[];
  tags: String[];
}

export interface User {
  id: string;
  authToken: string;
  name: string;
  email: string;
  tokens: UserTokens;
}

export interface UserTokens {
  tokens: number;
  freeTokens: number;
}

export interface Post {
  id: string;
  user: User;
  image: UserUploadedImage;
  song: Song;
  content: string;
  comments: Comment[];
  date: Date;
}

export interface UserUploadedImage {
  id: string;
  url: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
}

export interface GenerateParams {
  energy: number,
  tempo: number,
  warmth: number,
  isLocked: boolean
}

export interface PricingOptions {
  generateCost: number,
  unlockCost: number,
  freeTokens: number,
  regenerateCost: number
}