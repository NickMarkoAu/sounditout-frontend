import {UserContentRequest, Page, Post, UserProfile} from "../../state/song-suggestion.model";
import axios from "axios/index";

export const getUserProfile = async (profileRequest : UserContentRequest) => {
  const pageNumber = profileRequest.page;
  const pageSize = 20;
  try {
    const response = await axios.post<UserProfile>(`/api/profile/user?page=${pageNumber}&size=${pageSize}`, profileRequest.user);
    return response.data;
  } catch (e) {
    console.log(e);
    console.log("get posts error: ", e.response.data);
    return e.response.data;
  }
};