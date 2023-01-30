import {StyleSheet, View} from "react-native";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {StatusBar} from "expo-status-bar";
import TopBarComponent from "../components/topbar/TopBarComponent";
import FeedComponent from "../components/feed/FeedComponent";
import NavigationComponent from "../components/navigation/NavigationComponent";
import React from "react";

const Feed = ({navigation}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: undefined,
      backgroundColor: '#0C1713',
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