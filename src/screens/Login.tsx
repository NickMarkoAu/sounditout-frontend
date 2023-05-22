import { NativeBaseProvider } from 'native-base';
import React from 'react'
import {View} from 'react-native'
import LoginComponent from "../components/login/LoginComponent";
import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";

const Login = ({navigation}: {navigation: StackNavigationProp}) => {
  return (
    <NativeBaseProvider>
      <View>
        <LoginComponent navigation={navigation}/>
      </View>
    </NativeBaseProvider>
  );
}

export default Login;