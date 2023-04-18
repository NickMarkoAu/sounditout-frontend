import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faHeart, faShareSquare, faBookmark} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faShareSquare as faShareSquareRegular,
  faBookmark as faBookmarkRegular
} from "@fortawesome/free-regular-svg-icons";
import {useAppDispatch, useAppSelector, useTheme} from "../../../state/hooks";
import {Reaction, ReactionType, SavedPost} from "../../../state/song-suggestion.model";
import {User} from "../../user/user.model";
import {selectCurrentUser} from "../../../state/song-suggestion.selector";
import {likePostAction, savePostAction} from "../../../state/song-suggestion.slice";
import {useEffect, useState} from "react";

const ActionButtonsComponent = ({post}) => {
  const {colours} = useTheme;

  const dispatch = useAppDispatch();
  const user: User = useAppSelector(selectCurrentUser);
  const [liked, setLiked] = useState(post?.liked || false);
  const [likeIcon, setLikeIcon] = useState(faHeartRegular);

  const [shared, setShared] = useState(post?.shared || false);
  const [shareIcon, setShareIcon] = useState(faShareSquareRegular);

  const [saved, setSaved] = useState(post?.saved || false);
  const [bookmarkIcon, setBookmarkIcon] = useState(faBookmarkRegular);

  const styles = StyleSheet.create({
    actionButtonsContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 8
    },
    actionButton: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1
    },
    savePostButton: {
      marginRight: 16
    },
    likeButton: {
      marginLeft: 8,
      flex: 1,
      marginRight: 8
    },
    actionButtonIcon: {
      color: colours.primary
    },
    buttonCluster: {
      flexDirection: "row",
      width: "30%"
    },
    saveButton: {
      alignItems: "flex-end"
    },
    likesText: {
      color: colours.text_primary,
      marginLeft: 16
    }
  });

  const likePost = () => {
    const reaction: Reaction = {
      user,
      post,
      reactionType: ReactionType.LIKE
    }
    setLiked(!liked);
    dispatch(likePostAction({reaction}));
  }

  const sharePost = () => {
    setShareIcon(faShareSquare);
  }

  const savePost = () => {
    const savedPost: SavedPost = {
      post,
      user
    }
    dispatch(savePostAction({post: savedPost}));
    setSaved(!saved);
  }

  useEffect(() => {
    if (post?.liked) {
      setLiked(post?.liked);
      setLikeIcon(faHeart);
    } else {
      setLiked(false);
      setLikeIcon(faHeartRegular);
    }
    if(post.shared) {
      setShared(post.shared);
      setShareIcon(faShareSquare);
    } else {
      setShared(false);
      setShareIcon(faShareSquareRegular);
    }
    if(post.saved) {
      setSaved(post.saved);
      setBookmarkIcon(faBookmark);
    } else {
      setSaved(false);
      setBookmarkIcon(faBookmarkRegular);
    }
  }, [post]);


  return (
    <View style={styles.actionButtonsContainer}>
      <View style={styles.buttonCluster}>
        <TouchableOpacity style={styles.likeButton} onPress={likePost}>
          <FontAwesomeIcon size={20} style={styles.actionButtonIcon} icon={likeIcon}/>
        </TouchableOpacity>
        {post?.likes && post?.likes > 1 ?
        <Text style={styles.likesText}>
          {post?.likes.toLocaleString()} likes
        </Text> : null}
      </View>
      <View style={styles.saveButton}>
        <View style={styles.buttonCluster}>
          {/*TODO: set up post sharing, check if post is sharable, etc.*/}
          {/*<TouchableOpacity style={styles.actionButton} onPress={sharePost}>*/}
          {/*  <FontAwesomeIcon size={20} style={styles.actionButtonIcon} icon={shareIcon}/>*/}
          {/*</TouchableOpacity>*/}
          <TouchableOpacity style={styles.savePostButton} onPress={savePost}>
            <FontAwesomeIcon size={20} style={styles.actionButtonIcon} icon={bookmarkIcon}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ActionButtonsComponent;