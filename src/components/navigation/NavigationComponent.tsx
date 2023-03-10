import {StyleSheet, View} from "react-native";
import {faCameraRetro, faCirclePlay, faMagnifyingGlass, faNewspaper, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import NavButton from "./NavButton";
import ProfileButton from "./ProfileButton";
import {useTheme} from "../../state/hooks";

const NavigationComponent = ({navigation}) => {
  const {colours} = useTheme;

  const styles = StyleSheet.create({
    NavContainer: {
      position: "absolute",
      alignItems: "center",
      bottom: 0,
    },
    NavBar: {
      flexDirection: "row",
      backgroundColor: colours.background,
      borderStyle: "solid",
      borderTopColor: colours.secondary,
      borderTopWidth: 3,
      width: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'center', //Centered vertically
      flex: 1
    },
    IconBehave: {
      padding: 8
    }
  });


  const cameraIconSize = 35;
  const iconSize = 25;
  return (
    <View style={styles.NavContainer}>
      <View style={styles.NavBar}>
        <NavButton onPress={() => navigation.navigate("Feed")} icon={faNewspaper} styles={styles} size={iconSize}/>
        <NavButton onPress={() => navigation.navigate("Search")} icon={faMagnifyingGlass} styles={styles} size={iconSize}/>
        <NavButton onPress={() => navigation.navigate("Camera")} icon={faCameraRetro} styles={styles} size={cameraIconSize}/>
        <NavButton onPress={() => navigation.navigate("CreatePost")} icon={faSquarePlus} styles={styles} size={iconSize}/>
        <NavButton onPress={() => navigation.navigate("Player")} icon={faCirclePlay} styles={styles} size={iconSize}/>
        <ProfileButton onPress={() => navigation.navigate("Profile")}/>
      </View>
    </View>
  );
}

export default NavigationComponent;

