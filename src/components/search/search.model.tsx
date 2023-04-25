import {Page} from "../../state/song-suggestion.model";

export enum SearchType {
  POST = "POST", USER = "USER", MUSIC = "MUSIC",
}

export interface SearchRequest {
  query: string;
  type: SearchType;
  page: number;
}

export interface SearchResponse {
  query: string;
  date: string;
  type: SearchType;
  results: Page<any>;
}