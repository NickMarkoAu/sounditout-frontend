import { Image, View, Text, StyleSheet } from "react-native";
import {Song} from "../../state/song-suggestion.model";

const PreviewComponent = ({song}: {song: Song}) => {
  const styles = StyleSheet.create({
    previewContainer: {
      width: "90%",
      height: 80,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    imageContainer: {
      height: 80,
      paddingRight: 12,
      position: "relative",
    },
    textContainer: {
      width: "70%",
      alignItems: "flex-start",
    },
    image: {
      width: "100%",
      height: "100%",
      aspectRatio: 1,
      resizeMode: "cover",
    }
  });

  return (
    <View style={styles.previewContainer}>
      {/*<View style={styles.imageContainer}>*/}
      {/*  <Image style={styles.image} source={song?.image} />*/}
      {/*</View>*/}
      <View style={styles.textContainer}>
        <Text style={{ color: "white", textAlign: "left", fontWeight: "bold" }}>
          {song?.name}
        </Text>
        <Text style={{ color: "white", textAlign: "left" }}>{song?.artist}</Text>
      </View>
    </View>
  );
};

export default PreviewComponent;