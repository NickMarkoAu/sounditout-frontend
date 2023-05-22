import {View, StyleSheet, Text, Image, TouchableOpacity} from "react-native";
import {useAppDispatch, useTheme} from "../../../state/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import {setCurrentlyPlayingSong, updateCurrentProfile} from "../../../state/song-suggestion.slice";
import {User} from "../../user/user.model";
import {UserProfile} from "../../../state/song-suggestion.model";
import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";

const ProfileListId = ({profile, navigation} : {profile: UserProfile, navigation: StackNavigationProp}) => {
  const {colours, fonts} = useTheme;
  const dispatch = useAppDispatch();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    circle: {
      width: 80,
      height: 80,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center' //Centered vertically
    },
    image: {
      width: 90,
      height: 90,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: colours.primary,
      justifyContent: 'center',
      alignItems: 'center' //Centered vertically
    },
    profileInfoContainer: {
      flexDirection: "column",
      justifyContent: "center",
    },
    profileImageContainer: {
      marginLeft: 12,
      marginRight: 12
    },
    profileName: {
      fontFamily: fonts.primary,
      color: colours.text_primary
    },
    songName: {
      fontFamily: fonts.primary,
      color: colours.text_primary
    },
    artistName: {
      fontFamily: fonts.primary,
      color: colours.text_primary
    },
    playIconContainer: {
      position: "absolute",
      top: "50%",
      left: "50%",
      alignItems: "center",
      justifyContent: "center",
      transform: [{translateX: -15}, {translateY: -15}],
    },
    playIcon: {
      color: colours.primary,
      opacity: 0.85
    },
  })

  const playSong = () => {
    dispatch(setCurrentlyPlayingSong(profile?.headlineSong));
  }

  const goToProfile = () => {
    const user: User = profile?.user;
    console.log("Going to user, ", user)
    dispatch(updateCurrentProfile({...profile}));
    navigation.navigate("Profile", {user})
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileInfoContainer} onPress={goToProfile}>
        <Text style={styles.profileName}>
          {profile?.user?.name}
        </Text>
      </TouchableOpacity>
      <View style={styles.profileImageContainer}>
        <View style={styles.circle}>
          <Image
            style={styles.image}
            source={{uri: profile?.user?.profileImage?.presignedUrl}}
          />
          <TouchableOpacity style={styles.playIconContainer} onPress={playSong}>
            <FontAwesomeIcon size={30} style={styles.playIcon} icon={faPlayCircle}/>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.profileInfoContainer} onPress={goToProfile}>
        <Text style={styles.songName}>
          {profile?.headlineSong?.name}
        </Text>
        <Text style={styles.artistName}>
          {profile?.headlineSong?.artist}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileListId;