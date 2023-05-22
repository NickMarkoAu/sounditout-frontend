import PlayerComponent from "../components/player/PlayerComponent";
import {StatusBar} from "expo-status-bar";
import TopBarComponent from "../components/topbar/TopBarComponent";
import NavigationComponent from "../components/navigation/NavigationComponent";
import React from "react";
import {StyleSheet, View} from "react-native";
import {useTheme} from "../state/hooks";
import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";
import {Song} from "../state/song-suggestion.model";

const Player = ({navigation, song}: {navigation: StackNavigationProp, song: Song}) => {
  const {colours} = useTheme;

  //TODO add song key here
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: undefined,
      alignSelf: "stretch",
      backgroundColor: colours.background,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: "visible"
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light"/>
      <TopBarComponent/>
      {/*//TODO make this data driven*/}
      <PlayerComponent song={song}/>
      <NavigationComponent navigation={navigation}/>
    </View>
  );
}

export default Player;