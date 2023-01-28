import {Image, Pressable, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";

const TopBarComponent = () => {
  const styles = StyleSheet.create({
    TopBarContainer: {
      position: "absolute",
      top: 35,
      left: -12,
      width: "100%",
      borderStyle: "solid",
      borderBottomColor: "#5D2A42",
      borderBottomWidth: 2,
      padding: 12,
      flexDirection: "row",
      flex: 2,
      display: "flex",
      justifyContent: "space-between",
      alignItems: 'center', //Centered vertically
      zIndex: 9999
    },
    Logo: {
      height: 25,
      resizeMode: "contain"
    },
    SendContainer: {
      right: 0,
      alignItems: "flex-end",
      justifyContent: 'flex-end'
    },
    Send: {
      alignSelf: 'flex-end',
      textAlign: 'right'
    }
  });

  return (
    <View style={styles.TopBarContainer}>
        <Image style={styles.Logo}
               source={require('../../../assets/logo.png')}
        />
      <Pressable style={styles.SendContainer}>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faPaperPlane} color="#F6BD60" size={20}/>
        </TouchableOpacity>
      </Pressable>
    </View>
  );
}

export default TopBarComponent;
