import {StyleSheet, Text, View} from "react-native";
import {useAppSelector, useTheme} from "../../../state/hooks";
import {selectLoading} from "../../../state/song-suggestion.selector";
import AnimatedLoader from "react-native-animated-loader";
import HeadlineSong from "./HeadlineSong";
import {Post, UserProfile} from "../../../state/song-suggestion.model";
import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";

const HeadlineSongs = ({profile, navigation} : {profile: UserProfile, navigation: StackNavigationProp}) => {
  const loading = useAppSelector(selectLoading);
  const {colours} = useTheme;
  const posts: Post[] = profile?.posts || [];


  const styles = StyleSheet.create({
    container: {
      padding: 8
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
  })

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
      {!loading && posts?.length == 0 ?
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>
            No results...
          </Text>
        </View>
        : null
      }
      {posts && posts.map((post, key) => {
        return (
          <HeadlineSong post={post} profile={profile} key={key} navigation={navigation}/>
        );
      })}
    </View>
  );
}

export default HeadlineSongs;