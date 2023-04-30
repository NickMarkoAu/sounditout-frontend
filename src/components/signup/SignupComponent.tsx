import {Image, View, StyleSheet, TextInput, TouchableOpacity, Text} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import React, {useEffect} from "react";
import {faEnvelope, faLock, faUser, faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import {useAppSelector, useTheme} from "../../state/hooks";
import {selectAppInfo} from "../../state/song-suggestion.selector";
import {AppInfo} from "../../state/appinfo/app-info.model";

const SignupComponent = ({navigation}) => {
  const {colours} = useTheme;
  const inviteCode = navigation.state.params.inviteCode;
  const appInfo: AppInfo = useAppSelector(selectAppInfo);
  const alphaMode = appInfo?.alphaMode || true;

  const styles = StyleSheet.create({
    logo: {
      width: "80%",
      height: 75,
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
      marginBottom: 40,
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
      marginLeft: 3
    },
    orContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom:22
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
    }
  })

  useEffect(() => {
    //if they have somehow made it to this page in alpha mode and don't have a valid invite code, redirect back to the invite code page
    if(alphaMode && !inviteCode) {
      navigation.navigate("InviteCode");
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Image source={require("../../../assets/appidentity/logo.png")} style={styles.logo}/>
        <View style={styles.inputContainer}>
          <FontAwesomeIcon icon={faUser} color={colours.primary} size={30}/>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#7f7f7f"
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesomeIcon icon={faCalendarAlt} color={colours.primary} size={30}/>
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            placeholderTextColor="#7f7f7f"
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesomeIcon icon={faEnvelope} color={colours.primary} size={30}/>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#7f7f7f"
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesomeIcon icon={faLock} color={colours.primary} size={30}/>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#7f7f7f"
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesomeIcon icon={faLock} color={colours.primary} size={30}/>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#7f7f7f"
          />
        </View>
        <TouchableOpacity style={styles.loginButton}>
          <View>
            <Text style={{color: "white", fontSize: 18}}>
              Create Account
            </Text>
          </View>
        </TouchableOpacity>
        {/*<View style={styles.orContainer}>*/}
        {/*  <View style={styles.orLine} />*/}
        {/*  <View>*/}
        {/*    <Text style={styles.orText}>Or</Text>*/}
        {/*  </View>*/}
        {/*  <View style={styles.orLine} />*/}
        {/*</View>*/}
        {/*TODO add this back in eventually when we know which services we will let people authenticate with*/}
        {/*<View style={styles.servicesContainer}>*/}
        {/*  <Image source={require("../../../assets/streamingservices/spotify.png")} style={styles.serviceLogo}/>*/}
        {/*  <Image source={require("../../../assets/streamingservices/apple_music.png")} style={styles.serviceLogo}/>*/}
        {/*  <Image source={require("../../../assets/streamingservices/youtube_music.png")} style={styles.serviceLogo}/>*/}
        {/*</View>*/}
        <View style={styles.signUpContainer}>
          <Text style={{color: "white", fontSize: 16}}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.resetButton}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default SignupComponent;