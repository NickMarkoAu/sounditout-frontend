import {User} from "../components/user/user.model";

export interface Song {
  id: number;
  userId: string;
  imageId: string;
  name: string;
  artist: string;
  tags: string[];
}

export interface GenerateResult {
  songs: Song[];
  tags: string[];
  error: string;
  image: UserUploadedImage;
}

export interface Post {
  id?: string;
  user: User;
  image?: UserUploadedImage;
  song?: Song;
  content?: string;
  comments?: Comment[];
  date: Date;
  postPrivacy?: string;
  draft: boolean;
  tags: string[];
}

export interface UserUploadedImage {
  id: string;
  url: string;
  imageContent: string;
  tags: string[];
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

// this matches Spring's Page wrapper in response
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}