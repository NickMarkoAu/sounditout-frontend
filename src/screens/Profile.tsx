import React from "react";
import {StyleSheet, View} from "react-native";
import {useTheme} from "../state/hooks";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {StatusBar} from "expo-status-bar";
import TopBarComponent from "../components/topbar/TopBarComponent";
import NavigationComponent from "../components/navigation/NavigationComponent";
import ProfileComponent from "../components/profile/ProfileComponent";
import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";

const Profile = ({navigation}: {navigation: StackNavigationProp}) => {
  const {colours} = useTheme;
  const user = navigation.state.params.user;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: undefined,
      backgroundColor: colours.background,
    },
    text: {
      position: "absolute"
    }
  })

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <StatusBar style="light"/>
        <TopBarComponent/>
        <ProfileComponent user={user} navigation={navigation}/>
        <NavigationComponent navigation={navigation} />
      </View>
    </NativeBaseProvider>
  )
}

export default Profile;