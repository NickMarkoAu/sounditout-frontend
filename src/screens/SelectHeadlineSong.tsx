import React from "react";
import {StyleSheet, View} from "react-native";
import {useTheme} from "../state/hooks";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {StatusBar} from "expo-status-bar";
import TopBarComponent from "../components/topbar/TopBarComponent";
import NavigationComponent from "../components/navigation/NavigationComponent";
import SelectHeadlineSongComponent from "../components/profile/editprofile/SelectHeadlineSongComponent";

const SelectHeadlineSong = ({navigation}) => {
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
        <SelectHeadlineSongComponent navigation={navigation}/>
        <NavigationComponent navigation={navigation} />
      </View>
    </NativeBaseProvider>
  )
}

export default SelectHeadlineSong;