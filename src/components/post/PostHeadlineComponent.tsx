import {Image, StyleSheet, TextInput, View} from "react-native";
import {useAppDispatch, useAppSelector, useTheme} from "../../state/hooks";
import {useEffect, useState} from "react";
import {updatePost} from "../../state/song-suggestion.slice";
import {Post} from "../../state/song-suggestion.model";
import {selectCurrentPost} from "../../state/song-suggestion.selector";

const PostHeadlineComponent = ({image}) => {
  const {colours} = useTheme;
  const [imageContent, setImageContent] = useState(null);
  const [caption, setCaption] = useState("");
  const dispatch = useAppDispatch();

  const post: Post = useAppSelector(selectCurrentPost);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      marginTop: 16
    },
    imageContainer: {
      width: "30%",
      height: undefined,
      flex: 1,
      alignSelf: 'stretch',
      marginLeft: 16,
      marginBottom: 16
    },
    image: {
      width: "100%",
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'cover',
      marginBottom: 0
    },
    headlineContainer: {
      width: "65%",
      borderColor: colours.secondary,
      borderStyle: "solid",
      borderWidth: 2,
      padding: 2,
      marginLeft: 16,
      marginRight: 16,
      marginBottom: 16
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

  const getImageSource = () => {
    if(image == null) {
      console.log("image is null");
      return null;
    }
    if(image.imageContent == null) {
      console.log("imageContent is null");
      return null;
    }
    return `data:image/jpeg;base64,${image.imageContent}`
  }

  useEffect(() => {
    setImageContent(getImageSource());
  }, [image]);

  useEffect(() => {
    // debounce updating the post until after user has finished editing
    const timeoutId = setTimeout(() => {
      dispatch(updatePost({...post, content: caption}));
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [caption]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri: imageContent}} style={styles.image} />
      </View>
      <View style={styles.headlineContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add caption..."
          placeholderTextColor="#7f7f7f"
          value={caption}
          onChangeText={(text) => setCaption(text)}
        />
      </View>
    </View>
  )
}

export default PostHeadlineComponent;