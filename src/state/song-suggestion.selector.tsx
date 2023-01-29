import {SongSuggestionState} from "./song-suggestion.slice";
import {Post} from "./song-suggestion.model";

export const selectPosts = (state: SongSuggestionState): Post[] => state.posts;