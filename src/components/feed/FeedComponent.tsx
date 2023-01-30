import {FlatList, SafeAreaView, StyleSheet, StatusBar, View} from "react-native";
import PostComponent from "../post/PostComponent";
import {Divider} from "native-base";
import {Post} from "../../state/song-suggestion.model";
import {useAppSelector} from "../../state/hooks";
import {selectPosts} from "../../state/song-suggestion.selector";

const FeedComponent = ({navigation}) => {
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
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList style={styles.scrollView} data={posts}  renderItem={({item}) =>
        <View style={{overflow: "visible"}}>
          <PostComponent navigation={navigation} post={item}/>
          <Divider bg="#F6BD60" style={{width: "100%"}}/>
      </View>
      }/>
    </SafeAreaView>
  )
}
export default FeedComponent;