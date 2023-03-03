import React from 'react'
import {View} from 'react-native'
import LoginComponent from "../components/login/LoginComponent";

const Login = ({navigation}) => {
  return (
    <View>
      <LoginComponent navigation={navigation}/>
    </View>
  );
}

export default Login;