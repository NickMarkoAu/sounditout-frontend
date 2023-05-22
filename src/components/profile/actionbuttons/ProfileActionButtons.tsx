import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {useAppDispatch, useTheme} from "../../../state/hooks";
import {toggleFollowUserAction} from "../../../state/song-suggestion.slice";
import {useState} from "react";
import {UserProfile} from "../../../state/song-suggestion.model";
import {User} from "../../user/user.model";
import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";

const ProfileActionButtons = ({profile, navigation} : {profile: UserProfile, navigation: StackNavigationProp}) => {
  const isOwn = profile?.own;
  const [isFollowing, setIsFollowing] = useState(profile?.following);
  const {colours} = useTheme;
  const dispatch = useAppDispatch();
  const user: User = profile?.user;

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
    followed: {
      backgroundColor: colours.grey
    },
    buttonText: {

    }
  });

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    dispatch(toggleFollowUserAction({user}));
  }

  return (
    <View style={styles.container}>
      {isOwn ?
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditProfile", {user})}>
          <Text style={styles.buttonText}>
            Edit Profile
          </Text>
        </TouchableOpacity> :
          <TouchableOpacity style={[styles.button, isFollowing && styles.followed]} onPress={toggleFollow}>
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