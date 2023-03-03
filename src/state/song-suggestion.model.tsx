export interface Song {
  id: number;
  userId: string;
  imageId: string;
  name: string;
  artist: string;
  tags: string[];
  youtubeVideoId: string;
}

export interface User {
  id: string;
  authToken: string;
  name: string;
  email: string;
  tokens: number;
}

export interface Post {
  id: string;
  user: User;
  image: Image;
  song: Song;
  content: string;
  comments: Comment[];
  date: Date;
}

export interface Image {
  id: string;
  url: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
}