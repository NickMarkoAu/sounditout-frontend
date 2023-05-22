import {StyleSheet, TextInput, View} from "react-native";
import {useAppDispatch, useTheme} from "../../../state/hooks";
import {useState} from "react";
import {updatePost} from "../../../state/song-suggestion.slice";
import {Post} from "../../../state/song-suggestion.model";

const AddTagsComponent = ({post} : {post: Post}) => {
  const {colours} = useTheme;
  const [tagInputValue, setTagInputValue] = useState("");
  const dispatch = useAppDispatch();
  const tags = post?.image?.tags;

  const styles = StyleSheet.create({
    addTagContainer: {
      borderColor: colours.secondary,
      borderStyle: "solid",
      borderWidth: 2,
      padding: 2,
      marginLeft: 16,
      marginRight: 16,
      marginBottom: 8
    },
    input: {
      height: 35,
      width: '90%',
      color: "white",
      margin: 5,
      borderWidth: 0,
      padding: 10,
    }
  });

  const updateTags = (text) => {
    //check if space was the last char, if it was then add the tag
    setTagInputValue(text);
    console.log("updating tag text", text + "|");
    if(text.endsWith(" ")) {
      //add tag
      console.log("adding tag");
      const newTags = [...tags, text];
      dispatch(updatePost({...post, image: {...post?.image, tags: newTags}}))
      setTagInputValue("");
    }
  }

  return (
    <View style={styles.addTagContainer}>
      <TextInput
        value={tagInputValue}
        style={styles.input}
        placeholder="Add tags..."
        placeholderTextColor="#7f7f7f"
        onChangeText={(text) => updateTags(text)}
      />
    </View>
  )
}

export default AddTagsComponent;