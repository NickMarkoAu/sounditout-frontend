import {FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View, Text, useColorScheme} from "react-native";
import {PricingOptions, Song} from "../../../state/song-suggestion.model";
import SongPreviewComponent from "../../video/preview/SongPreviewComponent";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCompactDisc, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import {useAppSelector, useTheme} from "../../../state/hooks";
import {selectPricingOptions} from "../../../state/song-suggestion.selector";

const ResultComponent = ({navigation, generating, generateResult}) => {
  const pricing: PricingOptions = useAppSelector(selectPricingOptions);
  const regenerateCost = pricing.regenerateCost;
  const songs: Song[] = generateResult.songs;

  const {colours, fonts} = useTheme;

  console.log("Loading result component");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
    },
    outerContainer: {
      height: "55%"
    },
    scrollView: {

    },
    text: {
      fontFamily: fonts.primary,
      color: colours.text_primary
    },
    button: {
      paddingHorizontal: 8,
      height: 35,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colours.primary,
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'row',
      marginLeft: 8,
      opacity: 1
    },
    regenerateContainer: {
      display: 'flex',
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    songPreviewContainer: {
      flexDirection: "row",
      alignItems: "center"
    },
    moreSuggestionsContainer: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 8
    },
    buttonText: {
      marginRight: 4
    }
  });

  const regenerate = () => {
    //TODO regenerate api call here
  }

  const selectSong = () => {
    //TODO add song to post here and navigate to post completion page
  }

  const previewSong = (song) => {

  }

  return (
    <View>
      <View style={styles.outerContainer}>
      <SafeAreaView style={styles.container}>
        <FlatList style={styles.scrollView} data={songs} renderItem={({item}) =>
          <View style={styles.songPreviewContainer}>
            <SongPreviewComponent navigation={navigation} song={item} onPress={previewSong}/>
            <TouchableOpacity onPress={selectSong}>
              <FontAwesomeIcon color={colours.primary} icon={faSquarePlus} size={25}/>
            </TouchableOpacity>
          </View>
        }/>
      </SafeAreaView>
      </View>
      <View style={styles.moreSuggestionsContainer}>
        <Text style={styles.text}>
          Want more suggestions?
        </Text>
        <TouchableOpacity style={styles.button} onPress={regenerate}>
          <Text style={styles.buttonText}>
            {regenerateCost} Token
          </Text>
          <FontAwesomeIcon icon={faCompactDisc} size={15}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ResultComponent;