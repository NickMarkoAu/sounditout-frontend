import {useAppSelector, useTheme} from "../state/hooks";
import {StyleSheet, View} from "react-native";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {StatusBar} from "expo-status-bar";
import TopBarComponent from "../components/topbar/TopBarComponent";
import NavigationComponent from "../components/navigation/NavigationComponent";
import React from "react";
import CreatePostComponent from "../components/post/CreatePostComponent";
import {selectCurrentPost} from "../state/song-suggestion.selector";

const CreatePost = ({navigation}) => {
  const {colours} = useTheme;

  const post = useAppSelector(selectCurrentPost);

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
        <CreatePostComponent navigation={navigation} post={post}/>
        <NavigationComponent navigation={navigation} />
      </View>
    </NativeBaseProvider>
  )
}

export default CreatePost;