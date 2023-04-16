import {View, StyleSheet, Image, Text, TouchableOpacity, Animated} from "react-native";
import {useAppDispatch, useAppSelector, useTheme} from "../../state/hooks";
import {useEffect, useRef, useState} from "react";
import {faPlay, faPause} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {selectCurrentlyPlayingSong, selectIsPlayerVisible} from "../../state/song-suggestion.selector";
import {Song, SongMetadata} from "../../state/song-suggestion.model";
import {getSongMetadata} from "../video/song.api";
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av';
import {Directions, Gesture, GestureDetector} from "react-native-gesture-handler";
import {runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming} from "react-native-reanimated";
import {unloadCurrentlyPlayingSong} from "../../state/song-suggestion.slice";

const MiniPlayerComponent = () => {
  const {colours} = useTheme;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const visible = useAppSelector(selectIsPlayerVisible);
  const song: Song = useAppSelector(selectCurrentlyPlayingSong);
  const [metadata, setMetadata] = useState<SongMetadata>(song?.songMetadata);
  const [songLoading, setSongLoading] = useState<boolean>(true);
  const animation = useRef(null);
  const [sound, setSound] = useState(null);
  const dispatch = useAppDispatch();

  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colours.primary,
      borderRadius: 10,
      borderStyle: 'solid',
      backgroundColor: colours.background,
      width: "95%",
      height: 55,
      position: "absolute",
      bottom: 60,
      left: 10,
      zIndex: 9999,
      alignItems: "center",
      flexDirection: "row",
    },
    imageContainer: {
      width: "10%",
      height: "100%",
      paddingTop: 5,
      paddingBottom: 5,
      flex: 1,
      alignSelf: "stretch",
      marginLeft: 8,
      position: "relative",
    },
    image: {
      width: "100%",
      height: "100%",
      aspectRatio: 1,
      resizeMode: "cover",
    },
    textContainer: {
      width: "40%",
      position: "relative",
    },
    iconsContainer: {
      width: "40%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
      paddingRight: 8
    },
    animationContainer: {
      width: 35
    },
    animation: {
      width: "100%",
    },
    spotifyIcon: {
      width: "100%",
      height: "100%",
      aspectRatio: 1,
      resizeMode: "cover",
    },
    playIcon: {
      color: colours.primary,
    },
    spotifyContainer: {
      height: "70%",
      marginRight: 8
    }
  });

  const position = useSharedValue(10);

  const closePlayerWrapper = () => {
    hidePlayer();
  }
  const flingGesture = Gesture.Fling()
    .direction(Directions.RIGHT | Directions.LEFT)
    .runOnJS(true)
    .onStart((e) => {
      position.value = withTiming(position.value + 100, { duration: 500 });
    })
    .onFinalize(runOnJS(closePlayerWrapper))

  const hidePlayer = () => {
    console.log("Closing player");
    setIsPlaying(false);
    console.log(position.value);
    setTimeout(() => {
      dispatch(unloadCurrentlyPlayingSong());
    }, 500);
    if(sound) {
      sound.pauseAsync();
      sound.unloadAsync();
    }
  }

  //TODO animation not working
  const animatedStyle = useAnimatedStyle(() => ({
    left: position.value
  }));

  const playPause = () => {
    console.log("Play/pause pressed")
    if(sound) {
      if(isPlaying) {
        setIsPlaying(false);
        sound.pauseAsync();
      } else {
        setIsPlaying(true);
        sound.playAsync();
      }
    }
  }

  const playInSpotify = () => {
    //TODO implement play in spotify
  }

  useEffect(() => {
    if(metadata) {
      setMetadata(null)
    }
    setSongLoading(true)
    getMetadata();
  },[song]);

  const getMetadata = () => {
    console.log("Get metadata called")
    if(song) {
      getSongMetadata(song.id).then((data) => {
        setMetadata(data);
        setSongLoading(false);
      });
    }
  }

  useEffect(() => {
    if(sound) {
      sound.unloadAsync();
      setSound(null);
    }
    playSound();
  }, [metadata]);

  const playSound = async () => {
    if(song && metadata) {
      console.log('Loading Sound');
      const {sound} = await Audio.Sound.createAsync({uri: metadata?.previewUrl});
      setSound(sound);

      console.log('Playing Sound');
      setIsPlaying(true);
      sound.setOnPlaybackStatusUpdate(onSoundFinished);
      await sound.playAsync();
    }
  }

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const onSoundFinished = (status) => {
    if(status.didJustFinish) {
      setIsPlaying(false);
    }
  }

  return (
    visible && song && metadata &&
    <GestureDetector gesture={flingGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.imageContainer}>
          <Image source={{uri: metadata?.albumArtUrl}} style={styles.image}/>
        </View>
        <View style={styles.textContainer}>
          <Text style={{color: "white", textAlign: "left", fontWeight: "bold"}}>
            {song?.name}
          </Text>
          <Text style={{color: "white", textAlign: "left"}}>{song?.artist}</Text>
        </View>
        <View style={styles.iconsContainer}>
          <View style={styles.animationContainer}>
            {isPlaying && <LottieView
              autoPlay
              ref={animation}
              style={styles.animation}
              source={require("../../../assets/animation/loading_small.json")}
            />}
          </View>
          <View style={styles.spotifyContainer}>
            <TouchableOpacity onPress={playInSpotify}>
              <Image source={require("../../../assets/streamingservices/spotify.png")} style={styles.spotifyIcon}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={playPause}>
            <FontAwesomeIcon size={25} style={styles.playIcon} icon={isPlaying? faPause : faPlay}/>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

export default MiniPlayerComponent;