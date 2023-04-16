import {UserUploadedImage} from "../../state/song-suggestion.model";

export interface User {
  id: string;
  name: string;
  email: string;
  tokens: UserTokens;
  profileImage: UserUploadedImage;
}

export interface UserTokens {
  tokens: number;
  freeTokens: number;
}