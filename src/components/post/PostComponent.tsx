import { Box, VStack, Text } from 'native-base';
import {Image, StyleSheet, View} from 'react-native';
import ProfileButton from "../navigation/ProfileButton";
import VideoPreviewComponent from "../video/preview/VideoPreviewComponent";
import ActionButtonsComponent from "../post/actionbuttons/ActionButtonsComponent";
import CommentBoxComponent from "../post/commentbox/CommentBoxComponent";

const PostComponent = ({navigation}) => {
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
  return (
        <VStack style={styles.postContainer} space="2">
            <Box style={styles.postHeader}>
              <View style={styles.profileId}>
                <ProfileButton onPress={() => {}} />
                <Text style={{color: "white", marginLeft: 3}}>Nick Marko</Text>
              </View>
              <Text style={{color: "white"}}>Oct 31, 2022</Text>
            </Box>
            <View style={styles.imageContainer}>
              <Image source={require("../../../assets/test-profile.png")}
                     style={styles.image}/>
            </View>
            <View style={styles.infoContainer}>
              <VideoPreviewComponent navigation={navigation} videoKey="rMbATaj7Il8"/>
              <ActionButtonsComponent />
              <Text style={{color: "white"}}>
                Happy Halloween!
              </Text>
              <CommentBoxComponent />
            </View>
        </VStack>
  );
}

export default PostComponent;