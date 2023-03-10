import React, {useEffect, useState} from "react"
import AppStackNav from "./AppStackNav"
import AuthStackNav from "./AuthStackNav"
import {Provider, useDispatch} from "react-redux"
import {useAppSelector} from "./src/state/hooks"
import {selectCurrentUser} from "./src/state/song-suggestion.selector"
import store from "./src/state/store"
import * as SecureStore from "expo-secure-store"
import {removeCurrentUserAction} from "./src/state/song-suggestion.slice"

const AppWrapper = () => {

  return (
    <Provider store={store}>
        <App/>
    </Provider>
  );
}

const App = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [authToken, setAuthToken] = useState("");
  useEffect(() => {
    const getToken = async () => {
      const token = await SecureStore.getItemAsync('secure_token');
      setAuthToken(token);
    }
    getToken();
  }, [user])

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  if (user) {
    const decodedJwt = parseJwt(authToken);

    //if token is expired remove user, and token
    if (decodedJwt.exp * 1000 < Date.now()) {
      SecureStore.deleteItemAsync('secure_token')
        .then(
          dispatch(removeCurrentUserAction)
      );
    }
  }
  return (
    <AppStackNav/>
    // user && authToken ? <AppStackNav /> : <AuthStackNav/>
  );
}

export default AppWrapper