import {View, StyleSheet, SafeAreaView} from "react-native";
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
      width: "100%",
      height: undefined,
      alignSelf: 'stretch',
      marginBottom: 55,
      overflow: "visible"
    }
  });

  const playSong = () => {
    dispatch(setCurrentlyPlayingSong(profile?.headlineSong));
  }

  useEffect(()=> {
    if(!profile) {
      const profileRequest: UserContentRequest = {user, page:0};
      dispatch(getUserProfileAction({profileRequest}));
    }
  }, []);

  return (
    <SafeAreaView style={styles.profileContainer}>
      <ProfileIdComponent profile={profile} />
      <SongPreviewComponent
        navigation={navigation}
        onPress={playSong}
        song={profile.headlineSong} />
      <ProfileActionButtons profile={profile} />
      <ProfilePosts profile={profile} />
    </SafeAreaView>
  )
}

export default ProfileComponent;