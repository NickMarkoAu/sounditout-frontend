import axios from "axios";
import {SongMetadata} from "../../state/song-suggestion.model";

export const getSongMetadata = async (songId: number) => {
  try {
    const response = await axios.get<SongMetadata>(`/api/songs/metadata/${songId}`);
    return response.data;
  } catch (e) {
    console.log(e);
    console.log("get song metadata error: ", e.response.data);
    return e.response.data;
  }
}