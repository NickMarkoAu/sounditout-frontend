import React, {useEffect, useState} from "react"
import AppStackNav from "./AppStackNav"
import AuthStackNav from "./AuthStackNav"
import {Provider, useDispatch} from "react-redux"
import {useAppSelector} from "./src/state/hooks"
import {selectCurrentUser} from "./src/state/song-suggestion.selector"
import store from "./src/state/store"
import * as SecureStore from "expo-secure-store"
import {removeCurrentUserAction, updateCurrentUserAction} from "./src/state/song-suggestion.slice"
import { Buffer } from "buffer";
import axiosConfig from "./src/configurations/axios-config"
import {refreshToken} from "./src/components/user/auth/auth.api"
import {User} from "./src/components/user/user.model"
import {NotoSans_400Regular, Unbounded_400Regular, useFonts} from "@expo-google-fonts/dev";
import MiniPlayerComponent from "./src/components/player/MiniPlayerComponent";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import { createClient } from '@segment/analytics-react-native';
import * as Sentry from "@sentry/react-native";

const AppWrapper = () => {
  axiosConfig();
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MiniPlayerComponent />
        <App/>
      </GestureHandlerRootView>
    </Provider>
  );
}

const App = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [authToken, setAuthToken] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [decodedJwt, setDecodedJwt] = useState(null);
  const getToken = async () => {
    const token = await SecureStore.getItemAsync('secure_token');
    console.log("Token", token);
    setAuthToken(token);
  }

  let [fontsLoaded] = useFonts({
    Unbounded_400Regular,
    NotoSans_400Regular
  });

  getToken();

  const getKeepLoggedIn = async () => {
    const keepLogged = await SecureStore.getItemAsync('keepLoggedIn');
    console.log("Keep logged in", keepLogged);
    setKeepLoggedIn(keepLogged === 'true');
  }

  getKeepLoggedIn();

  const parseJwt = (token) => {
    try {
      return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const removeToken = () => {
    setAuthToken(null);
    setKeepLoggedIn(false);
    setDecodedJwt(null);
    SecureStore.deleteItemAsync('keepLoggedIn').then(() => {
      SecureStore.deleteItemAsync('secure_token')
        .then(
          dispatch(removeCurrentUserAction)
        );
    });
  }

  useEffect(() => {
    setDecodedJwt(parseJwt(authToken));
    if(authToken === null) {
       removeToken();
    }
  },[authToken])

  const getStoredUser = async () => {
    const storedUser = await SecureStore.getItemAsync('user');
    console.log("Get stored user", storedUser);
    dispatch(updateCurrentUserAction(JSON.parse(storedUser)));
  }

  if(!user || !user.id) {
    getStoredUser();
  }

    //if token is expired and keep logged in, refresh the token, otherwise remove it
  if (decodedJwt !== null && decodedJwt.exp * 1000 < Date.now()) {
    console.log("JWT expired");
    if(keepLoggedIn !== null && keepLoggedIn) {
      refreshToken(authToken).then(response => {
        console.log("Refreshing token");
        SecureStore.setItemAsync('secure_token', authToken).then(() => {
          const user: User = response.user;
          dispatch(updateCurrentUserAction(user));
        })
      })
    } else {
      console.log("removing token");
      removeToken();
    }
  }

  const segmentClient = createClient({
    writeKey: "gF6JVvlLEugvgkgqF0rjK0buliHR2hi6",
    trackAppLifecycleEvents: true,
    //additional config options
  });

  Sentry.init({
    dsn: "https://d0f1c01414be48869f4ca670e1ebc292@app.glitchtip.com/3028"
  })

  return (
    user && authToken ? <AppStackNav/> : <AuthStackNav/>
  );

}

export default AppWrapper