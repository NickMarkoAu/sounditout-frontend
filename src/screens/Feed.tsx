import {StyleSheet, View} from "react-native";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {StatusBar} from "expo-status-bar";
import TopBarComponent from "../components/topbar/TopBarComponent";
import FeedComponent from "../components/feed/FeedComponent";
import NavigationComponent from "../components/navigation/NavigationComponent";
import React from "react";
import {useTheme} from "../state/hooks";
import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";

const Feed = ({navigation}: {navigation: StackNavigationProp}) => {
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
        <FeedComponent navigation={navigation}/>
        <NavigationComponent navigation={navigation} />
      </View>
    </NativeBaseProvider>
  )
}

export default Feed;