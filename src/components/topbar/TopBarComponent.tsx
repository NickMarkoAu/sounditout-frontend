import {Image, Pressable, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {useTheme} from "../../state/hooks";

const TopBarComponent = () => {
  const {colours} = useTheme;

  const styles = StyleSheet.create({
    TopBarContainer: {
      position: "absolute",
      left: 0,
      top: 35,
      width: "100%",
      borderStyle: "solid",
      borderBottomColor: colours.secondary,
      borderBottomWidth: 2,
      padding: 12,
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-between",
      alignItems: 'center', //Centered vertically
      zIndex: 9999
    },
    Logo: {
      width: "40%",
      height: 30,
      resizeMode: "contain"
    },
    SendContainer: {

    },
    Send: {

    }
  });

  return (
    <View style={styles.TopBarContainer}>
        <Image style={styles.Logo}
               source={require('../../../assets/appidentity/logo.png')}
        />
      <Pressable style={styles.SendContainer}>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faPaperPlane} color={colours.primary} size={20}/>
        </TouchableOpacity>
      </Pressable>
    </View>
  );
}

export default TopBarComponent;
