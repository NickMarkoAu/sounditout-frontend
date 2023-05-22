import { VStack, Text } from 'native-base';
import {Image, StyleSheet, View} from 'react-native';
import SongPreviewComponent from "../video/preview/SongPreviewComponent";
import ActionButtonsComponent from "../post/actionbuttons/ActionButtonsComponent";
import CommentBoxComponent from "../post/comments/CommentBoxComponent";
import {useAppDispatch, useAppSelector, useTheme} from "../../state/hooks";
import {likePostAction, setCurrentlyPlayingSong} from "../../state/song-suggestion.slice";
import CommentsComponent from "./comments/CommentsComponent";
import ProfileId from "../user/profile/ProfileId";
import React from 'react';
import DoubleClick from 'react-native-double-tap';
import {Post, Reaction, ReactionType} from "../../state/song-suggestion.model";
import {User} from "../user/user.model";
import {selectCurrentUser} from "../../state/song-suggestion.selector";
import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";

const PostComponent = ({navigation, post}: {navigation: StackNavigationProp, post: Post}) => {
  const {colours, fonts} = useTheme;
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(selectCurrentUser);

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

  const likePost = () => {
    post.liked = false;
    const reaction: Reaction = {
      user,
      post,
      reactionType: ReactionType.LIKE
    }
    dispatch(likePostAction({reaction}));
  }

  //TODO add an empty post component with a loading spinner
  return (
     post &&
         <VStack style={styles.postContainer} space="2">
            <View style={styles.postHeader}>
              <ProfileId user={post.user} />
              <Text style={styles.dateStyle}>{post.date.toString()}</Text>
            </View>
            <View style={styles.imageContainer}>
              <DoubleClick
                doubleTap={likePost}
                delay={200}
              >
              <Image source={{uri: post.image.presignedUrl}}
                     style={styles.image}/>
              </DoubleClick>
            </View>
            <View style={styles.infoContainer}>
              <SongPreviewComponent song={post?.song} onPress={playSong}/>
              <View style={styles.textContainer}>
                <Text style={styles.textStyle}>
                  {post?.content}
                </Text>
              </View>
              <ActionButtonsComponent post={post}/>
              <CommentsComponent post={post} />
              <CommentBoxComponent post={post}/>
            </View>
         </VStack>
  );
}

export default PostComponent;