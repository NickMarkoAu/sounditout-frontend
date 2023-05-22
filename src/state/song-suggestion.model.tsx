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
  likes: number;
  date: Date;
  privacy?: PostPrivacy;
  draft: boolean;
  tags: string[];
  liked?: boolean;
  saved?: boolean;
  shared?: boolean;
}

export interface SavedPost {
  post: Post;
  user: User;
}

export interface Reaction {
  id?: number;
  user: User;
  post: Post;
  reactionType: ReactionType;
}

export enum PostPrivacy {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  FRIENDS = "FRIENDS"
}

export enum ReactionType {
  LIKE = "LIKE",
  LOVE = "LOVE",
  HAHA = "HAHA",
  WOW = "WOW",
  SAD = "SAD",
  ANGRY = "ANGRY"

}

export interface UserUploadedImage {
  id: string;
  presignedUrl: string;
  tags: string[];
  adultContent: boolean;
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

export interface UserContentRequest {
  user: User;
  page: number;
}

export interface UserProfile {
  user: User;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  following: boolean;
  own: boolean;
  posts: Post[];
  headlineSong: Song;
  bio: string;
}

export enum ProfileViewMode {
  IMAGE = "IMAGE",
  SONG = "SONG"
}

// this matches Spring's Page wrapper in response
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}