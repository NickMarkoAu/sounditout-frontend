import {Image, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import {useTheme} from "../../../state/hooks";

const SongPreviewComponent = ({onPress, navigation, song}) => {
  const {colours} = useTheme;

  const styles = StyleSheet.create({
    previewContainer: {
      width: "90%",
      height: 80,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    imageContainer: {
      width: "25%",
      height: "100%",
      flex: 1,
      alignSelf: "stretch",
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
    },
    playIconContainer: {
      position: "absolute",
      top: "50%",
      left: "50%",
      alignItems: "center",
      justifyContent: "center",
      transform: [{translateX: -25}, {translateY: -25}],
    },
    playIcon: {
      color: colours.primary,
    },
  });

  // song = {
  //   artist: "Ya Mum",
  //   name: "GO fuck urself",
  //   image: {uri: "https://i1.sndcdn.com/artworks-000462239079-kce8fl-t500x500.jpg"}
  // }
  return (
    song &&
    <View style={styles.previewContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={song?.image}/>
        <TouchableOpacity style={styles.playIconContainer} onPress={onPress}>
          <FontAwesomeIcon size={50} style={styles.playIcon} icon={faPlayCircle}/>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={{color: "white", textAlign: "left", fontWeight: "bold"}}>
          {song?.name}
        </Text>
        <Text style={{color: "white", textAlign: "left"}}>{song?.artist}</Text>
      </View>
    </View>
  );
};

export default SongPreviewComponent;