import {Image, StyleSheet, View, Text} from "react-native";
import {useTheme} from "../../../state/hooks";
import {UserProfile} from "../../../state/song-suggestion.model";

const ProfileIdComponent = ({profile} : {profile: UserProfile}) => {
  const {colours, fonts} = useTheme;

  const styles = StyleSheet.create({
    profileIdContainer: {
      flexDirection: 'row',
      marginTop: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileInfoContainer: {
      flexDirection: "column"
    },
    profileNameContainer: {
      marginLeft: 12
    },
    profileName: {
      fontFamily: fonts.primary,
      color: colours.text_primary
    },
    profileStatsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginLeft: 16
    },
    profileStatContainer: {
      flexDirection: "column",
      width: "22%",
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileStat: {
      fontFamily: fonts.primary,
      fontSize: 33,
      color: colours.text_primary,
      alignItems: 'center',
      justifyContent: 'center'
    },
    profileStatLabel: {
      fontFamily: fonts.secondary,
      color: colours.text_primary,
      fontSize: 10
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
    }
  });

  return(
    <View style={styles.profileIdContainer}>
      <View style={styles.circle}>
        <Image
            style={styles.image}
            source={{uri: profile?.user?.profileImage?.presignedUrl}}
          />
      </View>
      <View style={styles.profileInfoContainer}>
        <View style={styles.profileNameContainer}>
          <Text style={styles.profileName}>
            {profile?.user?.name}
          </Text>
        </View>
        <View style={styles.profileStatsContainer}>
          <View style={styles.profileStatContainer}>
            <Text style={styles.profileStat}>
              {profile?.postsCount || 0}
            </Text>
            <Text style={styles.profileStatLabel}>
              Posts
            </Text>
          </View>
          <View style={styles.profileStatContainer}>
            <Text style={styles.profileStat}>
              {profile?.followersCount || 0}
            </Text>
            <Text style={styles.profileStatLabel}>
              Followers
            </Text>
          </View>
          <View style={styles.profileStatContainer}>
            <Text style={styles.profileStat}>
              {profile?.followingCount || 0}
            </Text>
            <Text style={styles.profileStatLabel}>
              Following
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ProfileIdComponent;