import {Image, Pressable, View, StyleSheet, TouchableOpacity} from "react-native";
import {useAppDispatch, useTheme} from "../../../state/hooks";
import {getImageSource} from "../../../shared/image.utils";
import {refreshUserAction} from "../../../state/song-suggestion.slice";

const ProfileButton = ({onPress, user}) => {
  const {colours} = useTheme;
  const dispatch = useAppDispatch();

  const styles = StyleSheet.create({
    IconBehave: {
      padding: 8
    }, Circle: {
      width: 20,
      height: 20,
      flex: 1,
      alignSelf: 'stretch',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center' //Centered vertically
    }, CircleImage: {
      width: 30,
      height: 30,
      borderRadius: 50,
      borderWidth:1,
      borderColor: colours.primary,
      justifyContent: 'center',
      alignItems: 'center' //Centered vertically
    }
  });

  const onImageError = () => {
    console.log("Image error, user id is: ", user?.id)
    if(user && user.id) {
      dispatch(refreshUserAction({userId: user.id}));
    }
  }

    return (
      <Pressable onPress={onPress} style={styles.IconBehave}
                       android_ripple={{borderless: true, radius: 50}}>
      <View style={styles.Circle}>
        <TouchableOpacity>
        <Image
          style={styles.CircleImage}
          source={{uri: user.profileImage.presignedUrl}}
          onError={onImageError}
        />
        </TouchableOpacity>
      </View>
    </Pressable>
    );
}

export default ProfileButton;