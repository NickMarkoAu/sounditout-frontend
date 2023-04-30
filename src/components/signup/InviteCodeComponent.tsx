import {Image, View, StyleSheet, TextInput, TouchableOpacity, Text} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import React, {useEffect, useState} from "react";
import {faKey} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector, useTheme} from "../../state/hooks";
import {validateInviteCodeAction} from "../../state/song-suggestion.slice";
import {selectLoading} from "../../state/song-suggestion.selector";

const InviteCodeComponent = ({navigation}) => {
  const {colours, fonts} = useTheme;
  const [inviteCode, setInviteCode] = useState('');
  const inviteCodeValid: boolean = useAppSelector(state => state.signup?.inviteCodeValid);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const isLoading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();

  const styles = StyleSheet.create({
    logo: {
      width: "80%",
      height: 85,
      resizeMode: "contain",
      marginBottom: 22
    },
    loginContainer: {
      height: "100%",
      width: "100%",
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
      flex: 1,
      padding: 30,
      height: undefined,
      alignSelf: 'stretch',
      marginBottom: 40,
      zIndex: 1
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
    redirectText: {
      color: colours.text_primary,
      fontFamily: fonts.primary
    },
    resetButton: {
      fontFamily: fonts.primary,
      color: colours.primary,
      fontSize: 12
    },
    signUpContainer: {
      justifyContent: "flex-end",
      flexDirection: "row",
    },
    noticeContainer: {
      marginBottom: 22
    },
    noticeText: {
      color: colours.grey
    },
    errorContainer: {
      marginBottom: 22
    },
    errorText: {
      color: colours.text_error,
      fontSize: 16,
      fontWeight: "bold"
    }
  })

  const validateCode = () => {
    setSubmitted(true);
    dispatch(validateInviteCodeAction({inviteCode}));
  }

  useEffect(() => {
    if(submitted && !inviteCodeValid) {
      setError("Invalid invite code");
      return;
    }
    navigation.navigate("Signup", {inviteCode})
  }, [submitted, inviteCodeValid])

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Image source={require("../../../assets/appidentity/logo.png")} style={styles.logo}/>
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>
            SoundItOut is currently in an invite only beta. If you have an invite code. Please enter it below to create an account. Otherwise please
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Waitlist")}>
            <Text style={styles.resetButton}>
              join the waitlist here
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <FontAwesomeIcon icon={faKey} color={colours.primary} size={30}/>
          <TextInput
            value={inviteCode}
            onChangeText={setInviteCode}
            style={styles.input}
            placeholder="Invite Code"
            placeholderTextColor="#7f7f7f"
          />
        </View>
        { error &&
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              Login Error: {error}
            </Text>
          </View> }
        <TouchableOpacity style={styles.loginButton} onPress={validateCode}>
          <View>
            <Text style={{color: "white", fontSize: 18}}>
              Validate
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.redirectText}>
            Already have an account?
          </Text>
          <TouchableOpacity style={{marginLeft: 3}} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.resetButton}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default InviteCodeComponent;