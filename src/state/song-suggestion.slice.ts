import {Post, User} from "./song-suggestion.model";
import {ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getPostsForUser} from "../components/post/post.api";
import {convertToSerializedError} from "../shared/asnyc";
import {NoInfer} from "react-redux";
import {State} from "react-native-webview/lib/WebViewTypes";

export interface SongSuggestionState {
  user: User;
  posts: Post[];
  error: any;
  isLoading: boolean;
}

export const initialState: SongSuggestionState = {
  user: null,
  posts: [],
  error: null,
  isLoading: false
}

const songSuggestionSlice = createSlice({
  name: 'songSuggestion',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsForUserAction.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(getPostsForUserAction.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getPostsForUserAction.pending, (state, action) => {
        state.isLoading = true;
      });
  }
});

export const getPostsForUserAction = createAsyncThunk<Post[], { user: User }>(
  'posts/getPostsForUser',
  async ({ user }, { rejectWithValue }) => {
    try {
      return getPostsForUser(user);
    } catch (e) {
      return rejectWithValue(convertToSerializedError(e));
    }
  }
);