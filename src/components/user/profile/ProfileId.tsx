import ProfileButton from "./ProfileButton";
import {Text} from "native-base";
import {View, StyleSheet} from "react-native";
import {useTheme} from "../../../state/hooks";
import {User} from "../user.model";

const ProfileId = ({user} : {user: User}) => {
  const {colours, fonts} = useTheme;

  const styles = StyleSheet.create({
    profileId: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    nameStyle: {
      color: colours.text_primary,
      fontFamily: fonts.primary,
      marginLeft: 3
    }
  });

  const showProfile = () => {
    //TODO make this go to the user profile
  }

  return (
    <View style={styles.profileId}>
      <ProfileButton onPress={showProfile} user={user}/>
      <Text style={styles.nameStyle}>{user?.name}</Text>
    </View>
  )
}

export default ProfileId;