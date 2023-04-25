import axios from "axios";
import {SearchRequest, SearchResponse} from "./search.model";
import {User} from "../user/user.model";

export const search = async (searchRequest : SearchRequest) => {
  const pageNumber = searchRequest.page;
  const pageSize = 20;
  const searchType = searchRequest.type;
  const query = searchRequest.query;
  try {
    const response = await axios.get<SearchResponse>(`/api/search/${searchType}/${query}?page=${pageNumber}&size=${pageSize}`);
    console.log("search response: ", response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    console.log("search error: ", e.response.data);
    return e.response.data;
  }
};

export const getRecentSearches = async (user: User) => {
  try {
    const response = await axios.get<SearchResponse[]>(`/api/search/recent/${user.id}`);
    console.log("recent searches response: ", response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    console.log("recent searches error: ", e.response.data);
    return e.response.data;
  }
}