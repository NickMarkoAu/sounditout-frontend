import React, {useEffect, useState} from "react"
import AppStackNav from "./AppStackNav"
import AuthStackNav from "./AuthStackNav"
import {Provider, useDispatch} from "react-redux"
import {useAppDispatch, useAppSelector} from "./src/state/hooks"
import {selectAppInfo, selectCurrentUser} from "./src/state/song-suggestion.selector"
import store from "./src/state/store"
import * as SecureStore from "expo-secure-store"
import {
  getAppInfoAction,
  getUserFromTokenAction,
  removeCurrentUserAction,
} from "./src/state/song-suggestion.slice"
import {Buffer} from "buffer";
import axiosConfig from "./src/configurations/axios-config"
import {refreshToken} from "./src/components/user/auth/auth.api"
import {NotoSans_400Regular, Unbounded_400Regular, useFonts} from "@expo-google-fonts/dev";
import MiniPlayerComponent from "./src/components/player/MiniPlayerComponent";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import * as Sentry from 'sentry-expo';
import {AppInfo} from "./src/state/appinfo/app-info.model";

const AppWrapper = () => {
  axiosConfig();
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <MiniPlayerComponent/>
        <App/>
      </GestureHandlerRootView>
    </Provider>
  );
}

const App = () => {
  const user = useAppSelector(selectCurrentUser);
  const [authToken, setAuthToken] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [decodedJwt, setDecodedJwt] = useState(null);
  const appInfo: AppInfo = useAppSelector(selectAppInfo);
  const appDispatch = useAppDispatch();

  const parseJwt = (token) => {
    try {
      return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const removeToken = () => {
    console.log("removing token");
    if (authToken != null) {
      setAuthToken(null);
    }
    setDecodedJwt(null);
    SecureStore.deleteItemAsync('secure_token');
    appDispatch(removeCurrentUserAction());
  }

  const getToken = async () => {
    const token = await SecureStore.getItemAsync('secure_token');
    if(token == null) {
      removeToken();
    }
    setAuthToken(token);
    setDecodedJwt(parseJwt(token));
  }

  const getKeepLoggedIn = async () => {
    const keepLogged = await SecureStore.getItemAsync('keepLoggedIn');
    setKeepLoggedIn(keepLogged === 'true');
  }

  const getUser = () => {
    console.log("authToken: ", authToken);
    console.log("user: ", user);
    if (authToken && (!user || !user.id)) {
      appDispatch(getUserFromTokenAction({token: authToken}));
    }
  }

  // const segmentClient = createClient({
  //   writeKey: "gF6JVvlLEugvgkgqF0rjK0buliHR2hi6",
  //   trackAppLifecycleEvents: true,
  //   //additional config options
  // });

  Sentry.init({
    dsn: 'https://d0f1c01414be48869f4ca670e1ebc292@app.glitchtip.com/3028',
    enableInExpoDevelopment: true,
    debug: true, //TODO set to false in production
  });

  useEffect(() => {
    //if token is expired and keep logged in, refresh the token, otherwise remove it
    if (decodedJwt !== null && decodedJwt.exp * 1000 < Date.now()) {
      console.log("JWT expired");
      if (keepLoggedIn !== null && keepLoggedIn) {
        refreshToken(authToken).then(response => {
          console.log("Refreshing token");
          SecureStore.setItemAsync('secure_token', authToken);
        })
      } else {
        removeToken();
      }
    }

    if (!appInfo) {
      appDispatch(getAppInfoAction());
    }

    getToken();
    getKeepLoggedIn();
    getUser();
  }, []);

  useEffect(() => {
    getToken();
    getKeepLoggedIn();
    getUser();
  },[user]);

  let [fontsLoaded] = useFonts({
    Unbounded_400Regular,
    NotoSans_400Regular
  });

  return (
    user != null && user && authToken ? <AppStackNav/> : <AuthStackNav/>
  );

}

export default AppWrapper