import { Box, VStack, Text } from 'native-base';
import {Image, StyleSheet, View} from 'react-native';
import ProfileButton from "../navigation/ProfileButton";
import SongPreviewComponent from "../video/preview/SongPreviewComponent";
import ActionButtonsComponent from "../post/actionbuttons/ActionButtonsComponent";
import CommentBoxComponent from "../post/commentbox/CommentBoxComponent";
import {Post} from "../../state/song-suggestion.model";

const PostComponent = ({navigation, post}) => {
  const styles = StyleSheet.create({
    imageContainer: {
      width: "100%",
      height: undefined,
      flex: 1,
      alignSelf: 'stretch',
    },
    image: {
      width: "100%",
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'cover',
      marginBottom: 0
    },
    postContainer: {
      width: "100%",
      flexDirection: "column",
      paddingBottom: 14,
      paddingTop: 14,
    },
    postHeader: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: 'center',
      marginLeft: 20
    },
    profileId: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    infoContainer: {
      width: "90%",
      marginLeft: 20,
      height: undefined,
      flex: 1,
      alignSelf: 'stretch',
    }
  });

  const typedPost = post as Post;
  return (
    typedPost &&
        <VStack style={styles.postContainer} space="2">
            <Box style={styles.postHeader}>
              <View style={styles.profileId}>
                <ProfileButton onPress={() => {}} />
                <Text style={{color: "white", marginLeft: 3}}>{typedPost.user.name}</Text>
              </View>
              <Text style={{color: "white"}}>{typedPost.date.toDateString()}</Text>
            </Box>
            <View style={styles.imageContainer}>
              <Image source={{uri: typedPost.image.url}}
                     style={styles.image}/>
            </View>
            <View style={styles.infoContainer}>
              <SongPreviewComponent navigation={navigation} videoKey={typedPost.song.youtubeVideoId}/>
              <ActionButtonsComponent />
              <Text style={{color: "white"}}>
                {typedPost.content}
              </Text>
              <CommentBoxComponent />
            </View>
        </VStack>
  );
}

export default PostComponent;