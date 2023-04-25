import {View, StyleSheet, Image} from "react-native";

const ImagePost = ({post}) => {
  const styles = StyleSheet.create({
    container: {
      width: "32%",
      paddingTop: 4,
    },
    image: {
      width: "100%",
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'cover',
      marginBottom: 0
    },
  })
  return (
    <View style={styles.container}>
      <Image source={{uri: post?.image?.presignedUrl}}
             style={styles.image}/>
    </View>
  )
}

export default ImagePost;