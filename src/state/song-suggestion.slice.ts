import {
  GenerateParams,
  GenerateResult,
  Post,
  PricingOptions,
  Page,
  Song,
  UserComment
} from "./song-suggestion.model";
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createPost, getPostsForUser, submitComment} from "../components/post/post.api";
import {convertToSerializedError} from "../shared/asnyc";
import {fetchPricing, refreshUser} from "../components/user/user.api";
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
  newPostLoading: boolean;
  playerVisible: boolean;
  currentlyPlayingSong?: Song;
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
  newPostLoading: false,
  playerVisible: false
}

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

export const submitCommentAction = createAsyncThunk<UserComment, { comment: UserComment }>(
  'posts/submitComment',
  async ({comment }, { rejectWithValue }) => {
    try {
      return submitComment(comment);
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

export const refreshUserAction = createAsyncThunk<User, { userId: number }>(
  'user/refreshUser',
  async ({userId}, {rejectWithValue}) => {
    try {
      return await refreshUser(userId);
    } catch (e) {
      return rejectWithValue(convertToSerializedError(e));
    }
  }
);

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
    },
    setCurrentlyPlayingSong: (state, action: PayloadAction<Song>) => {
      state.currentlyPlayingSong = action.payload;
      state.playerVisible = true;
      console.log("Set visible to true");
    },
    unloadCurrentlyPlayingSong: (state, action: PayloadAction) => {
      state.currentlyPlayingSong = null;
      state.playerVisible = false;
      console.log("Set visible to false");
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
        //clear generated results
        state.generate.generateResult = null;
        state.generate.generateParams = {
          energy: 0,
          tempo: 0,
          warmth: 0,
          isLocked: true,
        };
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
      })
      .addCase(submitCommentAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(submitCommentAction.fulfilled, (state, action) => {
        state.isLoading = false;
        const posts = state.posts;
        const comment: UserComment = action.payload;
        const post: Post = posts.find(p => p.id === comment.post.id);
        console.log("adding comment to post: ", post);
        post?.comments.push(comment);
      })
      .addCase(submitCommentAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(refreshUserAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(refreshUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(refreshUserAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});


export const{
  updateGenerateParamsAction,
  updateCurrentUserAction,
  removeCurrentUserAction,
  updatePost,
  setCurrentlyPlayingSong,
  unloadCurrentlyPlayingSong
} = songSuggestionSlice.actions;
export default songSuggestionSlice.reducer;