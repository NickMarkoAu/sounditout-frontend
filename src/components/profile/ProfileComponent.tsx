import {StyleSheet, SafeAreaView, View, ScrollView} from "react-native";
import ProfileIdComponent from "./profileid/ProfileIdComponent";
import SongPreviewComponent from "../video/preview/SongPreviewComponent";
import {UserContentRequest, UserProfile} from "../../state/song-suggestion.model";
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {selectCurrentProfile} from "../../state/song-suggestion.selector";
import {getUserProfileAction, setCurrentlyPlayingSong} from "../../state/song-suggestion.slice";
import ProfileActionButtons from "./actionbuttons/ProfileActionButtons";
import ProfilePosts from "./posts/ProfilePosts";
import {useEffect} from "react";

const ProfileComponent = ({user, navigation}) => {
  const dispatch = useAppDispatch();
  const profile: UserProfile = useAppSelector(selectCurrentProfile);

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
    }
  });

  const playSong = () => {
    dispatch(setCurrentlyPlayingSong(profile?.headlineSong));
  }

  useEffect(()=> {
    if(!profile) {
      console.log("User for profile", user);
      if(user) {
        const profileRequest: UserContentRequest = {user, page: 0};
        console.log("profileRequest: ", profileRequest);
        dispatch(getUserProfileAction({profileRequest}));
      }
    }
  }, [user]);

  return (
    <ScrollView style={styles.profileContainer}>
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