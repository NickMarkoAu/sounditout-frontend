import {StyleSheet, Text, View} from "react-native";
import SongPost from "./SongPost";
import {useAppSelector, useTheme} from "../../../state/hooks";
import {selectLoading} from "../../../state/song-suggestion.selector";
import AnimatedLoader from "react-native-animated-loader";
import {Post} from "../../../state/song-suggestion.model";

const SongPosts = ({posts = []} : {posts: Post[]}) => {
  const loading = useAppSelector(selectLoading);
  const {colours} = useTheme;
  const styles = StyleSheet.create({
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
    <View>
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
          <SongPost post={post} key={key}/>
        );
      })}
    </View>
  );
}

export default SongPosts;