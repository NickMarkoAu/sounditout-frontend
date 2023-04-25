import {StyleSheet, TouchableOpacity, View} from "react-native";
import {ProfileViewMode} from "../../../state/song-suggestion.model";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {useTheme} from "../../../state/hooks";
import {faCameraRetro, faMusic} from "@fortawesome/free-solid-svg-icons";
import ImagePosts from "../../post/postviews/ImagePosts";
import SongPosts from "../../post/postviews/SongPosts";

const ProfilePosts = ({profile}) => {
  const [viewMode, setViewMode] = useState(ProfileViewMode.IMAGE);
  const {colours, fonts} = useTheme;

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    viewModeButtons: {
      width: "90%",
      marginTop: 8,
      marginRight: 8,
      marginLeft: 8,
      flexDirection: "row",
      justifyContent: 'space-around',
    },
    icon: {
      marginBottom: 6
    },
    active: {
      borderBottomWidth: 3,
      borderBottomColor: colours.primary
    },
    viewModeButton: {
      alignSelf: 'stretch',
      flexGrow: 1,
      margin: 8,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

  const changeViewMode = (mode: ProfileViewMode) => () => {
    setViewMode(mode);
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewModeButtons}>
        <TouchableOpacity style={[styles.viewModeButton, viewMode === ProfileViewMode.IMAGE && styles.active]}
                          onPress={changeViewMode(ProfileViewMode.IMAGE)}>
          <FontAwesomeIcon style={styles.icon} icon={faCameraRetro} size={25} color={colours.primary}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.viewModeButton, viewMode === ProfileViewMode.SONG && styles.active]}
                          onPress={changeViewMode(ProfileViewMode.SONG)}>
          <FontAwesomeIcon style={styles.icon} icon={faMusic} size={25} color={colours.primary}/>
        </TouchableOpacity>
      </View>
      {viewMode === ProfileViewMode.IMAGE ?
        <ImagePosts posts={profile?.posts}/>
        :
        <SongPosts posts={profile?.posts}/>
      }
    </View>
  )
}

export default ProfilePosts;