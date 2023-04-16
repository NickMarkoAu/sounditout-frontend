import {User} from "../components/user/user.model";

export interface Song {
  id: number;
  userId: string;
  imageId: string;
  name: string;
  artist: string;
  tags: string[];
  songMetadata?: SongMetadata;
  isLoading: boolean;
}

export interface SongMetadata {
  songId: number;
  previewUrl: string;
  spotifyUrl: string;
  albumArtUrl: string;
}

export interface GenerateResult {
  songs: Song[];
  tags: string[];
  error: string;
  image: UserUploadedImage;
}

export interface Post {
  id?: number;
  user: User;
  image?: UserUploadedImage;
  song?: Song;
  content?: string;
  comments?: UserComment[];
  date: Date;
  privacy?: PostPrivacy;
  draft: boolean;
  tags: string[];
}

export enum PostPrivacy {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  FRIENDS = "FRIENDS"
}

export interface UserUploadedImage {
  id: string;
  url: string;
  presignedUrl: string;
  tags: string[];
}

export interface UserComment {
  id?: number;
  post: Post;
  user: User;
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