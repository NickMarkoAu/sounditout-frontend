import { Box, VStack, Text } from 'native-base';
import {Image, StyleSheet, View} from 'react-native';
import ProfileButton from "../navigation/ProfileButton";
import SongPreviewComponent from "../video/preview/SongPreviewComponent";
import ActionButtonsComponent from "../post/actionbuttons/ActionButtonsComponent";
import CommentBoxComponent from "../post/commentbox/CommentBoxComponent";
import {useTheme} from "../../state/hooks";

const PostComponent = ({navigation, post}) => {
  const {colours, fonts} = useTheme;

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
    },
    dateStyle: {
      marginLeft: 8,
      color: colours.text_primary
    },
    nameStyle: {
      color: colours.text_primary,
      fontFamily: fonts.primary,
      marginLeft: 3
    }
  });

  const showProfile = () => {
    //TODO make this go to the user profile
  }

  const navigateToPlaylist = () => {
    navigation.navigate("Playlist", {song: post?.song})
  }

  const getImageSource = () => {
    return `data:image/jpeg;base64,${post.image.imageContent}`
  }

  return (
     post &&
         <VStack style={styles.postContainer} space="2">
            <View style={styles.postHeader}>
              <View style={styles.profileId}>
                <ProfileButton onPress={showProfile}/>
                <Text style={styles.nameStyle}>{post?.user?.name}</Text>
              </View>
              <Text style={styles.dateStyle}>{post.date}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image source={{uri: getImageSource()}}
                     style={styles.image}/>
            </View>
            <View style={styles.infoContainer}>
              <SongPreviewComponent navigation={navigation} song={post?.song} onPress={navigateToPlaylist}/>
              <ActionButtonsComponent />
              <Text style={{color: "white"}}>
                {post?.content}
              </Text>
              <CommentBoxComponent />
            </View>
         </VStack>
  );
}

export default PostComponent;