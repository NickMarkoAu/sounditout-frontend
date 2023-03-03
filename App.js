import React from "react"
import AppStackNav from "./AppStackNav"
import AuthStackNav from "./AuthStackNav"
import {Provider} from "react-redux"
import {useAppSelector} from "./src/state/hooks"
import {selectCurrentUser} from "./src/state/song-suggestion.selector"
import store from "./src/state/store"

const AppWrapper = () => {

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