import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCompactDisc} from "@fortawesome/free-solid-svg-icons";
import {useAppSelector, useTheme} from "../../state/hooks";
import {selectCurrentUser} from "../../state/song-suggestion.selector";

const TopBarComponent = () => {
  const {colours} = useTheme;
  const user = useAppSelector(selectCurrentUser);
  const totalTokens = user.tokens.tokens + user.tokens.freeTokens;

  const styles = StyleSheet.create({
    topBarContainer: {
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
    logo: {
      width: "40%",
      height: 30,
      resizeMode: "contain"
    },
    tokenButton: {
      padding: 4,
      justifyContent: "space-around",
      gap: 4,
      alignItems: "center",
      backgroundColor: colours.primary,
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'row',
      marginLeft: 8,
      opacity: 1
    },
    text: {
      color: colours.text_dark,
      fontWeight: "bold"
    }
  });

  const tokensModal = () => {
    //TODO create a popup modal for purchasing tokens and show it here
  }

  return (
    <View style={styles.topBarContainer}>
        <Image style={styles.logo}
               source={require('../../../assets/appidentity/logo.png')}
        />
        <TouchableOpacity style={styles.tokenButton} onPress={tokensModal}>
          <FontAwesomeIcon icon={faCompactDisc} color={colours.text_dark} size={15}/>
          <Text style={styles.text}>
            {totalTokens}
          </Text>
        </TouchableOpacity>
    </View>
  );
}

export default TopBarComponent;
