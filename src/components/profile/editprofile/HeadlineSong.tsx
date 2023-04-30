import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import {Song, SongMetadata, UserProfile} from "../../../state/song-suggestion.model";
import {getSongMetadata} from "../../video/song.api";
import LottieView from "lottie-react-native";
import {useAppDispatch} from "../../../state/hooks";
import {updateProfileAction} from "../../../state/song-suggestion.slice";

const HeadlineSong = ({post, profile, navigation}) => {
  const song: Song = post?.song;
  const [metadata, setMetadata] = useState<SongMetadata>(song?.songMetadata);
  const [songLoading, setSongLoading] = useState<boolean>(true);
  const animation = useRef(null);
  const dispatch = useAppDispatch();

  const styles = StyleSheet.create({
    previewContainer: {
      width: "90%",
      height: 80,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 4
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
    animation: {
      height: 35
    }
  });

  useEffect(() => {
    if(!metadata) {
      setSongLoading(true)
      getMetadata();
    }
  },[song]);

  const getMetadata = () => {
    if(song) {
      getSongMetadata(song.id).then((data) => {
        setMetadata(data);
        setSongLoading(false);
      });
    }
  }

  const selectSong = () => {
    const updatedProfile: UserProfile = {...profile, headlineSong: song};
    dispatch(updateProfileAction({profile: updatedProfile}));
    navigation.navigate("EditProfile", {user: profile?.user});
  }

  return (
    song &&
    <TouchableOpacity style={styles.previewContainer} onPress={selectSong}>
      {songLoading &&
        <View style={styles.imageContainer}>
          <LottieView
            autoPlay
            ref={animation}
            style={styles.animation}
            source={require("../../../../assets/animation/loading_small.json")}
          />
        </View>
      }
      {!songLoading && metadata &&
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: metadata?.albumArtUrl}}/>
        </View>
      }
      <View style={styles.textContainer}>
        <Text style={{color: "white", textAlign: "left", fontWeight: "bold"}}>
          {song?.name}
        </Text>
        <Text style={{color: "white", textAlign: "left"}}>{song?.artist}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default HeadlineSong;