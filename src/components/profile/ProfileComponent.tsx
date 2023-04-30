import {StyleSheet, SafeAreaView, View, ScrollView, TouchableOpacity} from "react-native";
import ProfileIdComponent from "./profileid/ProfileIdComponent";
import SongPreviewComponent from "../video/preview/SongPreviewComponent";
import {UserContentRequest, UserProfile} from "../../state/song-suggestion.model";
import {useAppDispatch, useAppSelector, useTheme} from "../../state/hooks";
import {selectCurrentProfile} from "../../state/song-suggestion.selector";
import {
  getUserProfileAction,
  removeCurrentUserAction,
  setCurrentlyPlayingSong
} from "../../state/song-suggestion.slice";
import ProfileActionButtons from "./actionbuttons/ProfileActionButtons";
import ProfilePosts from "./posts/ProfilePosts";
import {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import * as SecureStore from "expo-secure-store";

const ProfileComponent = ({user, navigation}) => {
  const dispatch = useAppDispatch();
  const profile: UserProfile = useAppSelector(selectCurrentProfile);
  const {colours} = useTheme;
  const isOwn = profile?.own;

  const styles = StyleSheet.create({
    profileContainer: {
      flex: 1,
      marginTop: 100,
      height: undefined,
      alignSelf: 'stretch',
      marginBottom: 40,
      zIndex: 1
    },
    songPreviewContainer: {
      marginLeft: 16,
      marginTop: 8
    },
    actionButtonContainer: {
      marginTop: 8
    },
    profilePostsContainer: {
      marginTop: 0
    },
    backButtonContainer: {
      position: 'absolute',
      top: 16,
      right: 16,
      zIndex: 2
    },
    backButton: {}
  });

  const playSong = () => {
    dispatch(setCurrentlyPlayingSong(profile?.headlineSong));
  }

  useEffect(()=> {
    if(user) {
        const profileRequest: UserContentRequest = {user, page: 0};
        console.log("profileRequest: ", profileRequest);
        dispatch(getUserProfileAction({profileRequest}));
      }
  }, []);

  const logout = () => {
    console.log("Logging out");
    SecureStore.deleteItemAsync('secure_token');
    dispatch(removeCurrentUserAction());
  }

  return (
    <ScrollView style={styles.profileContainer}>
      {isOwn ?
      <TouchableOpacity style={styles.backButtonContainer} onPress={logout}>
        <View style={styles.backButton} >
          <FontAwesomeIcon icon={faSignOutAlt} size={20} color={colours.primary}/>
        </View>
      </TouchableOpacity> : null}
      <ProfileIdComponent profile={profile} />
      <View style={styles.songPreviewContainer}>
        <SongPreviewComponent
          navigation={navigation}
          onPress={playSong}
          song={profile?.headlineSong} />
        </View>
      <View style={styles.actionButtonContainer}>
        <ProfileActionButtons profile={profile} navigation={navigation} />
      </View>
      <View style={styles.profilePostsContainer}>
        <ProfilePosts profile={profile} />
      </View>
    </ScrollView>
  )
}

export default ProfileComponent;