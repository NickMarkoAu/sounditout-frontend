import {View, StyleSheet, Text} from "react-native";
import ProfileListId from "./ProfileListId";
import {useAppSelector, useTheme} from "../../../state/hooks";
import {selectLoading} from "../../../state/song-suggestion.selector";
import AnimatedLoader from "react-native-animated-loader";

const ProfileList = ({profiles = [], navigation}) => {
  const loading = useAppSelector(selectLoading)
  const {colours} = useTheme;

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      paddingLeft: 8,
      paddingRight: 8,
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 8
    },
    noResultsContainer: {
      width: "100%",
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 8
    },
    noResultsText: {
      color: colours.grey,
      fontSize: 16
    },
    loadingContainer: {
      height: "100%",
    },
    loadingAnimation: {
      height: 100
    }
  });

  return (
    <View style={styles.container}>
      {loading ?
        <View style={styles.loadingContainer}>
          <AnimatedLoader
            visible={true}
            source={require("../../../../assets/animation/loading_small.json")}
            animationStyle={styles.loadingAnimation}
            speed={1}
          />
        </View>
        : null}
      {!loading && profiles?.length == 0 ?
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>
            No results...
          </Text>
        </View>
        : null
      }
      {profiles.map((profile, key) => {
        return (
          <ProfileListId profile={profile} key={key} navigation={navigation}/>
        );
      })
      }
    </View>
  );
}

export default ProfileList;