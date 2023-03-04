import {GenerateState, SongSuggestionState} from "./song-suggestion.slice";
import {GenerateParams, Post, PricingOptions, User} from "./song-suggestion.model";

export const selectPosts = (state: SongSuggestionState): Post[] => state.posts;

export const selectCurrentUser = (state: SongSuggestionState): User => state.user;

export const selectGenerate = (state: SongSuggestionState): GenerateState => state.generate;

export const selectGenerateParams = (state: SongSuggestionState): GenerateParams => state.generate.generateParams;

export const selectPricingOptions = (state: SongSuggestionState): PricingOptions => state.pricing;