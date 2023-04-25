import {GenerateState, SongSuggestionState} from "./song-suggestion.slice";
import {GenerateParams, Post, PricingOptions, Song, UserProfile} from "./song-suggestion.model";
import {User} from "../components/user/user.model";
import {SearchResponse} from "../components/search/search.model";

export const selectPosts = (state: SongSuggestionState): Post[] => state.feed.posts;

export const selectPostsPage = (state: SongSuggestionState): number => state.feed.currentPageLoaded;

export const selectCurrentProfile = (state: SongSuggestionState): UserProfile => state.profile.profile;

export const selectProfilePage = (state: SongSuggestionState): number => state.profile.currentPageLoaded;

export const selectLoading = (state: SongSuggestionState): boolean => state.isLoading;

export const selectCurrentUser = (state: SongSuggestionState): User => state.user;

export const selectCurrentPost = (state: SongSuggestionState): Post => state.currentPost;

export const selectGenerate = (state: SongSuggestionState): GenerateState => state.generate;

export const selectGenerateParams = (state: SongSuggestionState): GenerateParams => state.generate.generateParams;

export const selectPricingOptions = (state: SongSuggestionState): PricingOptions => state.pricing;

export const selectIsPlayerVisible = (state: SongSuggestionState): boolean => state.playerVisible;

export const selectCurrentlyPlayingSong = (state: SongSuggestionState): Song => state.currentlyPlayingSong;

export const selectRecentSearches = (state: SongSuggestionState): SearchResponse[] => state.search.recentSearches;

export const selectSearchResults = (state: SongSuggestionState): SearchResponse => state.search.searchResults;