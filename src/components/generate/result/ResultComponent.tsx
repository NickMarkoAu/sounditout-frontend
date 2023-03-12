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

  const {colours} = useTheme;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 88,
      width: "100%",
      height: undefined,
      alignSelf: 'stretch',
      marginBottom: 55,
      overflow: "visible"
    },
    scrollView: {
      width: "100%"
    },
    text: {
      color: 'white'
    },
    button: {
      width: "30%",
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
      <SafeAreaView style={styles.container}>
        <FlatList style={styles.scrollView} data={songs} renderItem={({item}) =>
          <View style={{overflow: "visible"}}>
            <SongPreviewComponent navigation={navigation} song={item} onPress={previewSong}/>
            <TouchableOpacity onPress={selectSong}>
              <FontAwesomeIcon icon={faSquarePlus} size={25}/>
            </TouchableOpacity>
          </View>
        }/>
      </SafeAreaView>
      <View>
        <Text style={styles.text}>
          Want more suggestions?
        </Text>
        <TouchableOpacity style={styles.button} onPress={regenerate}>
          <Text>
            {regenerateCost} Token
          </Text>
          <FontAwesomeIcon icon={faCompactDisc} size={15}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ResultComponent;