import {UserContentRequest, Page, Post, UserProfile} from "../../state/song-suggestion.model";
import axios from "axios/index";
import {User} from "../user/user.model";

export const getUserProfile = async (profileRequest : UserContentRequest) => {
  const pageNumber = profileRequest.page;
  const pageSize = 20;
  try {
    const response = await axios.post<UserProfile>(`/api/profile/user?page=${pageNumber}&size=${pageSize}`, profileRequest.user);
    console.log("get profile response: ", response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    console.log("get posts error: ", e.response.data);
    return e.response.data;
  }
};

export const toggleFollowUser = async (user: User) => {
  try {
    const response = await axios.post(`/api/profile/user/follow`, user);
    console.log("toggle follow response: ", response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    console.log("toggle follow error: ", e.response.data);
    return e.response.data;
  }
}

export const updateProfile = async (profile: UserProfile) => {
  try {
    const response = await axios.post(`/api/profile/user/update`, profile);
    console.log("update profile response: ", response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    console.log("update profile error: ", e.response.data);
    return e.response.data;
  }
}

export const updateProfilePicture = async (imageUri: string) => {
  console.log("calling update profile picture with uri", imageUri);
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
    const response = await axios.post(`/api/profile/user/update/picture`, formData, headers);
    console.log("update profile picture response: ", response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    console.log("update profile picture error", e.response.data);
    return e.response.data;
  }
}