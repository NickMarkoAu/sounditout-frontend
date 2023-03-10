import {GenerateResult, UserUploadedImage} from "../../state/song-suggestion.model";
import axios from "axios";

export const generateSuggestions = async (image: UserUploadedImage) => {
  const response = await axios.get<GenerateResult>(`/api/generate/suggestions/${image}`);
  return response.data;
};