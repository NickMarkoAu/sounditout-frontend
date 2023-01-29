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
  
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList style={styles.scrollView} data={data}  renderItem={({item}) =>
        <View style={{overflow: "visible"}}>
          <PostComponent navigation={navigation}/>
          <Divider bg="#F6BD60" style={{width: "100%"}}/>
      </View>
      }/>
    </SafeAreaView>
  )
}
export default FeedComponent;