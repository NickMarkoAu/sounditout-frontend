import { VStack, Text } from 'native-base';
import {Image, StyleSheet, View} from 'react-native';
import ProfileButton from "../user/profile/ProfileButton";
import SongPreviewComponent from "../video/preview/SongPreviewComponent";
import ActionButtonsComponent from "../post/actionbuttons/ActionButtonsComponent";
import CommentBoxComponent from "../post/comments/CommentBoxComponent";

import {useAppDispatch, useTheme} from "../../state/hooks";
import {setCurrentlyPlayingSong} from "../../state/song-suggestion.slice";
import CommentsComponent from "./comments/CommentsComponent";
import {getImageSource} from "../../shared/image.utils";
import ProfileId from "../user/profile/ProfileId";

const PostComponent = ({navigation, post}) => {
  const {colours, fonts} = useTheme;
  const dispatch = useAppDispatch();

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
    infoContainer: {
      width: "90%",
      marginLeft: 20,
      height: undefined,
      flex: 1,
      alignSelf: 'stretch',
    },
    dateStyle: {
      marginLeft: 8,
      color: colours.text_primary
    },
    textStyle: {
      color: "white",
    },
    textContainer: {
      marginTop: 8,
      marginLeft: 8
    }
  });

  const playSong = () => {
    dispatch(setCurrentlyPlayingSong(post?.song));
  }

  //TODO add an empty post component with a loading spinner
  return (
     post &&
         <VStack style={styles.postContainer} space="2">
            <View style={styles.postHeader}>
              <ProfileId user={post.user} />
              <Text style={styles.dateStyle}>{post.date}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image source={{uri: post.image.presignedUrl}}
                     style={styles.image}/>
            </View>
            <View style={styles.infoContainer}>
              <SongPreviewComponent navigation={navigation} song={post?.song} onPress={playSong}/>
              {post?.likes && post.likes > 0 &&
                <View style={styles.textContainer}>
                <Text style={styles.textStyle}>
                  {post?.likes} likes
                </Text>
              </View>}
              <View style={styles.textContainer}>
                <Text style={styles.textStyle}>
                  {post?.content}
                </Text>
              </View>
              <ActionButtonsComponent />
              <CommentsComponent post={post} />
              <CommentBoxComponent post={post}/>
            </View>
         </VStack>
  );
}

export default PostComponent;