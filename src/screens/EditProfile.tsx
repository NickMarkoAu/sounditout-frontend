import React from "react";
import {StyleSheet, View} from "react-native";
import {useTheme} from "../state/hooks";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {StatusBar} from "expo-status-bar";
import TopBarComponent from "../components/topbar/TopBarComponent";
import NavigationComponent from "../components/navigation/NavigationComponent";
import EditProfileComponent from "../components/profile/editprofile/EditProfileComponent";
import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";

const EditProfile = ({navigation}: {navigation: StackNavigationProp}) => {
  const {colours} = useTheme;

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
        <EditProfileComponent navigation={navigation}/>
        <NavigationComponent navigation={navigation} />
      </View>
    </NativeBaseProvider>
  )
}

export default EditProfile;