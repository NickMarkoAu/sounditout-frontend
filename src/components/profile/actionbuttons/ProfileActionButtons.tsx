import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {useAppDispatch, useTheme} from "../../../state/hooks";

const ProfileActionButtons = ({profile}) => {
  const isOwn = profile?.own;
  const isFollowing = profile?.following;
  const {colours} = useTheme;
  const dispatch = useAppDispatch();

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonCluster: {
      width: "90%",
      margin: 8,
      flexDirection: "row",
      justifyContent:'space-around'
    },
    button: {
      height: 35,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colours.primary,
      borderRadius: 10,
      alignSelf:'stretch',
      flexGrow: 1,
      margin: 8
    },
    followDropdown: {
      height: 35,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colours.grey,
      borderRadius: 10,
      alignSelf:'stretch',
      flexGrow: 1,
      margin: 8
    },
  });

  const toggleFollow = () => {
    dispatch(toggleFollowUserAction(profile?.user));
  }

  return (
    <View style={styles.container}>
      {isOwn ?
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Edit Profile
          </Text>
        </TouchableOpacity> :
          <TouchableOpacity style={styles.button} onPress={toggleFollow}>
            <Text style={styles.buttonText}>
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </TouchableOpacity>}
          {/*add this back in when we add a messaging feature*/}
          {/*<TouchableOpacity style={styles.button}>*/}
          {/*  <Text style={styles.buttonText}>*/}
          {/*    Message*/}
          {/*  </Text>*/}
          {/*</TouchableOpacity>*/}
    </View>
  );
}

export default ProfileActionButtons;