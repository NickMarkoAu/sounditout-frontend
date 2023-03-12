import {FlatList, SafeAreaView, StyleSheet, StatusBar, View, RefreshControl} from "react-native";
import PostComponent from "../post/PostComponent";
import {Divider} from "native-base";
import {Post} from "../../state/song-suggestion.model";
import {useAppDispatch, useAppSelector, useTheme} from "../../state/hooks";
import {selectCurrentUser, selectLoading, selectPosts} from "../../state/song-suggestion.selector";
import {getPostsForUserAction} from "../../state/song-suggestion.slice";
import {User} from "../user/user.model";
import {useEffect, useState} from "react";

const FeedComponent = ({navigation}) => {
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(selectCurrentUser);
  const posts: Post[] = useAppSelector(selectPosts);
  const {colours} = useTheme;
  const isLoading = useAppSelector(selectLoading);

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

  useEffect(()=> {
    if (posts.length === 0) {
      dispatch(getPostsForUserAction({user}));
    }
  }, []);

  const onRefresh = () => {
    dispatch(getPostsForUserAction({user}));
  }


  return (
    <SafeAreaView style={styles.container}>
      <FlatList style={styles.scrollView} data={posts}
                refreshControl={<RefreshControl
                  colors={["#9Bd35A", "#689F38"]}
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