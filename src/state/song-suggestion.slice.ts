import {
  GenerateParams,
  GenerateResult,
  Post,
  PricingOptions,
  Page,
  Song,
  UserComment, Reaction, SavedPost, UserContentRequest, UserProfile
} from "./song-suggestion.model";
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createPost, getPostsForUser, likePost, savePost, submitComment} from "../components/post/post.api";
import {convertToSerializedError} from "../shared/asnyc";
import {fetchPricing, refreshUser} from "../components/user/user.api";
import {generateSuggestions} from "../components/generate/generate.api";
import {User} from "../components/user/user.model";
import Profile from "../screens/Profile";
import {getUserProfile, toggleFollowUser, updateProfile, updateProfilePicture} from "../components/profile/profile.api";
import {getRecentSearches, search} from "../components/search/search.api";
import {SearchRequest, SearchResponse} from "../components/search/search.model";
import {getAppInfo} from "./appinfo/app-info.api";
import {AppInfo} from "./appinfo/app-info.model";
import {validateInviteCode} from "../components/signup/signup.api";
import {getUserFromToken} from "../components/user/auth/auth.api";

//TODO break this up into multiple slices
export interface SongSuggestionState {
  appInfo: AppInfo;
  user: User;
  error: any;
  isLoading: boolean;
  generate: GenerateState;
  pricing: PricingOptions;
  feed: FeedState;
  currentPost?: Post;
  newPostLoading: boolean;
  playerVisible: boolean;
  currentlyPlayingSong?: Song;
  profile: UserProfileState;
  search?: SearchState;
  signup?: SignupState;
}

export interface UserProfileState {
  profile: UserProfile;
  currentPageLoaded: number;
}

export interface GenerateState {
  generateParams: GenerateParams;
  generateResult: GenerateResult;
  isLoading: boolean;
}

export interface FeedState {
  posts: Post[];
  currentPageLoaded: number;
}

export interface SearchState {
  recentSearches: SearchResponse[];
  searchResults: SearchResponse;
}

export interface SignupState {
  inviteCodeValid?: boolean;
}

export const initialState: SongSuggestionState = {
  appInfo: null,
  user: null,
  feed: {
    posts: [],
    currentPageLoaded: 0,
  },
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
  playerVisible: false,
  profile: {
    profile: null,
    currentPageLoaded: 0
  },
  search: {
    recentSearches: [],
    searchResults: null
  },
  signup: null
}

export const getPostsForUserAction = createAsyncThunk<Page<Post>, { feedRequest: UserContentRequest }>(
  'posts/getPostsForUser',
  async ({ feedRequest }, { rejectWithValue }) => {
    try {
      return getPostsForUser(feedRequest);
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

export const likePostAction = createAsyncThunk<Reaction, { reaction: Reaction }>(
  'posts/likePost',
  async ({reaction }, { rejectWithValue }) => {
    try {
        return likePost(reaction);
    } catch (e) {
      return rejectWithValue(convertToSerializedError(e));
    }
  }
);

export const savePostAction = createAsyncThunk<SavedPost, { post: SavedPost }>(
  'posts/savePost',
  async ({post }, { rejectWithValue }) => {
    try {
      return savePost(post);
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

export const refreshUserAction = createAsyncThunk<User, { userId: string }>(
  'user/refreshUser',
  async ({userId}, {rejectWithValue}) => {
    try {
      return await refreshUser(userId);
    } catch (e) {
      return rejectWithValue(convertToSerializedError(e));
    }
  }
);

export const getUserProfileAction = createAsyncThunk<UserProfile, { profileRequest: UserContentRequest }>(
  'user/getUserProfile',
  async ({profileRequest}, {rejectWithValue}) => {
    try {
      return await getUserProfile(profileRequest);
    } catch (e) {
      return rejectWithValue(convertToSerializedError(e));
    }
  }
);

export const toggleFollowUserAction = createAsyncThunk<UserProfile, { user: User }>(
  'user/toggleFollowUser',
  async ({user}, {rejectWithValue}) => {
    try {
      return await toggleFollowUser(user);
    } catch (e) {
      return rejectWithValue(convertToSerializedError(e));
    }
  }
);

export const getRecentSearchesAction = createAsyncThunk<SearchResponse[], { user: User }>(
  'search/getRecentSearches',
  async ({user}, {rejectWithValue}) => {
    try {
      return await getRecentSearches(user);
    } catch (e) {
      return rejectWithValue(convertToSerializedError(e));
    }
  }
);

export const searchAction = createAsyncThunk<SearchResponse, { searchRequest: SearchRequest }>(
  'search/search',
  async ({searchRequest}, {rejectWithValue}) => {
    try {
      return await search(searchRequest);
    } catch (e) {
      return rejectWithValue(convertToSerializedError(e));
    }
  }
);

export const updateProfileAction = createAsyncThunk<UserProfile, { profile: UserProfile }>(
  'user/updateProfile',
  async ({profile}, {rejectWithValue}) => {
    try {
      return await updateProfile(profile);
    } catch (e) {
      return rejectWithValue(convertToSerializedError(e));
    }
  }
);

export const updateProfilePictureAction = createAsyncThunk<UserProfile, {imageUri: string}>(
  'user/updateProfilePicture',
  async ({imageUri}, {rejectWithValue}) => {
    try {
      return await updateProfilePicture(imageUri);
    } catch (e) {
      return rejectWithValue(convertToSerializedError(e));
    }
  }
);

export const getAppInfoAction = createAsyncThunk<AppInfo, void>(
  'app/getAppInfo',
  async (_, {rejectWithValue}) => {
    try {
      return await getAppInfo();
    } catch (e) {
      return rejectWithValue(convertToSerializedError(e));
    }
  }
);

export const validateInviteCodeAction = createAsyncThunk<boolean, {inviteCode: string}>(
  'app/validateInviteCode',
  async ({inviteCode}, {rejectWithValue}) => {
    try {
      return await validateInviteCode(inviteCode);
    } catch (e) {
      return rejectWithValue(convertToSerializedError(e));
    }
  }
);

export const getUserFromTokenAction = createAsyncThunk<User, {token: string}>(
  'app/getUserByToken',
  async ({token}, {rejectWithValue}) => {
    try {
      return await getUserFromToken(token);
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
    },
    clearPosts(state, action: PayloadAction) {
      state.feed.posts = [];
      state.feed.currentPageLoaded = 0;
    },
    updateCurrentProfile(state, action: PayloadAction<UserProfile>) {
      state.profile.profile = action.payload;
      state.profile.currentPageLoaded = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsForUserAction.fulfilled, (state, action) => {
        const currentPosts: Post[] = state.feed.posts;
        const newPosts: Post[] = action.payload.content;
        state.feed.currentPageLoaded++;
        //add new posts to the bottom of the feed
        state.feed.posts = [...currentPosts, ...newPosts];
        state.isLoading = false;
      })
      .addCase(getPostsForUserAction.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getPostsForUserAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createPostAction.fulfilled, (state, action) => {
        state.currentPost = null;
        //add new post to the top of the feed
        state.feed.posts = [action.payload, ...state.feed.posts];
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
        const posts = state.feed.posts;
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
      })
      .addCase(likePostAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(likePostAction.fulfilled, (state, action) => {
        state.isLoading = false;
        const posts = state.feed.posts;
        const post: Post = posts.find(p => p.id === action.payload.post.id);
        //toggle
        if(post?.liked) {
          post.likes--;
          post.liked = false;
        } else {
          post.likes++;
          post.liked = true;
        }
      })
      .addCase(likePostAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(savePostAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(savePostAction.fulfilled, (state, action) => {
        state.isLoading = false;
        const posts = state.feed.posts;
        const post: Post = posts.find(p => p.id === action.payload.post.id);
        //toggle
        if(post?.saved) {
          post.saved = false;
        } else {
          post.saved = true;
        }
      })
      .addCase(savePostAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getUserProfileAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserProfileAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile.profile = action.payload;
        //TODO add more posts based on the page?
      })
      .addCase(getUserProfileAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getRecentSearchesAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getRecentSearchesAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.search.recentSearches = action.payload;
      })
      .addCase(getRecentSearchesAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(searchAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(searchAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.search.searchResults = action.payload;
        state.search.recentSearches.push(action.payload);
      })
      .addCase(searchAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProfileAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateProfileAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile.profile = action.payload;
      })
      .addCase(updateProfileAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProfilePictureAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateProfilePictureAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.profileImage = action.payload.user.profileImage;
        state.profile.profile = action.payload;
      })
      .addCase(updateProfilePictureAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAppInfoAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAppInfoAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appInfo = action.payload;
      })
      .addCase(getAppInfoAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(validateInviteCodeAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(validateInviteCodeAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.signup = {...state.signup, inviteCodeValid : true};
      })
      .addCase(validateInviteCodeAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getUserFromTokenAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserFromTokenAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserFromTokenAction.rejected, (state, action) => {
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
  unloadCurrentlyPlayingSong,
  clearPosts,
  updateCurrentProfile
} = songSuggestionSlice.actions;
export default songSuggestionSlice.reducer;