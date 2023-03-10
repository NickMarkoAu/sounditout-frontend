import {Image, View, StyleSheet, TextInput, TouchableOpacity, Text} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import React, {useState} from "react";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import {useTheme} from "../../state/hooks";
import {Formik} from 'formik'
import {login} from "../user/auth/auth.api";
import {extractError} from "../../shared/error.utils";
import * as SecureStore from 'expo-secure-store';
import {useDispatch} from "react-redux";
import {updateCurrentUserAction} from "../../state/song-suggestion.slice";
import {User} from "../user/user.model";

const LoginComponent = ({navigation}) => {
  const {colours} = useTheme;

  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [responseCode, setResponseCode] = useState('null');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    logo: {
      width: "70%",
      height: 50,
      resizeMode: "contain",
      marginBottom: 22
    },
    loginContainer: {
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      flex: 1
    },
    input: {
      height: "100%",
      width: "80%",
      color: "white",
      margin: 5,
      borderWidth: 0,
      padding: 10,
    },
    inputContainer: {
      height: 50,
      width: '80%',
      marginBottom: 22,
      justifyContent: "center",
      flexDirection: "row",
      padding: 6,
      alignItems: 'center', //Centered vertically
      backgroundColor: colours.secondary,
      borderRadius: 15
    },
    container: {
      width: "100%",
      height: "100%",
      alignSelf: 'stretch',
      marginBottom: 55,
      overflow: "visible",
      alignItems: 'center', //Centered vertically
      backgroundColor: colours.background,
    },
    loginButton: {
      width: "60%",
      height: 50,
      marginBottom: 22,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colours.primary,
      borderRadius: 15,
    },
    servicesContainer: {
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      marginBottom: 22
    },
    serviceLogo: {
      width: "33%",
      height: 50,
      resizeMode: "contain",
    },
    forgotPasswordContainer: {
      marginBottom: 22,
      flexDirection: "row",
    },
    resetButton: {
      color: colours.primary,
      fontSize: 16,
      marginLeft: 2
    },
    orContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 22
    },
    orLine: {
      flex: 1,
      height: 3,
      width: "20%",
      backgroundColor: colours.secondary
    },
    orText: {
      width: 50,
      textAlign: 'center',
      color: "white"
    },
    signUpContainer: {
      marginBottom: 22,
      flexDirection: "row",
    },
    formContainer: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }
  });

  const handleSubmit = (values) => {
    console.log("submitting login", values)
    setLoading(true);
    login({
      username: values.email,
      password: values.password,
      ...(newPassword && { newPassword })
    })
      .then((response) => {
        setLoading(false);
        if(response.jwtToken) {
          setError(null);
          //Set jwt token
          console.log("setting JWT token");
          SecureStore.setItemAsync('secure_token',response.jwtToken)
            .then(() => {
              //update current user
              const user : User = response.user;
              dispatch(updateCurrentUserAction(user));
              navigation.navigate("Feed");
            });
        } else {
          setError(response)
        }
      })
      .catch((e) => {
        setError(extractError(e));
        setLoading(false);
      });
  };

  const handleChange = () => {

  }

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Image source={require("../../../assets/appidentity/logo.png")} style={styles.logo}/>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={(values) => handleSubmit(values)}>
          {({handleChange, handleSubmit, values}) => (
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <FontAwesomeIcon icon={faEnvelope} color={colours.primary} size={30}/>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  placeholderTextColor="#7f7f7f"
                />
              </View>
              <View style={styles.inputContainer}>
                <FontAwesomeIcon icon={faLock} color={colours.primary} size={30}/>
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  placeholder="Password"
                  value={values.password}
                  placeholderTextColor="#7f7f7f"
                />
              </View>
              <TouchableOpacity style={styles.loginButton} onPress={() => handleSubmit()} disabled={loading}>
                <View>
                  <Text style={{color: "white", fontSize: 18}}>
                    Login
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        { error &&
          //TODO Fix up this error messaging
          <View>
            <Text>
              {Object.keys(error)}
            </Text>
          </View> }
        <View style={styles.forgotPasswordContainer}>
          <Text style={{color: "white", fontSize: 16}}>
            Forgot Password?
          </Text>
          <TouchableOpacity>
            <Text style={styles.resetButton}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
        {/*TODO add OAuth 2 later*/}
        <View style={styles.orContainer}>
          <View style={styles.orLine}/>
          <View>
            <Text style={styles.orText}>Or</Text>
          </View>
          <View style={styles.orLine}/>
        </View>
        <View style={styles.servicesContainer}>
          <Image source={require("../../../assets/streamingservices/spotify.png")} style={styles.serviceLogo}/>
          <Image source={require("../../../assets/streamingservices/apple_music.png")} style={styles.serviceLogo}/>
          <Image source={require("../../../assets/streamingservices/youtube_music.png")} style={styles.serviceLogo}/>
        </View>
        <View style={styles.signUpContainer}>
          <Text style={{color: "white", fontSize: 16}}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.resetButton}>
              Sign up here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default LoginComponent;