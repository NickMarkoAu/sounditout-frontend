import {SongSuggestionState} from "./song-suggestion.slice";
import {Post, User} from "./song-suggestion.model";

export const selectPosts = (state: SongSuggestionState): Post[] => state.posts;

export const selectCurrentUser = (state: SongSuggestionState): User => state.user;