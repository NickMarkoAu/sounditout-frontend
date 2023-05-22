import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useTheme} from "../../../state/hooks";
import {useEffect, useRef, useState} from "react";
import {Post, Song, SongMetadata} from "../../../state/song-suggestion.model";
import {getSongMetadata} from "../../video/song.api";
import LottieView from "lottie-react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import {setCurrentlyPlayingSong} from "../../../state/song-suggestion.slice";
import {useDispatch} from "react-redux";

const SongPost = ({post} : {post: Post}) => {
  const {colours} = useTheme;
  const song : Song = post?.song;
  const [metadata, setMetadata] = useState<SongMetadata>(song?.songMetadata);
  const [songLoading, setSongLoading] = useState<boolean>(true);
  const animation = useRef(null);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    previewContainer: {
      width: "90%",
      height: 80,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
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
      opacity: 0.85
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

  const playSong = () => {
    dispatch(setCurrentlyPlayingSong(song));
  }

  return (
    song &&
    <View style={styles.previewContainer}>
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
          <Image style={styles.image} source={{uri: post?.image?.presignedUrl}}/>
          <TouchableOpacity style={styles.playIconContainer} onPress={playSong}>
            <FontAwesomeIcon size={50} style={styles.playIcon} icon={faPlayCircle}/>
          </TouchableOpacity>
        </View>
      }
      <View style={styles.textContainer}>
        <Text style={{color: "white", textAlign: "left", paddingBottom: 3, fontSize: 15}}>
          {post.content}
        </Text>
        <Text style={{color: "white", textAlign: "left", fontWeight: "bold", marginLeft: 8, fontSize: 12}}>
          {song?.name}
        </Text>
        <Text style={{color: "white", textAlign: "left", marginLeft: 8, fontSize: 12}}>{song?.artist}</Text>
      </View>
    </View>
  );
}

export default SongPost;