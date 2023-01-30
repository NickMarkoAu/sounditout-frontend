import {Post, User} from "../../state/song-suggestion.model";
import axios from 'axios';
import Config from "react-native-config";

export const getPostsForUser = async (user: User) => {
  const response = await axios.get<Post[]>(`${Config.BACKEND_URL}/api/posts/feed/${user}`);
  return response.data;
};