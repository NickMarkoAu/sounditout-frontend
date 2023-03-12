import { NativeBaseProvider } from 'native-base';
import React from 'react'
import {View} from 'react-native'
import LoginComponent from "../components/login/LoginComponent";

const Login = ({navigation}) => {
  return (
    <NativeBaseProvider>
      <View>
        <LoginComponent navigation={navigation}/>
      </View>
    </NativeBaseProvider>
  );
}

export default Login;