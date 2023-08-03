import {UserUploadedImage} from "../../state/song-suggestion.model";

export interface User {
  id: string;
  name: string;
  email: string;
  dateOfBirth: Date;
  tokens: UserTokens;
  profileImage: UserUploadedImage;
}

export interface UserTokens {
  tokens: number;
  freeTokens: number;
}