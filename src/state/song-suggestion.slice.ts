import {GenerateParams, GenerateResult, UserUploadedImage, Post, PricingOptions, Page} from "./song-suggestion.model";
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createPost, getPostsForUser} from "../components/post/post.api";
import {convertToSerializedError} from "../shared/asnyc";
import {fetchPricing} from "../components/user/user.api";
import {generateSuggestions} from "../components/generate/generate.api";
import {User} from "../components/user/user.model";

export interface SongSuggestionState {
  user: User;
  posts: Post[];
  error: any;
  isLoading: boolean;
  generate: GenerateState;
  pricing: PricingOptions;
  currentPost?: Post;
}

export interface GenerateState {
  generateParams: GenerateParams;
  generateResult: GenerateResult;
  isLoading: boolean;
}

export const initialState: SongSuggestionState = {
  user: null,
  posts: [],
  error: null,
  isLoading: false,
  generate: {
    generateParams: {
      energy: 0,
      tempo: 0,
      warmth: 0,
      isLocked: true,
    },
    generateResult: null,
    isLoading: false
  },
  pricing: {
    unlockCost: 1,
    generateCost: 1,
    freeTokens: 10,
    regenerateCost: 1
  },
}

const songSuggestionSlice = createSlice({
  name: 'songSuggestion',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    updateGenerateParamsAction: (state, action: PayloadAction<GenerateParams>) => {
      state.generate.generateParams = action.payload;
    },
    updateCurrentUserAction: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeCurrentUserAction: (state, action: PayloadAction<void>) => {
      state.user = null;
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      state.currentPost = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsForUserAction.fulfilled, (state, action) => {
        state.posts = action.payload.content;
        state.isLoading = false;
      })
      .addCase(getPostsForUserAction.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getPostsForUserAction.pending, (state, action) => {
        state.posts = [];
        state.isLoading = true;
      })
      .addCase(createPostAction.fulfilled, (state, action) => {
        state.currentPost = null;
        //add new post to the top of the feed
        state.posts = [action.payload, ...state.posts];
        state.isLoading = false;
      })
      .addCase(createPostAction.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(createPostAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPricingAction.fulfilled, (state, action) => {
        state.pricing = action.payload;
        state.isLoading = false;
      })
      .addCase(getPricingAction.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getPricingAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(generateAction.fulfilled, (state, action) => {
        state.generate.generateResult = action.payload;
        state.generate.isLoading = false;
      })
      .addCase(generateAction.rejected, (state, action) => {
        state.error = action.payload;
        state.generate.isLoading = false;
      })
      .addCase(generateAction.pending, (state, action) => {
        state.generate.isLoading = true;
      });
  }
});

export const getPostsForUserAction = createAsyncThunk<Page<Post>, { user: User }>(
  'posts/getPostsForUser',
  async ({ user }, { rejectWithValue }) => {
    try {
      return getPostsForUser(user);
    } catch (e) {
      return rejectWithValue(convertToSerializedError(e));
    }
  }
);

export const createPostAction = createAsyncThunk<Post, { post: Post}>(
  'posts/createPost',
  async ({post }, { rejectWithValue }) => {
    try {
      return createPost(post);
    } catch (e) {
      return rejectWithValue(convertToSerializedError(e));
    }
  }
);

export const getPricingAction = createAsyncThunk<PricingOptions, void>(
  'pricing',
  async (_, {rejectWithValue}) => {
    try {
      return await fetchPricing();
    } catch (e) {
      return rejectWithValue(convertToSerializedError(e));
    }
  }
);

export const generateAction = createAsyncThunk<GenerateResult, {imageUri: string}>(
  'generate/generateSuggestions',
  async ({imageUri}, {rejectWithValue}) => {
    try {
      return generateSuggestions(imageUri);
    } catch (e) {
      return rejectWithValue(convertToSerializedError(e));
    }
  }
);

export const{
  updateGenerateParamsAction,
  updateCurrentUserAction,
  removeCurrentUserAction,
  updatePost
} = songSuggestionSlice.actions;
export default songSuggestionSlice.reducer;