import React from "react"
import AppStackNav from "./AppStackNav"
import AuthStackNav from "./AuthStackNav"
import {createStore} from "@reduxjs/toolkit"
import {Provider} from "react-redux"
import {songSuggestionReducer} from "./src/state/song-suggestion.slice"

const AppWrapper = () => {
  const store = createStore(songSuggestionReducer);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const App = () => {
  return (
    // <AppStackNav />
    <AuthStackNav />
  );
}

export default AppWrapper;