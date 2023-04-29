import {View, StyleSheet, Image, Text, TextInput, TouchableOpacity} from "react-native";
import {useAppDispatch, useAppSelector, useTheme} from "../../../state/hooks";
import {UserContentRequest, UserProfile} from "../../../state/song-suggestion.model";
import {selectCurrentProfile} from "../../../state/song-suggestion.selector";
import {useEffect, useState} from "react";
import {getUserProfileAction, setCurrentlyPlayingSong} from "../../../state/song-suggestion.slice";
import SongPreviewComponent from "../../video/preview/SongPreviewComponent";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const EditProfileComponent = ({user, navigation}) => {
  const {colours, fonts} = useTheme;
  const profile: UserProfile = useAppSelector(selectCurrentProfile);
  const dispatch = useAppDispatch();
  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState(profile?.bio);

  const styles = StyleSheet.create({
    editProfileContainer: {
      flex: 1,
      marginTop: 110,
      height: undefined,
      alignSelf: 'stretch',
      marginBottom: 40,
      zIndex: 1
    },
    profileImageContainer: {
      justifyContent: 'center',
      alignItems: "center",
      padding: 16
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
    fieldContainer: {
      flexDirection: 'row',
      width: "100%",
      paddingLeft: 16,
      paddingRight: 16,
      alignItems: "center",
      paddingBottom: 8,
      paddingTop: 8
    },
    multiFieldContainer: {
      width: "100%",
      paddingLeft: 16,
      paddingRight: 16,
      alignItems: "flex-start"
    },
    inputContainer: {
      borderColor: colours.secondary,
      borderStyle: "solid",
      borderWidth: 2,
      padding: 6,
      marginLeft: 8,
      alignSelf: "stretch",
      flexGrow: 1,
      alignItems: "flex-start"
    },
    inputLabel: {
      fontFamily: fonts.primary,
      color: colours.text_primary,
      alignItems: 'center' //Centered vertically
    },
    multiLabel: {
      fontFamily: fonts.primary,
      color: colours.text_primary,
      alignItems: 'center',
      marginBottom: 8
    },
    input: {
      height: 25,
      color: colours.grey,
      borderWidth: 0,
      width: "100%",

    },
    multiInput: {
      color: colours.grey,
      borderWidth: 0,
      width: "100%",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      textAlignVertical: 'top'
    },
    changeSongButton: {
      width: "40%",
      height: 30,
      marginLeft: 8,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colours.primary,
      borderRadius: 18,
    },
    buttonText: {},
    songPreviewContainer: {
      marginLeft: 16,
      marginTop: 8
    },
    songChangeContainer: {
      flexDirection: "row",
      alignItems: 'center'
    },
    saveButtonContainer: {
      justifyContent: "center",
      alignItems: "center"
    },
    saveButton: {
      height: 45,
      width: "40%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colours.primary,
      borderRadius: 15,
      margin: 16
    },
    backButtonContainer: {
      position: 'absolute',
      top: 8,
      left: 8,
    },
    backButton: {}
  });

  useEffect(() => {
    if (!profile) {
      console.log("User for profile", user);
      if (user) {
        const profileRequest: UserContentRequest = {user, page: 0};
        console.log("profileRequest: ", profileRequest);
        dispatch(getUserProfileAction({profileRequest}));
      }
    }
  }, [user]);

  const changeSong = () => {

  }

  const playSong = () => {
    dispatch(setCurrentlyPlayingSong(profile?.headlineSong));
  }

  const saveProfile = () => {

  }

  return (
    <View style={styles.editProfileContainer}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} color={colours.primary}/>
        </TouchableOpacity>
      </View>
      <View style={styles.profileImageContainer}>
        <View style={styles.circle}>
          <Image
            style={styles.image}
            source={{uri: user?.profileImage?.presignedUrl}}
          />
        </View>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.inputLabel}>
          Name:
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={name}
            style={styles.input}
            placeholder="Add tags..."
            placeholderTextColor="#7f7f7f"
            onChangeText={(text) => setName(text)}
          />
        </View>
      </View>
        <View style={styles.songPreviewContainer}>
          <View style={styles.songChangeContainer}>
          <Text style={styles.inputLabel}>
            Headline Song:
          </Text>
          <TouchableOpacity style={styles.changeSongButton} onPress={changeSong}>
            <Text style={styles.buttonText}>
              Change
            </Text>
          </TouchableOpacity>
          </View>
          <SongPreviewComponent
            navigation={navigation}
            onPress={playSong}
            song={profile?.headlineSong}/>
        </View>
      <View style={styles.multiFieldContainer}>
        <Text style={styles.multiLabel}>
          Bio:
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            multiline
            numberOfLines={8}
            value={bio}
            style={styles.multiInput}
            placeholder="Add tags..."
            placeholderTextColor="#7f7f7f"
            onChangeText={(text) => setBio(text)}
          />
        </View>
      </View>
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.buttonText}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EditProfileComponent;