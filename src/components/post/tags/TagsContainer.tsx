import {StyleSheet, Text, View} from "react-native";
import TagComponent from "./TagComponent";
import {useAppDispatch, useAppSelector, useTheme} from "../../../state/hooks";
import {selectCurrentPost} from "../../../state/song-suggestion.selector";
import {updatePost} from "../../../state/song-suggestion.slice";

const TagsContainer = ({post}) => {
  const {colours} = useTheme;
  const tags = post?.image?.tags;
  const currentPost = useAppSelector(selectCurrentPost);
  const dispatch = useAppDispatch();

  const styles = StyleSheet.create({
    container: {
      marginLeft: 16,
      marginRight: 16,
      marginBottom: 8,
      marginTop: 16
    },
    header: {
      color: colours.text_primary,
      fontWeight: "bold",
      fontSize: 18
    },
    tagsContainer: {
      width: "100%",
      marginTop: 8,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 4,
    }
  });

  const deleteTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    dispatch(updatePost({...currentPost, image: {...currentPost.image, tags: newTags}}));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Tags
      </Text>
      <View style={styles.tagsContainer}>
        {tags?.map((tag, index) => {
          const key = tag + index;
          return (<TagComponent key={key} tag={tag} deleteTag={() => deleteTag(index)}/>)
        })}
      </View>
    </View>
  );
}

export default TagsContainer;