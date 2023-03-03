import React from "react"
import AppStackNav from "./AppStackNav"
import AuthStackNav from "./AuthStackNav"
import {createStore} from "@reduxjs/toolkit"
import {Provider} from "react-redux"
import {songSuggestionReducer} from "./src/state/song-suggestion.slice"
import {useAppSelector} from "./src/state/hooks"
import {selectCurrentUser} from "./src/state/song-suggestion.selector"

const AppWrapper = () => {
  const store = createStore(songSuggestionReducer)

  return (
    <Provider store={store}>
        <App/>
    </Provider>
  );
}

const App = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <AppStackNav/>
    // user && user?.authToken ? <AppStackNav /> : <AuthStackNav/>
  );
}

export default AppWrapper