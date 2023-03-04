import {Image, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import {useTheme} from "../../../state/hooks";

const SongPreviewComponent = ({navigation, song}) => {
  const {colours} = useTheme;

  const styles = StyleSheet.create({
    previewContainer: {
      width: "100%",
      height: 90,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 8,
      flex: 1,
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
  return (
    <View style={styles.previewContainer}>
      <View style={styles.imageContainer}>
        {/*TODO use the song image URL*/}
        <Image style={styles.image} source={require("../../../../assets/samples/test-song.png")}/>
        {/*TODO do we always want to go to the player? maybe pass the song action in as a prop*/}
        <TouchableOpacity style={styles.playIconContainer} onPress={() => navigation.navigate("Playlist", {song: song})}>
          <FontAwesomeIcon size={50} style={styles.playIcon} icon={faPlayCircle}/>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={{color: "white", textAlign: "left", fontWeight: "bold"}}>
          {song.name}
        </Text>
        <Text style={{color: "white", textAlign: "left"}}>{song.artist}</Text>
      </View>
    </View>
  );
};

export default SongPreviewComponent;