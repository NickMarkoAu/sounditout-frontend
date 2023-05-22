import {Image, View, StyleSheet, TouchableOpacity} from "react-native";
import {useAppDispatch, useTheme} from "../../../state/hooks";
import {refreshUserAction} from "../../../state/song-suggestion.slice";
import {User} from "../user.model";

const ProfileButton = ({onPress, user} : {onPress: ()=> void, user: User}) => {
  const {colours} = useTheme;
  const dispatch = useAppDispatch();

  const styles = StyleSheet.create({
    icon: {
      padding: 8
    }, circle: {
      width: 20,
      height: 20,
      flex: 1,
      alignSelf: 'stretch',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center' //Centered vertically
    }, image: {
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
      <View style={styles.icon}>
      <View style={styles.circle}>
        <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.image}
          source={{uri: user.profileImage.presignedUrl}}
          onError={onImageError}
        />
        </TouchableOpacity>
      </View>
    </View>
    );
}

export default ProfileButton;