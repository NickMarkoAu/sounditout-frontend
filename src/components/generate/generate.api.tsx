import {GenerateResult, UserUploadedImage, Post, User} from "../../state/song-suggestion.model";
import axios from "axios";
import Config from "react-native-config";

export const generateSuggestions = async (image: UserUploadedImage) => {
  const response = await axios.get<GenerateResult>(`${Config.BACKEND_URL}/api/generate/suggestions/${image}`);
  return response.data;
};