import PlayerComponent from "../components/player/PlayerComponent";
import {StatusBar} from "expo-status-bar";
import TopBarComponent from "../components/topbar/TopBarComponent";
import NavigationComponent from "../components/navigation/NavigationComponent";
import React from "react";
import {StyleSheet, View} from "react-native";
import {useTheme} from "../state/hooks";

const Player = ({navigation}) => {
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
      //TODO make this data driven
      <PlayerComponent navigation={navigation} videoKey="rMbATaj7Il8"/>
      <NavigationComponent navigation={navigation}/>
    </View>
  );
}

export default Player;