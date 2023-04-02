import {FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View, Text, useColorScheme} from "react-native";
import {Post, PricingOptions, Song, UserUploadedImage} from "../../../state/song-suggestion.model";
import SongPreviewComponent from "../../video/preview/SongPreviewComponent";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCompactDisc, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector, useTheme} from "../../../state/hooks";
import {selectCurrentPost, selectCurrentUser, selectPricingOptions} from "../../../state/song-suggestion.selector";
import { User } from "../../user/user.model";
import {updatePost} from "../../../state/song-suggestion.slice";

const ResultComponent = ({navigation, generateResult}) => {
  const pricing: PricingOptions = useAppSelector(selectPricingOptions);
  const regenerateCost = pricing.regenerateCost;
  const songs: Song[] = generateResult.songs;
  const image: UserUploadedImage = generateResult.image;
  const currentUser: User = useAppSelector(selectCurrentUser);
  const currentPost: Post = useAppSelector(selectCurrentPost);
  const dispatch = useAppDispatch();

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

  const selectSong = (song) => {
    //initial create post
    console.log("initial create post");
    dispatch(updatePost({...currentPost, song, user: currentUser, image}));
    navigation.navigate("CreatePost");
  }

  const previewSong = (song) => {
    //TODO add song preview here
  }

  return (
    <View>
      <View style={styles.outerContainer}>
      <SafeAreaView style={styles.container}>
        <FlatList style={styles.scrollView} data={songs} renderItem={({item}) =>
          <View style={styles.songPreviewContainer}>
            <SongPreviewComponent navigation={navigation} song={item} onPress={previewSong}/>
            <TouchableOpacity onPress={() => selectSong(item)}>
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