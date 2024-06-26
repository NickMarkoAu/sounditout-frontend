import {StyleSheet, View} from "react-native";
import {faCameraRetro, faCirclePlay, faMagnifyingGlass, faNewspaper, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import NavButton from "./NavButton";
import ProfileButton from "../user/profile/ProfileButton";
import {useAppSelector, useTheme} from "../../state/hooks";
import {User} from "../user/user.model";
import {selectCurrentUser} from "../../state/song-suggestion.selector";
import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";

const NavigationComponent = ({navigation} : {navigation: StackNavigationProp}) => {
  const {colours} = useTheme;
  const user: User = useAppSelector(selectCurrentUser);
  const styles = StyleSheet.create({
    NavContainer: {
      position: "absolute",
      alignItems: "center",
      bottom: 0,
      zIndex: 9999,
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
    icon: {
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
        <NavButton onPress={() => navigation.navigate("Camera", {onComplete: (imageUri) => navigation.navigate("Generate", {imageUri})})} icon={faCameraRetro} styles={styles} size={iconSize}/>
        {/*<NavButton onPress={() => navigation.navigate("Player")} icon={faCirclePlay} styles={styles} size={iconSize}/>*/}
        <ProfileButton onPress={() => navigation.navigate("Profile", {user})} user={user}/>
      </View>
    </View>
  );
}

export default NavigationComponent;

