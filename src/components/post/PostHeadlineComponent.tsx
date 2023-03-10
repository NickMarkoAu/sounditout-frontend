import {Image, StyleSheet, TextInput, View} from "react-native";
import {useTheme} from "../../state/hooks";

const PostHeadlineComponent = ({image}) => {
  const {colours} = useTheme;
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

  image = {url: {
    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png"}
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image?.url} style={styles.image} />
      </View>
      <View style={styles.headlineContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add comment..."
          placeholderTextColor="#7f7f7f"
        />
      </View>
    </View>
  )
}

export default PostHeadlineComponent;