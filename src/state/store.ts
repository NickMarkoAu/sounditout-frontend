import React from 'react';
import promise from 'redux-promise-middleware';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import songSuggestionReducer, { SongSuggestionState } from './song-suggestion.slice';
import { Connect, connect, createSelectorHook, createStoreHook, createDispatchHook } from 'react-redux';
// import loggerMiddleware from 'app/config/logger-middleware';

export const createStore = () =>
  configureStore({
    reducer: songSuggestionReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // TODO we are using promise middleware so promises appear in actions
        // but createAsyncThunk from redux-toolkit completely replaces it's need
        // so we can replace promise middleware and enable serializableCheck
        serializableCheck: false,
        // TODO we are storing axios errors as they are in the state. Axios errors contain
        // a XMLHttpRequest object and is mutable. When Cypress starts a new test, it will call
        // abort on existing requests and mutate the redux state.
        // convert axios errors into a SerializableError
        immutableCheck: false
      }).concat(promise) // For logging of redux please use '.concat(promise, loggerMiddleware)' instead
  });

const store = createStore();

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;

export const RootContext = React.createContext(null);
export const rootConnect = ((mapStateToProps, mapDispatchToProps = null, mergeProps = null, options = {}) => {
  return connect(mapStateToProps, mapDispatchToProps, mergeProps, { ...options, context: RootContext });
}) as Connect<SongSuggestionState>;
export const useRootSelector = createSelectorHook(RootContext);
export const useRootStore = createStoreHook(RootContext);
export const useRootDispatch = createDispatchHook(RootContext);

export default store;
