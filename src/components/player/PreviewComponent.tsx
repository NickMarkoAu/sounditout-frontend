import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { HStack, VStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

const PreviewComponent = () => {
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
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../../../assets/test-song.png")} />
      </View>
      <View style={styles.textContainer}>
        <Text style={{ color: "white", textAlign: "left", fontWeight: "bold" }}>
          Born To Be Wild (Easy Rider)
        </Text>
        <Text style={{ color: "white", textAlign: "left" }}>Steppenwolf</Text>
      </View>
    </View>
  );
};

export default PreviewComponent;