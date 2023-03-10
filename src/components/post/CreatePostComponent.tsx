import {View, TouchableOpacity, StyleSheet} from "react-native";
import PostHeadlineComponent from "./PostHeadlineComponent";
import TagsContainer from "./tags/TagsContainer";
import AddTagsComponent from "./tags/AddTagsComponent";
import PrivacySelectComponent from "./PrivacySelectComponent";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckSquare} from "@fortawesome/free-solid-svg-icons";
import {useTheme} from "../../state/hooks";
import SongPreviewComponent from "../video/preview/SongPreviewComponent";

const CreatePostComponent = ({post, navigation}) => {
  const {colours} = useTheme;
  const styles = StyleSheet.create({
    container: {
      marginTop: 88,
    },
    preview: {
      paddingLeft: 16
    },
    submit: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    submitButton: {
      paddingRight: 16,
    }

  })

  const submitPost = () => {
    //TODO submit the post and navigate to feed with post at the top
  }
  const previewSong = () => {

  }
  return (
    <View style={styles.container}>
      <PostHeadlineComponent image={post?.image}/>
      <View style={styles.preview}>
        <SongPreviewComponent onPress={previewSong} navigation={navigation} song={post?.song} />
      </View>
      <TagsContainer post={post} />
      <AddTagsComponent />
      <View style={styles.submit}>
        <PrivacySelectComponent />
        <TouchableOpacity style={styles.submitButton} onPress={submitPost} >
          <FontAwesomeIcon icon={faCheckSquare} size={35} color={colours.primary}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CreatePostComponent;