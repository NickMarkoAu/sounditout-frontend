import {FlatList, SafeAreaView, StyleSheet, StatusBar, View} from "react-native";
import PostComponent from "../post/PostComponent";
import {Divider} from "native-base";
import {Post, User} from "../../state/song-suggestion.model";
import {useAppDispatch, useAppSelector, useTheme} from "../../state/hooks";
import {selectCurrentUser, selectPosts} from "../../state/song-suggestion.selector";
import {useEffect} from "react";
import {getPostsForUserAction} from "../../state/song-suggestion.slice";

const FeedComponent = ({navigation}) => {
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(selectCurrentUser);
  const {colours} = useTheme;

  const styles = StyleSheet.create({
    scrollView: {
      width: "100%"
    },
    container: {
      flex: 1,
      marginTop: 88,
      width: "100%",
      height: undefined,
      alignSelf: 'stretch',
      marginBottom: 55,
      overflow: "visible"
    },
  });

  const posts: Post[] = useAppSelector(selectPosts);
  useEffect(() => {
    if (posts.length === 0) {
      dispatch(getPostsForUserAction({user}));
    }
  }, [posts.length, dispatch]);
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList style={styles.scrollView} data={posts}  renderItem={({item}) =>
        <View style={{overflow: "visible"}}>
          <PostComponent navigation={navigation} post={item}/>
          <Divider bg={colours.primary} style={{width: "100%"}}/>
      </View>
      }/>
    </SafeAreaView>
  )
}
export default FeedComponent;