import {FlatList, SafeAreaView, StyleSheet, StatusBar, View, RefreshControl} from "react-native";
import PostComponent from "../post/PostComponent";
import {Divider} from "native-base";
import {UserContentRequest, Post} from "../../state/song-suggestion.model";
import {useAppDispatch, useAppSelector, useTheme} from "../../state/hooks";
import {selectCurrentUser, selectLoading, selectPosts, selectPostsPage} from "../../state/song-suggestion.selector";
import {clearPosts, getPostsForUserAction} from "../../state/song-suggestion.slice";
import {User} from "../user/user.model";
import {useEffect} from "react";
import AnimatedLoader from "react-native-animated-loader";

const FeedComponent = ({navigation}) => {
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(selectCurrentUser);
  const posts: Post[] = useAppSelector(selectPosts);
  const {colours} = useTheme;
  const isLoading = useAppSelector(selectLoading);
  const page = useAppSelector(selectPostsPage);

  const styles = StyleSheet.create({
    scrollView: {
      width: "100%"
    },
    container: {
      flex: 1,
      marginTop: 100,
      width: "100%",
      height: undefined,
      alignSelf: 'stretch',
      marginBottom: 40,
      overflow: "visible"
    },
    loadingContainer: {
      height: "55%",
      marginTop: 16
    },
    loadingAnimation: {
      marginTop: 25,
      height: 30
    }
  });

  useEffect(()=> {
    if (!posts || posts.length === 0) {
      const feedRequest: UserContentRequest = {user, page}
      dispatch(getPostsForUserAction({feedRequest}));
    }
  }, []);

  const onRefresh = () => {
    const feedRequest: UserContentRequest = {user, page:0}
    dispatch(clearPosts());
    dispatch(getPostsForUserAction({feedRequest}));
  }

  const loadMorePosts = () => {
    const feedRequest: UserContentRequest = {user, page: page}
    dispatch(getPostsForUserAction({feedRequest}));
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList style={styles.scrollView} data={posts}
                onEndReached={loadMorePosts}
                refreshControl={<RefreshControl
                  colors={[colours.primary, colours.secondary]}
                  refreshing={isLoading}
                  onRefresh={onRefresh} />}
                  renderItem={({item}) =>
        <View style={{overflow: "visible"}}>
          <PostComponent navigation={navigation} post={item}/>
          <Divider bg={colours.primary} style={{width: "100%"}}/>
      </View>
      }/>
    </SafeAreaView>
  )
}
export default FeedComponent;