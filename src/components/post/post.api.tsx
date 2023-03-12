import {Page, Post} from "../../state/song-suggestion.model";
import axios from 'axios';
import {User} from "../user/user.model";

export const getPostsForUser = async (user: User) => {
  const pageNumber = 0;
  const pageSize = 20;
  try {
    const response = await axios.post<Page<Post>>(`/api/posts/feed?page=${pageNumber}&size=${pageSize}`, user);
    console.log("get posts response: ", response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    console.log("get posts error: ", e.response.data);
    return e.response.data;
  }
};