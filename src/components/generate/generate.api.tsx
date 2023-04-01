import {GenerateResult, UserUploadedImage} from "../../state/song-suggestion.model";
import axios from "axios";

export const generateSuggestions = async (imageUri: string) => {
  console.log("calling generate suggestions with uri", imageUri);
  let formData = new FormData();
  try {
    let filename = imageUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formData.append('file', JSON.parse(JSON.stringify({uri: imageUri, name: filename, type})));
    const headers = {headers: {
      'accept': 'application/json',
      'Content-Type': `multipart/form-data;`,
    }};
    const response = await axios.post<GenerateResult>(`/api/songs/`, formData, headers);
    return response.data;
  } catch (e) {
    console.log(e);
    console.log("Generate error", e.response.data);
    return e.response.data;
  }
};