import GenerateComponent from "../components/generate/GenerateComponent";
import {StatusBar} from "expo-status-bar";
import TopBarComponent from "../components/topbar/TopBarComponent";
import React from "react";
import NavigationComponent from "../components/navigation/NavigationComponent";
import {StyleSheet, View} from "react-native";

const Generate = ({navigation, image}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: undefined,
      alignSelf: "stretch",
      backgroundColor: '#0C1713',
      alignItems: 'center',
      overflow: "visible"
    },
    text: {
      position: "absolute"
    }
  })
  return (
    <View style={styles.container}>
      <StatusBar style="light"/>
      <TopBarComponent/>
      <GenerateComponent navigation={navigation} image={image}/>
      <NavigationComponent navigation={navigation}/>
    </View>
  );
}

export default Generate;